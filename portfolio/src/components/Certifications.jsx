import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCertificate, FaExternalLinkAlt } from "react-icons/fa";
import { useCertifications } from "../hooks/useCertifications";
import { useReveal } from "../hooks/useReveal";

/* ------------------------------------------------------------------ */
/*  Carrousel en eventail — inspire des galeries incurvees :           */
/*  bandeau creme, cartes inclinees selon leur position, fleches.      */
/* ------------------------------------------------------------------ */

const CARD_W = 288; // largeur d'une carte (w-72)
const GAP = 24;     // gap-6
const VISIBLE = 3;  // cartes pleinement visibles sur desktop

// Inclinaison / decalage vertical selon la distance au centre :
// centre droit et haut, cartes externes pivotees et legerement plus basses.
function tiltFor(offset) {
  const clamped = Math.max(-2.5, Math.min(2.5, offset));
  return {
    rotate: clamped * 4,               // degres
    y: Math.abs(clamped) * 16,         // px vers le bas
  };
}

function CertificationCard({ certification, offset }) {
  const { name, issuer, year, credentialUrl, image, description, technologies } = certification;
  const { rotate, y } = tiltFor(offset);

  return (
    <article
      className="flex-none w-72 overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-30px_rgba(2,6,23,0.6)] transition-transform duration-500 ease-out"
      style={{ transform: `translateY(${y}px) rotate(${rotate}deg)` }}
    >
      {/* Visuel du certificat */}
      <div className="h-44 w-full overflow-hidden bg-blue-50">
        {image ? (
          <img src={image} alt={name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FaCertificate className="h-10 w-10 text-blue-300" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-snug text-slate-900 line-clamp-2" title={name}>
            {name}
          </h3>
          {year && <span className="shrink-0 text-sm font-medium text-blue-600">{year}</span>}
        </div>
        {issuer && <p className="mt-0.5 text-sm text-slate-500">{issuer}</p>}
        {description && (
          <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">{description}</p>
        )}

        {technologies?.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {technologies.slice(0, 4).map((tech) => (
              <li key={tech} className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">
                {tech}
              </li>
            ))}
            {technologies.length > 4 && (
              <li className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">
                +{technologies.length - 4}
              </li>
            )}
          </ul>
        )}

        {credentialUrl && (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-900"
            aria-label={`Voir le certificat ${name}`}
          >
            Voir le certificat <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

export default function Certifications() {
  const { certifications, loading } = useCertifications();
  const { ref, visible } = useReveal();
  const [index, setIndex] = useState(0);

  if (loading || certifications.length === 0) return null;

  const canScroll = certifications.length > VISIBLE;
  const maxIndex = Math.max(0, certifications.length - VISIBLE);
  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  // Centre visuel : slot du milieu de la fenetre (mode defilement),
  // ou milieu de la liste (mode statique centre).
  const center = canScroll ? index + (VISIBLE - 1) / 2 : (certifications.length - 1) / 2;

  return (
    <section
      ref={ref}
      aria-labelledby="certifications-title"
      className={`mb-24 overflow-hidden rounded-[2.5rem] bg-blue-950 px-4 py-12 md:py-14 transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* En-tete */}
      <div className="mx-auto max-w-xl text-center">
        <h2 id="certifications-title" className="text-3xl font-bold tracking-tight text-white">
          Certifications
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-blue-100/80 md:text-base">
          Les certifications qui attestent de mes compétences.
        </p>
      </div>

      {/* Galerie en eventail */}
      <div className="mt-10 overflow-hidden px-2 pb-6 pt-4">
        <div
          className={`flex gap-6 transition-transform duration-500 ease-out ${
            canScroll ? "" : "justify-center"
          }`}
          style={canScroll ? { transform: `translateX(-${index * (CARD_W + GAP)}px)` } : undefined}
        >
          {certifications.map((certification, i) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
              offset={i - center}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      {canScroll && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            aria-label="Certifications précédentes"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-950 shadow-md transition hover:bg-blue-100 disabled:cursor-default disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <FaArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={index === maxIndex}
            aria-label="Certifications suivantes"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-950 shadow-md transition hover:bg-blue-100 disabled:cursor-default disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <FaArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
