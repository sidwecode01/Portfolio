import { useEffect, useState } from "react";
import { getMetrics } from "../../lib/analytics";
import { FaEye, FaUsers, FaCalendarDay } from "react-icons/fa";

const RANGES = [
  { label: "7 j", days: 7 },
  { label: "30 j", days: 30 },
  { label: "90 j", days: 90 },
];

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-sm">{label}</p>
        <span className={`p-2 rounded-lg ${accent}`}>
          <Icon className="w-4 h-4 text-white" />
        </span>
      </div>
      <p className="text-3xl font-bold text-white mt-3">{value}</p>
    </div>
  );
}

function BarChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="flex items-end gap-1 h-48">
      {data.map((d) => (
        <div key={d.date} className="flex-1 flex flex-col items-center justify-end group">
          <div
            className="w-full rounded-t bg-blue-500/80 group-hover:bg-blue-400 transition-all min-h-[2px]"
            style={{ height: `${(d.count / max) * 100}%` }}
            title={`${d.date} : ${d.count} vue(s)`}
          />
        </div>
      ))}
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

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Metriques</h1>
          <p className="text-slate-400 text-sm">Visites de ton portfolio.</p>
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
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard icon={FaEye} label="Vues totales" value={metrics.total} accent="bg-blue-600" />
            <StatCard icon={FaUsers} label="Visiteurs uniques" value={metrics.uniqueVisitors} accent="bg-emerald-600" />
            <StatCard icon={FaCalendarDay} label="Vues aujourd'hui" value={metrics.today} accent="bg-purple-600" />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h2 className="text-white font-semibold mb-4">Vues par jour</h2>
            {metrics.byDay.length ? (
              <BarChart data={metrics.byDay} />
            ) : (
              <p className="text-slate-500 text-sm">Pas encore de donnees.</p>
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h2 className="text-white font-semibold mb-4">Pages les plus vues</h2>
              {metrics.topPages.length ? (
                <ul className="space-y-2">
                  {metrics.topPages.map((p) => (
                    <li key={p.path} className="flex items-center justify-between text-sm">
                      <span className="text-slate-300 truncate mr-4">{p.path}</span>
                      <span className="text-slate-500 font-medium">{p.count}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 text-sm">Pas encore de donnees.</p>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h2 className="text-white font-semibold mb-4">Visites recentes</h2>
              {metrics.recent.length ? (
                <ul className="space-y-2">
                  {metrics.recent.map((r, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <span className="text-slate-300 truncate mr-4">{r.path}</span>
                      <span className="text-slate-500">
                        {new Date(r.created_at).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
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
