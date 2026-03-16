import { Link } from "react-router-dom";
import { slugify } from "../utils/slugify";
import { projects } from "../data/projects";

const ProjectCard = ({ image, title }) => (
  <div className="group">
    <Link to={`/projet/${slugify(title)}`} aria-label={`Voir le projet ${title}`}>
      <div className="relative bg-gray-900/80 rounded-2xl overflow-hidden shadow-[0_18px_60px_-40px_rgba(15,23,42,0.7)] transition-transform duration-300 group-hover:-translate-y-1">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
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
  const featuredTitles = [
    "Yobalo - Plateforme de livraison de proximite",
    "My rotten tomato",
    "E-Commerce Web Site (View) - Interface utilisateur d'une boutique en ligne",
    "WorknoteIA - Application mobile de prise de notes avec rapport automatique",
    "Trello Clone Mobile - Application de gestion de taches",
    "Free Ads - Site e-commerce developpe en Laravel",
    "Yowl - Plateforme sociale de commentaires universels",
  ];

  const featuredProjects = featuredTitles
    .map((title) => projects.find((p) => p.title === title))
    .filter(Boolean);

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

        <div data-aos="fade-up" data-aos-delay="400" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
