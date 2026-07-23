import { createClient } from "@supabase/supabase-js";

// ------------------------------------------------------------------
//  Fonction serverless Vercel : enregistre une visite avec le pays.
//  - Le pays vient de l'en-tete natif Vercel `x-vercel-ip-country`
//    (precis, gratuit, non blocable par un adblock).
//  - L'insertion utilise la cle service_role (JAMAIS exposee au client) :
//    l'insert public direct est ferme cote RLS.
//  Variables d'environnement a definir dans Vercel (Project Settings > Env) :
//    SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// ------------------------------------------------------------------

const regionNames = (() => {
  try {
    return new Intl.DisplayNames(["fr"], { type: "region" });
  } catch {
    return null;
  }
})();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    // Mal configure : on ne casse pas le site, on ignore silencieusement.
    return res.status(204).end();
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { path, referrer, session_id } = body;
    if (!path) return res.status(400).json({ error: "path requis" });

    const code = req.headers["x-vercel-ip-country"] || null;
    let country = null;
    if (code) {
      try {
        country = regionNames ? regionNames.of(code) : code;
      } catch {
        country = code;
      }
    }

    const supabase = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    await supabase.from("page_views").insert({
      path: String(path).slice(0, 512),
      referrer: referrer ? String(referrer).slice(0, 512) : null,
      session_id: session_id ? String(session_id).slice(0, 100) : null,
      user_agent: req.headers["user-agent"]?.slice(0, 512) || null,
      country,
      country_code: code,
    });

    return res.status(204).end();
  } catch (err) {
    // L'analytics ne doit jamais faire echouer la navigation cote client.
    console.error("[track] ", err?.message);
    return res.status(500).json({ error: "internal error" });
  }
}
