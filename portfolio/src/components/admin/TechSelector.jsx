import { useMemo, useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { TECHNOLOGIES } from "../../data/technologies";

// Selecteur de technologies a puces : liste predefinie cliquable + recherche,
// avec ajout d'une valeur personnalisee si besoin. Evite les fautes de frappe.
export default function TechSelector({ value = [], onChange }) {
  const [query, setQuery] = useState("");

  const has = (tech) => value.some((v) => v.toLowerCase() === tech.toLowerCase());

  const add = (tech) => {
    const t = tech.trim();
    if (!t || has(t)) return;
    onChange([...value, t]);
    setQuery("");
  };

  const remove = (tech) => onChange(value.filter((v) => v !== tech));

  const q = query.trim().toLowerCase();

  const suggestions = useMemo(
    () =>
      TECHNOLOGIES.filter(
        (t) => !has(t) && (!q || t.toLowerCase().includes(q))
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q, value]
  );

  const canAddCustom =
    query.trim() &&
    !TECHNOLOGIES.some((t) => t.toLowerCase() === query.trim().toLowerCase()) &&
    !has(query.trim());

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (canAddCustom) add(query);
      else if (suggestions.length === 1) add(suggestions[0]);
    }
    if (e.key === "Backspace" && !query && value.length) {
      remove(value[value.length - 1]);
    }
  };

  return (
    <div className="rounded-lg bg-slate-800 border border-slate-700 p-3 space-y-3">
      {/* Technologies selectionnees */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 text-white text-sm pl-3 pr-2 py-1"
            >
              {tech}
              <button
                type="button"
                onClick={() => remove(tech)}
                className="rounded-full hover:bg-blue-500 p-0.5"
                aria-label={`Retirer ${tech}`}
              >
                <FaTimes className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Recherche + ajout custom */}
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher ou ajouter une technologie..."
          className="flex-1 rounded-md bg-slate-900 border border-slate-700 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {canAddCustom && (
          <button
            type="button"
            onClick={() => add(query)}
            className="flex items-center gap-1.5 px-3 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium whitespace-nowrap"
          >
            <FaPlus className="w-3 h-3" /> Ajouter "{query.trim()}"
          </button>
        )}
      </div>

      {/* Suggestions cliquables */}
      {suggestions.length > 0 ? (
        <div className="flex flex-wrap gap-2 max-h-44 overflow-y-auto">
          {suggestions.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => add(tech)}
              className="rounded-full border border-slate-600 text-slate-300 text-sm px-3 py-1 hover:border-blue-500 hover:text-white hover:bg-slate-700 transition"
            >
              {tech}
            </button>
          ))}
        </div>
      ) : (
        !canAddCustom && (
          <p className="text-xs text-slate-500">Toutes les technologies proposees sont selectionnees.</p>
        )
      )}
    </div>
  );
}
