import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import { useProjects } from "../hooks/useProjects";
import { withPlaceholder, onImageError } from "../utils/media";

const ProjectCard = ({ image, title, slug }) => (
  <div className="group">
    <Link to={`/projet/${slug}`} aria-label={`Voir le projet ${title}`}>
      <div className="relative bg-gray-900/80 rounded-2xl overflow-hidden shadow-[0_18px_60px_-40px_rgba(15,23,42,0.7)] transition-transform duration-300 group-hover:-translate-y-1">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={withPlaceholder(image)}
            onError={onImageError}
            alt={title}
            loading="lazy"
            decoding="async"
            className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="p-5">
          <h2 className="text-lg md:text-xl font-semibold text-white leading-snug">{title}</h2>
          <span className="text-blue-200 inline-flex items-center mt-3 text-sm">
            Ouvrir le projet
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  </div>
);

export default function Projects() {
  const { projects, loading } = useProjects();

  // Priorite aux projets marques "featured" ; sinon les 6 premiers.
  const flagged = projects.filter((p) => p.featured);
  const featuredProjects = (flagged.length > 0 ? flagged : projects).slice(0, 6);

  // Les projets se chargent en asynchrone : on recalcule AOS une fois montes
  // pour eviter que la grille reste invisible (opacity 0).
  useEffect(() => {
    // refreshHard re-scanne le DOM pour enregistrer les elements ajoutes
    // apres l'init d'AOS (grille de projets chargee en asynchrone).
    if (!loading) AOS.refreshHard();
  }, [loading]);

  return (
    <section id="projects" className="text-gray-200 bg-blue-950">
      <div className="container px-5 py-16 mx-auto">
        <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <h1 className="text-white font-semibold text-3xl md:text-4xl">Mes projets</h1>
            <p className="lg:max-w-xl leading-relaxed text-base md:text-lg">
              Chaque projet presente ci-dessous reflete mon parcours, mes apprentissages et ma passion pour le developpement. J'ai explore differentes technologies pour creer des experiences utiles, intuitives et modernes.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl bg-gray-800/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <div data-aos="fade-up" data-aos-delay="400" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
