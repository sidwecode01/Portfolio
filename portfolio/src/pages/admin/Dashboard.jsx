import { useEffect, useState } from "react";
import { getMetrics } from "../../lib/analytics";
import { FaEye, FaUsers, FaCalendarDay, FaGlobe, FaChartLine } from "react-icons/fa";

// Convertit un code pays ISO 2 lettres en emoji drapeau (ex: "FR" -> 🇫🇷).
function flagEmoji(code) {
  if (!code || code.length !== 2 || !/^[A-Za-z]{2}$/.test(code)) return "🌐";
  return String.fromCodePoint(
    ...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}

// Transforme un chemin d'URL en libelle lisible.
function prettyPath(path) {
  if (!path) return "—";
  if (path === "/") return "Accueil";
  const m = path.match(/^\/projet\/(.+)$/);
  if (m) {
    return m[1]
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return path;
}

// Temps relatif ("il y a 3 min").
function relativeTime(iso) {
  const d = new Date(iso);
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return "a l'instant";
  const m = Math.floor(s / 60);
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h} h`;
  const j = Math.floor(h / 24);
  if (j < 7) return `il y a ${j} j`;
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
}

const fmtDay = (iso) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });

const RANGES = [
  { label: "7 j", days: 7 },
  { label: "30 j", days: 30 },
  { label: "90 j", days: 90 },
];

function StatCard({ icon: Icon, label, value, hint, accent }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-sm">{label}</p>
        <span className={`p-2 rounded-lg ${accent}`}>
          <Icon className="w-4 h-4 text-white" />
        </span>
      </div>
      <p className="text-3xl font-bold text-white mt-3">{value}</p>
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}

function BarChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  const peak = data.reduce((a, b) => (b.count > a.count ? b : a), data[0]);
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
        <span>Pic : {peak.count} vue(s) le {fmtDay(peak.date)}</span>
        <span>max {max}/j</span>
      </div>
      <div className="relative flex items-end gap-1 h-44 border-b border-slate-800">
        {data.map((d) => (
          <div key={d.date} className="group relative flex-1 flex items-end justify-center h-full">
            <div
              className="w-full max-w-[16px] rounded-t bg-blue-500/80 group-hover:bg-blue-400 transition-all min-h-[2px]"
              style={{ height: `${(d.count / max) * 100}%` }}
            />
            <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap z-10 transition">
              {fmtDay(d.date)} · {d.count} vue(s)
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-slate-500 mt-2">
        <span>{fmtDay(data[0].date)}</span>
        <span>{fmtDay(data[data.length - 1].date)}</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [days, setDays] = useState(30);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    getMetrics(days)
      .then((m) => active && setMetrics(m))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [days]);

  const avgPerDay = metrics ? Math.round(metrics.total / days) : 0;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Metriques</h1>
          <p className="text-slate-400 text-sm">Visites de ton portfolio sur les {days} derniers jours.</p>
        </div>
        <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
          {RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => setDays(r.days)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                days === r.days ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm p-3">
          {error}
        </div>
      )}

      {loading || !metrics ? (
        <div className="text-slate-500">Chargement des metriques...</div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={FaEye} label="Vues totales" value={metrics.total} accent="bg-blue-600" />
            <StatCard icon={FaUsers} label="Visiteurs uniques" value={metrics.uniqueVisitors} accent="bg-emerald-600" />
            <StatCard icon={FaCalendarDay} label="Vues aujourd'hui" value={metrics.today} accent="bg-purple-600" />
            <StatCard icon={FaChartLine} label="Moyenne / jour" value={avgPerDay} hint={`sur ${days} jours`} accent="bg-sky-600" />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-white font-semibold mb-4">Vues par jour</h2>
            {metrics.byDay.length ? (
              <BarChart data={metrics.byDay} />
            ) : (
              <p className="text-slate-500 text-sm">Pas encore de donnees.</p>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <FaGlobe className="w-4 h-4 text-sky-400" /> Provenance des visiteurs (pays)
            </h2>
            {metrics.topCountries?.length ? (
              <ul className="space-y-3">
                {metrics.topCountries.map((c) => {
                  const max = metrics.topCountries[0].count || 1;
                  return (
                    <li key={c.code} className="flex items-center gap-3 text-sm">
                      <span className="text-xl leading-none">{flagEmoji(c.code)}</span>
                      <span className="text-slate-300 w-32 truncate">{c.name}</span>
                      <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-sky-500"
                          style={{ width: `${(c.count / max) * 100}%` }}
                        />
                      </div>
                      <span className="text-slate-400 font-medium w-8 text-right">{c.count}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-slate-500 text-sm">
                Pas encore de donnees de provenance. Le pays est detecte cote serveur (Vercel) : il apparait en production, pas en local.
              </p>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h2 className="text-white font-semibold mb-4">Pages les plus vues</h2>
              {metrics.topPages.length ? (
                <ul className="space-y-3.5">
                  {metrics.topPages.map((p) => {
                    const max = metrics.topPages[0].count || 1;
                    const pct = Math.round((p.count / (metrics.total || 1)) * 100);
                    return (
                      <li key={p.path}>
                        <div className="flex items-center justify-between text-sm mb-1.5 gap-3">
                          <span className="text-slate-200 truncate" title={p.path}>
                            {prettyPath(p.path)}
                          </span>
                          <span className="text-slate-400 font-medium shrink-0">
                            {p.count} <span className="text-slate-600">· {pct}%</span>
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width: `${(p.count / max) * 100}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-slate-500 text-sm">Pas encore de donnees.</p>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h2 className="text-white font-semibold mb-4">Visites recentes</h2>
              {metrics.recent.length ? (
                <ul className="space-y-2.5">
                  {metrics.recent.map((r, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span className="shrink-0" title={r.country || "Pays inconnu"}>
                        {flagEmoji(r.country_code)}
                      </span>
                      <span className="text-slate-300 truncate flex-1" title={r.path}>
                        {prettyPath(r.path)}
                      </span>
                      <span className="text-slate-500 shrink-0 text-xs">
                        {relativeTime(r.created_at)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 text-sm">Pas encore de donnees.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
