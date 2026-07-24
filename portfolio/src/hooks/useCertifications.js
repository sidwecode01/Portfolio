import { useEffect, useState } from "react";
import { getCertifications } from "../lib/certificationsRepo";

// Charge les certifications depuis Supabase (liste vide si aucune / non configure).
export function useCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getCertifications()
      .then((c) => active && setCertifications(c))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { certifications, loading };
}
