import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Permet au site de fonctionner (avec les projets statiques en fallback)
// meme si Supabase n'est pas encore configure.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "[Supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY manquants. " +
      "Le site utilise les projets statiques et l'admin est desactive. " +
      "Copie .env.example en .env pour activer Supabase."
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Nom du bucket de stockage des medias (images / videos des projets)
export const MEDIA_BUCKET = "project-media";
