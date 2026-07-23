import { supabase, isSupabaseConfigured } from "./supabase";

const SESSION_KEY = "pf_session_id";

// Identifiant de session anonyme (pas de donnee perso, juste pour compter
// les visiteurs uniques de maniere approximative).
function getSessionId() {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

// Enregistre une visite. Silencieux en cas d'erreur (ne casse jamais le site).
export async function trackPageView(path) {
  if (!isSupabaseConfigured) return;
  try {
    await supabase.from("page_views").insert({
      path,
      referrer: document.referrer || null,
      session_id: getSessionId(),
      user_agent: navigator.userAgent,
    });
  } catch (err) {
    // On ne bloque pas la navigation pour une erreur d'analytics.
    console.debug("[analytics] track failed:", err?.message);
  }
}

// ------------------------------------------------------------------
//  Lecture des metriques (admin uniquement)
// ------------------------------------------------------------------
export async function getMetrics(days = 30) {
  if (!isSupabaseConfigured) {
    return { total: 0, uniqueVisitors: 0, today: 0, byDay: [], topPages: [], recent: [] };
  }

  const since = new Date();
  since.setDate(since.getDate() - (days - 1));
  since.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("page_views")
    .select("path, session_id, created_at")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: false });

  if (error) throw error;
  const rows = data || [];

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const sessions = new Set();
  const pageCount = {};
  // Prepare un bucket par jour
  const dayMap = {};
  for (let i = 0; i < days; i++) {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    dayMap[d.toISOString().slice(0, 10)] = 0;
  }

  let today = 0;
  for (const r of rows) {
    if (r.session_id) sessions.add(r.session_id);
    pageCount[r.path] = (pageCount[r.path] || 0) + 1;
    const key = new Date(r.created_at).toISOString().slice(0, 10);
    if (key in dayMap) dayMap[key] += 1;
    if (new Date(r.created_at) >= startOfToday) today += 1;
  }

  const byDay = Object.entries(dayMap).map(([date, count]) => ({ date, count }));
  const topPages = Object.entries(pageCount)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  const recent = rows.slice(0, 12);

  return {
    total: rows.length,
    uniqueVisitors: sessions.size,
    today,
    byDay,
    topPages,
    recent,
  };
}
