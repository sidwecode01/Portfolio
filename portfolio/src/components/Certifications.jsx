import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCertificate, FaExternalLinkAlt } from "react-icons/fa";
import { useCertifications } from "../hooks/useCertifications";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Certifications animees avec GSAP :                                 */
/*  - entree en cascade au scroll (ScrollTrigger)                      */
/*  - defilement infini automatique (marquee), pause au survol         */
/*  Aucun bouton : tout est porte par l'animation.                     */
/* ------------------------------------------------------------------ */

// Nombre de copies de la liste pour un bouclage sans couture.
const COPIES = 3;
// Couleur du bandeau (blue-950) pour les fondus lateraux.
const BAND = "#172554";

function CertificationCard({ certification }) {
  const { name, issuer, year, credentialUrl, image, description, technologies } = certification;
  return (
    <article className="cert-card w-80 flex-none overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-30px_rgba(2,6,23,0.6)]">
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
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    if (loading || certifications.length === 0) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Entree : en-tete puis cartes en cascade, au moment ou la section
      // arrive a l'ecran.
      gsap.fromTo(
        ".cert-head",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        ".cert-card",
        { opacity: 0, y: 48, rotate: 2 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
        }
      );

      // Defilement infini : la piste contient COPIES exemplaires de la liste;
      // on la deplace d'un exemplaire complet puis GSAP boucle sans couture.
      if (!prefersReduced) {
        marqueeRef.current = gsap.to(trackRef.current, {
          xPercent: -100 / COPIES,
          ease: "none",
          duration: Math.max(18, certifications.length * 9),
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, certifications]);

  if (loading || certifications.length === 0) return null;

  // Liste dupliquee pour le bouclage.
  const loopItems = Array.from({ length: COPIES }).flatMap((_, copy) =>
    certifications.map((c) => ({ ...c, _key: `${copy}-${c.id}` }))
  );

  const pause = () => marqueeRef.current?.pause();
  const play = () => marqueeRef.current?.play();

  return (
    <section
      ref={sectionRef}
      aria-labelledby="certifications-title"
      className="mb-24 overflow-hidden rounded-[2.5rem] bg-blue-950 px-0 py-12 md:py-14"
    >
      {/* En-tete */}
      <div className="cert-head mx-auto max-w-xl px-5 text-center">
        <h2 id="certifications-title" className="text-3xl font-bold tracking-tight text-white">
          Certifications
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-blue-100/80 md:text-base">
          Les certifications qui attestent de mes compétences.
        </p>
      </div>

      {/* Marquee infini */}
      <div
        className="relative mt-10"
        onMouseEnter={pause}
        onMouseLeave={play}
        onTouchStart={pause}
        onTouchEnd={play}
      >
        {/* Fondus lateraux pour une entree/sortie douce des cartes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28"
          style={{ backgroundImage: `linear-gradient(to right, ${BAND}, transparent)` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28"
          style={{ backgroundImage: `linear-gradient(to left, ${BAND}, transparent)` }}
        />

        <div className="overflow-hidden py-4">
          <div ref={trackRef} className="flex w-max gap-6 pr-6">
            {loopItems.map((certification) => (
              <CertificationCard key={certification._key} certification={certification} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
