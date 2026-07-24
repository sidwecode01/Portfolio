import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaUpload } from "react-icons/fa";
import {
  createCertification,
  updateCertification,
  getCertificationById,
  uploadCertificationImage,
} from "../../lib/certificationsRepo";

const EMPTY = {
  name: "",
  issuer: "",
  year: "",
  credentialUrl: "",
  image: "",
  sortOrder: 0,
};

const inputCls =
  "w-full rounded-lg bg-slate-800 border border-slate-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-300 mb-1">{label}</span>
      {children}
      {hint && <span className="block text-xs text-slate-500 mt-1">{hint}</span>}
    </label>
  );
}

export default function CertificationForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    getCertificationById(id)
      .then((c) => setForm({ ...EMPTY, ...c }))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadCertificationImage(file);
      set("image", url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Le nom de la certification est obligatoire.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (isEdit) await updateCertification(id, form);
      else await createCertification(form);
      navigate("/admin/certifications");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-slate-500">Chargement...</div>;

  return (
    <div className="max-w-2xl">
      <Link
        to="/admin/certifications"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4"
      >
        <FaArrowLeft className="w-3 h-3" /> Retour aux certifications
      </Link>

      <h1 className="text-2xl font-bold text-white mb-6">
        {isEdit ? "Editer la certification" : "Nouvelle certification"}
      </h1>

      {error && (
        <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm p-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <Field label="Nom de la certification *">
            <input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="Ex: Responsive Web Design" />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Organisme">
              <input className={inputCls} value={form.issuer} onChange={(e) => set("issuer", e.target.value)} placeholder="Ex: freeCodeCamp" />
            </Field>
            <Field label="Annee">
              <input className={inputCls} value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="Ex: 2024" />
            </Field>
          </div>
          <Field label="Lien de verification" hint="URL publique du certificat (optionnel).">
            <input className={inputCls} value={form.credentialUrl} onChange={(e) => set("credentialUrl", e.target.value)} placeholder="https://..." />
          </Field>
          <Field label="Ordre d'affichage">
            <input type="number" className={inputCls} value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} />
          </Field>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <h2 className="text-white font-semibold">Logo / badge (optionnel)</h2>
          {form.image && (
            <img src={form.image} alt="" className="w-20 h-20 object-cover rounded-xl border border-slate-700" />
          )}
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm cursor-pointer">
              <FaUpload className="w-4 h-4" />
              {uploading ? "Envoi..." : "Uploader une image"}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e.target.files[0])} disabled={uploading} />
            </label>
            <span className="text-slate-500 text-sm">ou</span>
            <input
              className={inputCls + " flex-1 min-w-[200px]"}
              placeholder="Coller une URL d'image"
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
            />
          </div>
        </section>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold"
          >
            {saving ? "Enregistrement..." : isEdit ? "Mettre a jour" : "Creer"}
          </button>
          <Link to="/admin/certifications" className="px-6 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
