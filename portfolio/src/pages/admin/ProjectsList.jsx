import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaDownload, FaStar } from "react-icons/fa";
import { supabase } from "../../lib/supabase";
import { normalizeProject, deleteProject, importDefaultProjects } from "../../lib/projectsRepo";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

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

      {loading ? (
        <div className="text-slate-500">Chargement...</div>
      ) : projects.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-slate-400">
          Aucun projet pour l'instant. Cree ton premier projet ou importe les projets par defaut.
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50 text-slate-400">
                <tr>
                  <th className="text-left font-medium px-4 py-3">Projet</th>
                  <th className="text-left font-medium px-4 py-3 hidden md:table-cell">Technologies</th>
                  <th className="text-center font-medium px-4 py-3">A la une</th>
                  <th className="text-right font-medium px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-t border-slate-800 hover:bg-slate-800/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img src={p.image} alt="" className="w-10 h-10 rounded object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded bg-slate-700" />
                        )}
                        <span className="text-white font-medium line-clamp-1">{p.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-slate-400">
                      {(p.technologies || []).slice(0, 3).join(", ")}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {p.featured && <FaStar className="w-4 h-4 text-amber-400 inline" />}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/projects/${p.id}/edit`}
                          className="p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white"
                          title="Editer"
                        >
                          <FaEdit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          disabled={busy}
                          className="p-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-60"
                          title="Supprimer"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
