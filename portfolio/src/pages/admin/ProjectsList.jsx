import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus, FaEdit, FaTrash, FaDownload, FaStar, FaSearch,
  FaExternalLinkAlt, FaImages, FaLink,
} from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { normalizeProject, deleteProject, importDefaultProjects } from "../../lib/projectsRepo";
import { withPlaceholder, onImageError } from "../../utils/media";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) setError(error.message);
    else setProjects((data || []).map(normalizeProject));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Supprimer le projet "${title}" ?`)) return;
    setBusy(true);
    try {
      await deleteProject(id);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleImport = async () => {
    if (!window.confirm("Importer tous les projets par defaut dans la base ?")) return;
    setBusy(true);
    try {
      const n = await importDefaultProjects();
      alert(`${n} projet(s) importe(s).`);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.technologies || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [projects, query]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Projets</h1>
          <p className="text-slate-400 text-sm">{projects.length} projet(s)</p>
        </div>
        <div className="flex gap-2">
          {!loading && projects.length === 0 && (
            <button
              onClick={handleImport}
              disabled={busy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium disabled:opacity-60"
            >
              <FaDownload className="w-4 h-4" />
              Importer les projets par defaut
            </button>
          )}
          <Link
            to="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold"
          >
            <FaPlus className="w-4 h-4" />
            Nouveau projet
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm p-3">
          {error}
        </div>
      )}

      {/* Recherche */}
      {!loading && projects.length > 0 && (
        <div className="relative mb-6 max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un projet ou une techno..."
            className="w-full rounded-lg bg-slate-900 border border-slate-700 text-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
              <div className="aspect-video bg-slate-800 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-2/3 bg-slate-800 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-slate-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-slate-400">
          Aucun projet pour l'instant. Cree ton premier projet ou importe les projets par defaut.
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-slate-400">
          Aucun projet ne correspond a « {query} ».
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => {
            const mediaCount = (p.media || []).length;
            const hasLinks = Boolean(p.links?.live || p.links?.github);
            return (
              <div
                key={p.id}
                className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden hover:border-slate-600 hover:shadow-xl hover:shadow-black/20 transition"
              >
                <div className="relative aspect-video bg-slate-800 overflow-hidden">
                  <img
                    src={withPlaceholder(p.image)}
                    onError={onImageError}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {p.featured && (
                    <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-amber-400 text-amber-950 text-xs font-semibold px-2 py-0.5 shadow">
                      <FaStar className="w-3 h-3" /> A la une
                    </span>
                  )}
                  <div className="absolute bottom-2 right-2 flex gap-1.5">
                    {mediaCount > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur text-white text-xs px-2 py-0.5">
                        <FaImages className="w-3 h-3" /> {mediaCount}
                      </span>
                    )}
                    {hasLinks && (
                      <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur text-white text-xs px-2 py-0.5">
                        <FaLink className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-4">
                  <h3 className="text-white font-semibold leading-snug line-clamp-2" title={p.title}>
                    {p.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {(p.technologies || []).slice(0, 4).map((t) => (
                      <span key={t} className="rounded-full bg-slate-800 text-slate-300 text-xs px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                    {(p.technologies || []).length > 4 && (
                      <span className="rounded-full bg-slate-800 text-slate-400 text-xs px-2 py-0.5">
                        +{p.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-800">
                    <a
                      href={`/projet/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
                    >
                      <FaExternalLinkAlt className="w-3 h-3" /> Voir
                    </a>
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/admin/projects/${p.id}/edit`}
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
                        title="Editer"
                      >
                        <FaEdit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        disabled={busy}
                        className="p-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-60 transition"
                        title="Supprimer"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
