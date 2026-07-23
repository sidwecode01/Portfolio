import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../lib/analytics";
import { useAuth } from "../hooks/useAuth";

// Enregistre une visite a chaque changement d'URL (hors pages admin).
export default function AnalyticsTracker() {
  const location = useLocation();
  const { isAdmin, loading } = useAuth();
  const lastRef = useRef({ path: null, time: 0 });

  useEffect(() => {
    const path = location.pathname;

    // On attend de connaitre le statut admin avant de decider.
    if (loading) return;
    // Ne compte pas les pages d'admin ni tes propres visites (admin connecte).
    if (path.startsWith("/admin") || isAdmin) return;

    // Anti-doublon : ignore la meme page trackee il y a moins de 2s.
    // Neutralise le double-appel du StrictMode (dev) et les re-renders rapides.
    const now = Date.now();
    if (lastRef.current.path === path && now - lastRef.current.time < 2000) return;
    lastRef.current = { path, time: now };

    trackPageView(path);
  }, [location.pathname, isAdmin, loading]);

  return null;
}
