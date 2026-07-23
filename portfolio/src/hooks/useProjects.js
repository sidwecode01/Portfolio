import { useEffect, useState } from "react";
import { getProjects } from "../lib/projectsRepo";

// Charge les projets (Supabase avec fallback statique).
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("static");
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    getProjects()
      .then(({ projects, source }) => {
        if (!active) return;
        setProjects(projects);
        setSource(source);
      })
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { projects, loading, source, error };
}
