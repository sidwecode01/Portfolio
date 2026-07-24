import { supabase, isSupabaseConfigured, MEDIA_BUCKET } from "./supabase";

// Normalise une ligne Supabase vers la forme utilisee par l'UI.
export function normalizeCertification(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name || "",
    issuer: row.issuer || "",
    year: row.year || "",
    credentialUrl: row.credential_url || "",
    image: row.image || "",
    description: row.description || "",
    technologies: row.technologies || [],
    sortOrder: row.sort_order ?? 0,
  };
}

// Lecture (site public). Renvoie [] si Supabase non configure ou table vide.
export async function getCertifications() {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    console.error("[certifications] fetch error:", error.message);
    return [];
  }
  return (data || []).map(normalizeCertification);
}

// Convertit la forme du formulaire vers une ligne Supabase.
function toRow(form) {
  return {
    name: form.name?.trim(),
    issuer: form.issuer || null,
    year: form.year || null,
    credential_url: form.credentialUrl || null,
    image: form.image || null,
    description: form.description || null,
    technologies: form.technologies || [],
    sort_order: Number(form.sortOrder) || 0,
  };
}

export async function createCertification(form) {
  const { data, error } = await supabase
    .from("certifications")
    .insert(toRow(form))
    .select()
    .single();
  if (error) throw error;
  return normalizeCertification(data);
}

export async function updateCertification(id, form) {
  const { data, error } = await supabase
    .from("certifications")
    .update(toRow(form))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return normalizeCertification(data);
}

export async function deleteCertification(id) {
  const { error } = await supabase.from("certifications").delete().eq("id", id);
  if (error) throw error;
}

export async function getCertificationById(id) {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return normalizeCertification(data);
}

// Upload d'un logo / badge de certification (reutilise le bucket des medias).
export async function uploadCertificationImage(file) {
  const ext = file.name.split(".").pop();
  const path = `cert-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
