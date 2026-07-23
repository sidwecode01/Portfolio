import { supabase, isSupabaseConfigured, MEDIA_BUCKET } from "./supabase";
import { projects as staticProjects } from "../data/projects";
import { slugify } from "../utils/slugify";

// ------------------------------------------------------------------
//  Normalisation : convertit une ligne Supabase (snake_case) OU un
//  objet statique vers la forme utilisee par les composants d'UI.
// ------------------------------------------------------------------
export function normalizeProject(row) {
  if (!row) return null;
  const slug = row.slug || slugify(row.title || "");
  return {
    id: row.id ?? slug,
    title: row.title || "",
    slug,
    tagline: row.tagline || "",
    description: row.description || "",
    overview: row.overview || "",
    problem: row.problem || "",
    solution: row.solution || "",
    role: row.role || "",
    architecture: row.architecture || "",
    // `image` = compat avec l'UI existante, `cover_image` cote DB
    image: row.cover_image || row.image || "",
    technologies: row.technologies || [],
    features: row.features || [],
    challenges: row.challenges || [],
    solutions: row.solutions || [],
    results: row.results || [],
    nextSteps: row.next_steps || row.nextSteps || [],
    media: Array.isArray(row.media) ? row.media : [],
    links: row.links || {},
    featured: Boolean(row.featured),
    sortOrder: row.sort_order ?? 0,
  };
}

// Forme statique -> forme UI (les fichiers importes ont deja `image`).
const normalizedStatic = staticProjects.map((p, i) =>
  normalizeProject({ ...p, sort_order: i })
);

// ------------------------------------------------------------------
//  Lecture (site public)
// ------------------------------------------------------------------

/**
 * Renvoie tous les projets. Utilise Supabase si configure et si la table
 * contient des donnees, sinon retombe sur les projets statiques.
 * @returns {Promise<{ projects: object[], source: 'supabase'|'static' }>}
 */
export async function getProjects() {
  if (!isSupabaseConfigured) {
    return { projects: normalizedStatic, source: "static" };
  }
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[projects] fetch error:", error.message);
    return { projects: normalizedStatic, source: "static" };
  }
  if (!data || data.length === 0) {
    return { projects: normalizedStatic, source: "static" };
  }
  return { projects: data.map(normalizeProject), source: "supabase" };
}

export async function getProjectBySlug(slug) {
  const { projects } = await getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

// ------------------------------------------------------------------
//  Ecriture (admin) — necessite une session authentifiee
// ------------------------------------------------------------------

// Convertit la forme du formulaire vers une ligne Supabase.
function toRow(form) {
  return {
    title: form.title?.trim(),
    slug: (form.slug?.trim() || slugify(form.title || "")),
    tagline: form.tagline || null,
    description: form.description || null,
    overview: form.overview || null,
    problem: form.problem || null,
    solution: form.solution || null,
    role: form.role || null,
    architecture: form.architecture || null,
    // Accepte `cover_image` (formulaire) ou `image` (objet normalise/import).
    cover_image: form.cover_image || form.image || null,
    technologies: form.technologies || [],
    features: form.features || [],
    challenges: form.challenges || [],
    solutions: form.solutions || [],
    results: form.results || [],
    next_steps: form.nextSteps || [],
    media: form.media || [],
    links: form.links || {},
    featured: Boolean(form.featured),
    sort_order: Number(form.sortOrder) || 0,
  };
}

export async function createProject(form) {
  const { data, error } = await supabase
    .from("projects")
    .insert(toRow(form))
    .select()
    .single();
  if (error) throw error;
  return normalizeProject(data);
}

export async function updateProject(id, form) {
  const { data, error } = await supabase
    .from("projects")
    .update(toRow(form))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return normalizeProject(data);
}

export async function deleteProject(id) {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

export async function getProjectById(id) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return normalizeProject(data);
}

// Import unique des projets statiques dans la base (bouton admin).
export async function importDefaultProjects() {
  const rows = staticProjects.map((p, i) =>
    toRow({ ...normalizeProject({ ...p, sort_order: i }) })
  );
  const { data, error } = await supabase
    .from("projects")
    .insert(rows)
    .select();
  if (error) throw error;
  return data?.length || 0;
}

// ------------------------------------------------------------------
//  Upload de media (image / video) vers Supabase Storage
// ------------------------------------------------------------------
export async function uploadMedia(file) {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
