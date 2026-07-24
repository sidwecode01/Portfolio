import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaCertificate, FaExternalLinkAlt } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { normalizeCertification, deleteCertification } from "../../lib/certificationsRepo";
import { onImageError } from "../../utils/media";

export default function CertificationsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) setError(error.message);
    else setItems((data || []).map(normalizeCertification));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Supprimer la certification "${name}" ?`)) return;
    setBusy(true);
    try {
      await deleteCertification(id);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Certifications</h1>
          <p className="text-slate-400 text-sm">{items.length} certification(s)</p>
        </div>
        <Link
          to="/admin/certifications/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold"
        >
          <FaPlus className="w-4 h-4" />
          Nouvelle certification
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm p-3">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-slate-500">Chargement...</div>
      ) : items.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-slate-400">
          Aucune certification pour l'instant. Ajoute ta premiere certification.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <div key={c.id} className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-800 text-blue-400 flex items-center justify-center overflow-hidden">
                  {c.image ? (
                    <img src={c.image} onError={onImageError} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <FaCertificate className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold leading-snug line-clamp-2" title={c.name}>
                    {c.name}
                  </h3>
                  <p className="text-slate-400 text-sm truncate">
                    {[c.issuer, c.year].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-800">
                {c.credentialUrl ? (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" /> Lien
                  </a>
                ) : (
                  <span className="text-xs text-slate-600">Pas de lien</span>
                )}
                <div className="flex items-center gap-1">
                  <Link
                    to={`/admin/certifications/${c.id}/edit`}
                    className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
                    title="Editer"
                  >
                    <FaEdit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(c.id, c.name)}
                    disabled={busy}
                    className="p-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-60 transition"
                    title="Supprimer"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
