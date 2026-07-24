import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useProjects } from "../hooks/useProjects";
import { withPlaceholder, onImageError } from "../utils/media";

/* ------------------------------------------------------------------ */
/*  Galerie incurvee plein ecran (style reference "Banh mi") :         */
/*  fond creme, grandes cartes photo bord a bord, bande bombee,        */
/*  fleches rondes tan en bas.                                         */
/* ------------------------------------------------------------------ */

const GAP = 24;      // espacement entre cartes
const VISIBLE = 4;   // cartes environ visibles a l'ecran

// Effet "bande incurvee" (comme la reference) : toutes les cartes sont
// centrees sur la meme ligne horizontale, mais les cartes du CENTRE sont
// plus courtes et celles des BORDS plus hautes (elles debordent en haut et
// en bas), avec une legere rotation vers l'exterieur.
// Courbe attenuee sur mobile (cartes plus petites, moins de place).
function tiltFor(offset, compact = false) {
  const clamped = Math.max(-2.5, Math.min(2.5, offset));
  const base = compact ? 400 : 500;    // hauteur de la carte centrale (px)
  const extra = compact ? 30 : 48;     // hauteur ajoutee par cran d'eloignement
  const deg = compact ? 2.5 : 3.5;     // rotation par cran
  return {
    rotate: clamped * deg,
    height: base + Math.abs(clamped) * extra,
  };
}

function ProjectCard({ project, offset, compact }) {
  const { rotate, height } = tiltFor(offset, compact);
  return (
    <Link
      to={`/projet/${project.slug}`}
      aria-label={`Voir le projet ${project.title}`}
      className="group relative flex-none w-[320px] sm:w-[400px] md:w-[460px] overflow-hidden rounded-md shadow-[0_25px_60px_-30px_rgba(2,6,23,0.9)] transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      style={{ transform: `rotate(${rotate}deg)`, height: `${height}px` }}
    >
      <div className="h-full w-full overflow-hidden bg-blue-900/50">
        <img
          src={withPlaceholder(project.image)}
          onError={onImageError}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
      </div>
      {/* Titre : toujours visible sur mobile (pas de survol au doigt),
          revele au survol sur desktop */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 p-5 pt-16 transition-all duration-300 ${
          compact
            ? "translate-y-0 opacity-100"
            : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.4) 55%, transparent)",
        }}
      >
        <h3 className="font-semibold leading-snug text-white line-clamp-2">{project.title}</h3>
        <span className="mt-1 inline-flex items-center gap-1.5 text-sm text-blue-200">
          Ouvrir le projet <FaArrowRight className="h-3 w-3" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function Projects() {
  const { projects, loading } = useProjects();
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const touchRef = useRef({ x: 0, y: 0 });
  const [step, setStep] = useState(460 + GAP);
  const [visibleCount, setVisibleCount] = useState(VISIBLE);
  const [viewportW, setViewportW] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1280
  );
  const compact = viewportW < 640;

  // Recalcule AOS une fois les projets charges (contenu monte apres init).
  useEffect(() => {
    if (!loading) AOS.refreshHard();
  }, [loading]);

  // Mesure la largeur reelle d'une carte et de l'ecran (responsive) pour
  // connaitre le pas exact et le nombre de cartes visibles.
  useEffect(() => {
    const measure = () => {
      setViewportW(window.innerWidth);
      const first = trackRef.current?.querySelector("a");
      if (first) {
        const s = first.offsetWidth + GAP;
        setStep(s);
        const w = viewportRef.current?.clientWidth || window.innerWidth;
        setVisibleCount(Math.max(1, Math.floor((w + GAP) / s)));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [loading, projects.length]);

  // Priorite aux projets "a la une", sinon tous.
  const flagged = projects.filter((p) => p.featured);
  const items = flagged.length > 0 ? flagged : projects;

  const canScroll = items.length > visibleCount;
  // Un cran de plus a chaque extremite pour degager entierement la premiere
  // et la derniere carte (sinon coupees par les bords a cause du debord).
  const minIndex = -1;
  const maxIndex = Math.max(0, items.length - visibleCount + 1);
  const prev = () => setIndex((i) => Math.max(minIndex, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  // Reclampe l'index si le nombre de cartes visibles change (resize).
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  // Centre visuel de l'ecran pour le calcul d'inclinaison.
  const center = canScroll ? index + (visibleCount - 1) / 2 : (items.length - 1) / 2;

  // Navigation au doigt (swipe horizontal) sur mobile / tablette.
  const onTouchStart = (e) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    // Seuil de 50px et geste plus horizontal que vertical (ne gene pas le scroll).
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
  };

  return (
    <section
      id="projects"
      className="overflow-hidden bg-blue-950 py-14 md:py-16"
      style={{ borderRadius: "50% / 48px" }}
    >
      {/* Texte d'intro discret, centre (comme la reference) */}
      <div data-aos="fade-up" data-aos-delay="200" className="mx-auto max-w-md px-5 text-center">
        <h2 className="sr-only">Mes projets</h2>
        <p className="text-[15px] leading-relaxed text-blue-100/85 md:text-base">
          Chaque projet reflete mon parcours, mes apprentissages
          <br className="hidden sm:block" /> et ma passion pour le developpement.
        </p>
      </div>

      {/* Bande de cartes plein ecran */}
      {loading ? (
        <div className="mt-8 flex items-center justify-center gap-6 overflow-hidden px-4 md:mt-12">
          {Array.from({ length: compact ? 2 : 4 }).map((_, i, arr) => {
            const { rotate, height } = tiltFor(i - (arr.length - 1) / 2, compact);
            return (
              <div
                key={i}
                className="w-[320px] flex-none animate-pulse rounded-md bg-blue-900/50 sm:w-[400px] md:w-[460px]"
                style={{ transform: `rotate(${rotate}deg)`, height: `${height}px` }}
              />
            );
          })}
        </div>
      ) : (
        <div
          ref={viewportRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="mt-8 overflow-hidden pb-6 pt-6 md:mt-12 md:pb-8 md:pt-8"
        >
          <div
            ref={trackRef}
            className={`flex items-center gap-6 transition-transform duration-500 ease-out ${
              canScroll ? "" : "justify-center"
            }`}
            style={
              canScroll
                ? {
                    // Bord a bord : premiere carte visible coupee par le bord
                    // gauche (comme la reference), debord modere pour garder
                    // les cartes lisibles.
                    marginLeft: `-${Math.round(step * 0.3)}px`,
                    transform: `translateX(${-index * step}px)`,
                  }
                : undefined
            }
          >
            {items.map((project, i) => (
              <ProjectCard key={project.id} project={project} offset={i - center} compact={compact} />
            ))}
          </div>
        </div>
      )}

      {/* Fleches rondes tan, centrees */}
      {canScroll && !loading && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            disabled={index === minIndex}
            aria-label="Projets précédents"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-950 shadow-md transition hover:bg-blue-100 disabled:cursor-default disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <FaArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={index === maxIndex}
            aria-label="Projets suivants"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-950 shadow-md transition hover:bg-blue-100 disabled:cursor-default disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <FaArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
