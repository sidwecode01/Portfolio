import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaUpload, FaPlus } from "react-icons/fa";
import {
  createProject,
  updateProject,
  getProjectById,
  uploadMedia,
} from "../../lib/projectsRepo";
import { slugify } from "../../utils/slugify";
import { guessMediaType } from "../../utils/media";
import TechSelector from "../../components/admin/TechSelector";

const EMPTY = {
  title: "",
  slug: "",
  tagline: "",
  description: "",
  overview: "",
  problem: "",
  solution: "",
  role: "",
  architecture: "",
  cover_image: "",
  technologies: [],
  features: [],
  challenges: [],
  solutions: [],
  results: [],
  nextSteps: [],
  media: [],
  links: { live: "", github: "" },
  featured: false,
  sortOrder: 0,
};

// Champs texte multi-valeurs : un element par ligne.
const linesToArray = (value) =>
  value.split("\n").map((s) => s.trim()).filter(Boolean);
const arrayToLines = (arr) => (arr || []).join("\n");

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-300 mb-1">{label}</span>
      {children}
      {hint && <span className="block text-xs text-slate-500 mt-1">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg bg-slate-800 border border-slate-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function ProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [newMedia, setNewMedia] = useState({ url: "", label: "", type: "auto" });

  useEffect(() => {
    if (!isEdit) return;
    getProjectById(id)
      .then((p) =>
        setForm({
          ...EMPTY,
          ...p,
          links: { live: p.links?.live || "", github: p.links?.github || "" },
        })
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleTitle = (value) => {
    setForm((f) => ({
      ...f,
      title: value,
      // Auto-genere le slug tant qu'on n'est pas en edition manuelle
      slug: !isEdit ? slugify(value) : f.slug,
    }));
  };

  const handleCoverUpload = async (file) => {
    if (!file) return;
    setUploadingCover(true);
    setError("");
    try {
      const url = await uploadMedia(file);
      set("cover_image", url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingCover(false);
    }
  };

  const addMedia = (item) => {
    if (!item.url) return;
    const type = item.type === "auto" ? guessMediaType(item.url) : item.type;
    set("media", [...form.media, { type, url: item.url, label: item.label || "" }]);
    setNewMedia({ url: "", label: "", type: "auto" });
  };

  const handleMediaUpload = async (file) => {
    if (!file) return;
    setUploadingMedia(true);
    setError("");
    try {
      const url = await uploadMedia(file);
      const type = file.type.startsWith("video") ? "video" : "image";
      set("media", [...form.media, { type, url, label: file.name }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingMedia(false);
    }
  };

  const removeMedia = (index) =>
    set("media", form.media.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...form,
        slug: form.slug?.trim() || slugify(form.title),
        links: {
          ...(form.links.live ? { live: form.links.live } : {}),
          ...(form.links.github ? { github: form.links.github } : {}),
        },
      };
      if (isEdit) await updateProject(id, payload);
      else await createProject(payload);
      navigate("/admin/projects");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-slate-500">Chargement...</div>;

  return (
    <div className="max-w-3xl">
      <Link
        to="/admin/projects"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4"
      >
        <FaArrowLeft className="w-3 h-3" /> Retour aux projets
      </Link>

      <h1 className="text-2xl font-bold text-white mb-6">
        {isEdit ? "Editer le projet" : "Nouveau projet"}
      </h1>

      {error && (
        <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm p-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* --- Infos principales --- */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h2 className="text-white font-semibold">Informations</h2>
          <Field label="Titre *">
            <input className={inputCls} value={form.title} onChange={(e) => handleTitle(e.target.value)} required />
          </Field>
          <Field label="Slug (URL)" hint="Genere automatiquement depuis le titre.">
            <input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} />
          </Field>
          <Field label="Tagline (accroche)">
            <input className={inputCls} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </Field>
          <Field label="Description (carte + apercu)">
            <textarea rows={3} className={inputCls} value={form.description} onChange={(e) => set("description", e.target.value)} />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Ordre d'affichage">
              <input type="number" className={inputCls} value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} />
            </Field>
            <label className="flex items-center gap-3 mt-7">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <span className="text-sm text-slate-300">Mettre a la une (page d'accueil)</span>
            </label>
          </div>
        </section>

        {/* --- Image de couverture --- */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h2 className="text-white font-semibold">Image de couverture</h2>
          {form.cover_image && (
            <img src={form.cover_image} alt="" className="w-40 h-28 object-cover rounded-lg border border-slate-700" />
          )}
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm cursor-pointer">
              <FaUpload className="w-4 h-4" />
              {uploadingCover ? "Envoi..." : "Uploader une image"}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleCoverUpload(e.target.files[0])} disabled={uploadingCover} />
            </label>
            <span className="text-slate-500 text-sm">ou</span>
            <input
              className={inputCls + " flex-1 min-w-[200px]"}
              placeholder="Coller une URL d'image"
              value={form.cover_image}
              onChange={(e) => set("cover_image", e.target.value)}
            />
          </div>
        </section>

        {/* --- Medias (galerie) --- */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h2 className="text-white font-semibold">Medias (images, videos, liens)</h2>

          {form.media.length > 0 && (
            <ul className="space-y-2">
              {form.media.map((m, i) => (
                <li key={i} className="flex items-center gap-3 bg-slate-800 rounded-lg p-2">
                  <span className="text-xs uppercase font-semibold text-blue-400 w-12">{m.type}</span>
                  <span className="text-slate-300 text-sm truncate flex-1">{m.label || m.url}</span>
                  <button type="button" onClick={() => removeMedia(i)} className="p-2 text-slate-400 hover:text-red-400">
                    <FaTrash className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Ajout par URL */}
          <div className="grid sm:grid-cols-[1fr_120px_auto] gap-2">
            <input
              className={inputCls}
              placeholder="URL (image, video YouTube/MP4, ou lien)"
              value={newMedia.url}
              onChange={(e) => setNewMedia((n) => ({ ...n, url: e.target.value }))}
            />
            <select
              className={inputCls}
              value={newMedia.type}
              onChange={(e) => setNewMedia((n) => ({ ...n, type: e.target.value }))}
            >
              <option value="auto">Auto</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="link">Lien</option>
            </select>
            <button
              type="button"
              onClick={() => addMedia(newMedia)}
              className="flex items-center justify-center gap-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium"
            >
              <FaPlus className="w-3 h-3" /> Ajouter
            </button>
          </div>
          <input
            className={inputCls}
            placeholder="Libelle du media (optionnel)"
            value={newMedia.label}
            onChange={(e) => setNewMedia((n) => ({ ...n, label: e.target.value }))}
          />

          {/* Ajout par upload */}
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm cursor-pointer">
            <FaUpload className="w-4 h-4" />
            {uploadingMedia ? "Envoi..." : "Uploader une image / video"}
            <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => handleMediaUpload(e.target.files[0])} disabled={uploadingMedia} />
          </label>
        </section>

        {/* --- Liens --- */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h2 className="text-white font-semibold">Liens</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Demo live">
              <input className={inputCls} placeholder="https://..." value={form.links.live} onChange={(e) => set("links", { ...form.links, live: e.target.value })} />
            </Field>
            <Field label="GitHub">
              <input className={inputCls} placeholder="https://github.com/..." value={form.links.github} onChange={(e) => set("links", { ...form.links, github: e.target.value })} />
            </Field>
          </div>
        </section>

        {/* --- Technologies --- */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h2 className="text-white font-semibold">Technologies</h2>
          <p className="text-xs text-slate-500 -mt-2">
            Clique sur une techno pour l'ajouter. Tu peux aussi en rechercher ou en creer une.
          </p>
          <TechSelector
            value={form.technologies}
            onChange={(techs) => set("technologies", techs)}
          />
        </section>

        {/* --- Etude de cas (champs detailles) --- */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h2 className="text-white font-semibold">Etude de cas (optionnel)</h2>
          <Field label="Vue d'ensemble (overview)">
            <textarea rows={3} className={inputCls} value={form.overview} onChange={(e) => set("overview", e.target.value)} />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Probleme">
              <textarea rows={2} className={inputCls} value={form.problem} onChange={(e) => set("problem", e.target.value)} />
            </Field>
            <Field label="Solution">
              <textarea rows={2} className={inputCls} value={form.solution} onChange={(e) => set("solution", e.target.value)} />
            </Field>
          </div>
          <Field label="Mon role">
            <textarea rows={2} className={inputCls} value={form.role} onChange={(e) => set("role", e.target.value)} />
          </Field>
          <Field label="Architecture">
            <textarea rows={2} className={inputCls} value={form.architecture} onChange={(e) => set("architecture", e.target.value)} />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Fonctionnalites cles (une par ligne)">
              <textarea rows={4} className={inputCls} value={arrayToLines(form.features)} onChange={(e) => set("features", linesToArray(e.target.value))} />
            </Field>
            <Field label="Defis (une par ligne)">
              <textarea rows={4} className={inputCls} value={arrayToLines(form.challenges)} onChange={(e) => set("challenges", linesToArray(e.target.value))} />
            </Field>
            <Field label="Solutions techniques (une par ligne)">
              <textarea rows={4} className={inputCls} value={arrayToLines(form.solutions)} onChange={(e) => set("solutions", linesToArray(e.target.value))} />
            </Field>
            <Field label="Resultats / Impact (une par ligne)">
              <textarea rows={4} className={inputCls} value={arrayToLines(form.results)} onChange={(e) => set("results", linesToArray(e.target.value))} />
            </Field>
          </div>
          <Field label="Ameliorations futures (une par ligne)">
            <textarea rows={3} className={inputCls} value={arrayToLines(form.nextSteps)} onChange={(e) => set("nextSteps", linesToArray(e.target.value))} />
          </Field>
        </section>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold"
          >
            {saving ? "Enregistrement..." : isEdit ? "Mettre a jour" : "Creer le projet"}
          </button>
          <Link to="/admin/projects" className="px-6 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
