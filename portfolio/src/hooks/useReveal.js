import { useEffect, useState } from "react";

// Declenche `visible` quand l'element entre dans le viewport (une seule fois).
// Alternative legere a Framer Motion pour les animations d'apparition :
// a combiner avec des classes de transition CSS (opacity / translate).
//
// `ref` est un callback ref : l'observer s'attache des que l'element existe
// reellement dans le DOM — y compris s'il apparait apres un chargement
// asynchrone (composant qui rend `null` le temps du fetch).
export function useReveal(options = { threshold: 0.15 }) {
  const [el, setEl] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!el || visible) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [el]);

  return { ref: setEl, visible };
}
