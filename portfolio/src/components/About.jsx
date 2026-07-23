import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaReact, FaCss3Alt, FaJs, FaGitAlt, FaVuejs, FaHtml5, FaNodeJs, FaPython,
  FaAngular, FaBootstrap, FaDocker, FaAws, FaFigma, FaPhp, FaJava,
  FaArrowLeft, FaArrowRight, FaCheck, FaExternalLinkAlt, FaGithub, FaEnvelope,
  FaBullseye, FaLightbulb, FaLayerGroup, FaStar, FaWrench, FaImages, FaTrophy,
  FaRocket, FaUserAstronaut,
} from "react-icons/fa";
import {
  SiLaravel, SiNestjs, SiNextdotjs, SiTailwindcss, SiPostman, SiFlask,
  SiTypescript, SiMongodb, SiPostgresql, SiMysql, SiFirebase, SiSupabase,
  SiRedux, SiGraphql, SiDjango, SiFlutter, SiSwift, SiKotlin, SiRedis,
  SiVercel, SiNetlify, SiSass, SiExpress, SiSvelte,
} from "react-icons/si";
import { getProjectBySlug } from "../lib/projectsRepo";
import MediaGallery from "./MediaGallery";
import { withPlaceholder, onImageError } from "../utils/media";

const techIcons = {
  React: <FaReact className="text-blue-400 w-6 h-6" />,
  "React Native": <FaReact className="text-cyan-400 w-6 h-6" />,
  "Tailwind CSS": <SiTailwindcss className="text-teal-400 w-6 h-6" />,
  JavaScript: <FaJs className="text-yellow-400 w-6 h-6" />,
  TypeScript: <SiTypescript className="text-blue-500 w-6 h-6" />,
  Git: <FaGitAlt className="text-red-500 w-6 h-6" />,
  "Vue.js": <FaVuejs className="text-green-500 w-6 h-6" />,
  Svelte: <SiSvelte className="text-orange-600 w-6 h-6" />,
  Angular: <FaAngular className="text-red-600 w-6 h-6" />,
  Laravel: <SiLaravel className="text-red-600 w-6 h-6" />,
  PHP: <FaPhp className="text-indigo-400 w-6 h-6" />,
  Java: <FaJava className="text-red-500 w-6 h-6" />,
  HTML: <FaHtml5 className="text-orange-500 w-6 h-6" />,
  CSS: <FaCss3Alt className="text-blue-500 w-6 h-6" />,
  Sass: <SiSass className="text-pink-400 w-6 h-6" />,
  Bootstrap: <FaBootstrap className="text-purple-500 w-6 h-6" />,
  Redux: <SiRedux className="text-purple-400 w-6 h-6" />,
  "Node.js": <FaNodeJs className="text-green-600 w-6 h-6" />,
  Express: <SiExpress className="text-gray-300 w-6 h-6" />,
  NestJS: <SiNestjs className="text-red-500 w-6 h-6" />,
  "Next.js": <SiNextdotjs className="text-gray-800 w-6 h-6" />,
  Python: <FaPython className="text-yellow-500 w-6 h-6" />,
  Django: <SiDjango className="text-emerald-600 w-6 h-6" />,
  Flask: <SiFlask className="text-gray-500 w-6 h-6" />,
  Flutter: <SiFlutter className="text-sky-400 w-6 h-6" />,
  Swift: <SiSwift className="text-orange-500 w-6 h-6" />,
  Kotlin: <SiKotlin className="text-purple-500 w-6 h-6" />,
  PostgreSQL: <SiPostgresql className="text-blue-500 w-6 h-6" />,
  MySQL: <SiMysql className="text-sky-600 w-6 h-6" />,
  MongoDB: <SiMongodb className="text-green-500 w-6 h-6" />,
  Supabase: <SiSupabase className="text-emerald-500 w-6 h-6" />,
  Firebase: <SiFirebase className="text-amber-500 w-6 h-6" />,
  Redis: <SiRedis className="text-red-500 w-6 h-6" />,
  GraphQL: <SiGraphql className="text-pink-500 w-6 h-6" />,
  Docker: <FaDocker className="text-blue-400 w-6 h-6" />,
  AWS: <FaAws className="text-orange-400 w-6 h-6" />,
  Vercel: <SiVercel className="text-gray-800 w-6 h-6" />,
  Netlify: <SiNetlify className="text-teal-500 w-6 h-6" />,
  Figma: <FaFigma className="text-pink-500 w-6 h-6" />,
  Postman: <SiPostman className="text-orange-500 w-6 h-6" />,
};

const Section = ({ title, icon: Icon, children }) => (
  <section className="rounded-3xl bg-white border border-slate-200/70 shadow-[0_24px_70px_-55px_rgba(15,23,42,0.6)] p-6 md:p-8">
    <div className="flex items-center gap-3 mb-6">
      <span
        className="grid place-items-center w-10 h-10 rounded-2xl text-white shadow-lg shadow-blue-900/20"
        style={{ backgroundImage: "linear-gradient(135deg, #1e3a8a, #312e81)" }}
      >
        <Icon className="w-4 h-4" />
      </span>
      <h3 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h3>
    </div>
    <div className="text-slate-600 leading-relaxed text-base md:text-lg">{children}</div>
  </section>
);

const CheckItem = ({ children, tone = "emerald" }) => {
  const tones = {
    emerald: "text-emerald-600 bg-emerald-50",
    blue: "text-blue-600 bg-blue-50",
    amber: "text-amber-600 bg-amber-50",
  };
  return (
    <li className="flex items-start gap-3">
      <span className={`mt-0.5 grid place-items-center w-5 h-5 rounded-full shrink-0 ${tones[tone]}`}>
        <FaCheck className="w-2.5 h-2.5" />
      </span>
      <span>{children}</span>
    </li>
  );
};

export default function About() {
  const { title } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProjectBySlug(title)
      .then((p) => active && setProject(p))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [title]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 rounded-full border-2 border-slate-600 border-t-blue-400 animate-spin" />
          Chargement du projet...
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-950 text-slate-300 px-6 text-center">
        <p className="text-lg">Aucun projet ne correspond a cette adresse.</p>
        <Link to="/#projects" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold">
          <FaArrowLeft className="w-3 h-3" /> Retour aux projets
        </Link>
      </div>
    );
  }

  const techs = project.technologies || [];
  const media =
    project.media && project.media.length > 0
      ? project.media
      : project.image
      ? [{ type: "image", url: project.image }]
      : [];
  const features = project.features?.length ? project.features : [
    "Interface claire et responsive",
    "Parcours utilisateur fluide",
    "Architecture modulaire pour evoluer facilement",
  ];
  const challenges = project.challenges?.length ? project.challenges : [
    "Optimisation des performances front-end",
    "Gestion d'etat et interaction complexe",
    "Qualite visuelle sans compromettre la rapidite",
  ];
  const solutions = project.solutions?.length ? project.solutions : [
    "Chargement progressif des contenus",
    "Composants reutilisables et separation claire",
    "Animations legeres et GPU friendly",
  ];
  const results = project.results?.length ? project.results : [
    "Experience utilisateur plus fluide",
    "Navigation plus intuitive",
    "Interface professionnelle et moderne",
  ];
  const nextSteps = project.nextSteps?.length ? project.nextSteps : [
    "Ajouter des analytics pour mieux comprendre l'usage",
    "Ameliorer l'accessibilite et le SEO",
    "Optimiser encore les temps de chargement",
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ------------------------------ HERO ------------------------------ */}
      <header
        className="relative overflow-hidden text-white"
        style={{ backgroundImage: "linear-gradient(135deg, #020617, #172554, #1e1b4b)" }}
      >
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-20">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition mb-12"
          >
            <FaArrowLeft className="w-3 h-3" /> Retour aux projets
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-300 bg-blue-500/10 border border-blue-400/20 rounded-full px-3 py-1">
                <FaStar className="w-3 h-3" /> Etude de cas
              </span>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mt-5">
                {project.title}
              </h1>
              <p className="text-white/70 text-base md:text-lg mt-4 max-w-xl">
                {project.tagline ||
                  "Projet concu pour resoudre un besoin concret avec une execution moderne."}
              </p>

              {techs.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-full bg-white/10 border border-white/15 backdrop-blur text-white/90 text-xs md:text-sm px-3 py-1.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-8">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-blue-950 text-sm font-semibold hover:bg-blue-50 transition shadow-lg"
                  >
                    <FaExternalLinkAlt className="w-3.5 h-3.5" /> Voir la demo
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition"
                  >
                    <FaGithub className="w-4 h-4" /> Code source
                  </a>
                )}
                {!project.links?.live && !project.links?.github && (
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-blue-950 text-sm font-semibold hover:bg-blue-50 transition shadow-lg"
                  >
                    <FaEnvelope className="w-3.5 h-3.5" /> Demander une demo
                  </a>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -rotate-3 rounded-3xl bg-blue-500/25 blur-xl" />
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/15 shadow-2xl">
                <img
                  src={withPlaceholder(project.image)}
                  onError={onImageError}
                  alt={project.title}
                  className="w-full aspect-[4/3] object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vague de transition */}
        <div className="h-8 bg-slate-100 rounded-t-[2.5rem]" />
      </header>

      {/* ---------------------------- CONTENU ---------------------------- */}
      <main className="max-w-6xl mx-auto px-6 pb-16 -mt-2 space-y-6">
        <Section title="Apercu du projet" icon={FaBullseye}>
          <p>
            {project.overview || project.description ||
              "Ce projet a ete developpe pour repondre a un besoin concret et apporter une solution claire et durable."}
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-5">
              <div className="flex items-center gap-2 text-rose-600 font-semibold mb-2">
                <FaBullseye className="w-4 h-4" /> Probleme
              </div>
              <p className="text-slate-700">
                {project.problem || "Manque d'experience fluide et d'outil centralise pour les utilisateurs."}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold mb-2">
                <FaLightbulb className="w-4 h-4" /> Solution
              </div>
              <p className="text-slate-700">
                {project.solution || "Une interface moderne avec un parcours simplifie et des interactions efficaces."}
              </p>
            </div>
          </div>
        </Section>

        <Section title="Mon role" icon={FaUserAstronaut}>
          <p>
            {project.role ||
              "J'ai concu l'interface, structure les composants, et defini les choix techniques pour garantir une experience fluide."}
          </p>
          <p className="mt-3">
            {project.architecture ||
              "Architecture claire, separation des responsabilites et composants reutilisables pour faciliter l'evolution."}
          </p>
        </Section>

        {techs.length > 0 && (
          <Section title="Stack technique" icon={FaLayerGroup}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {techs.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 bg-white hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 transition"
                >
                  {techIcons[tech] || (
                    <span className="w-6 h-6 grid place-items-center rounded-md bg-slate-100 text-slate-400 text-xs font-bold">
                      {tech.charAt(0)}
                    </span>
                  )}
                  <span className="text-slate-800 text-sm md:text-base font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section title="Fonctionnalites cles" icon={FaStar}>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {features.map((item, index) => (
              <CheckItem key={index} tone="blue">{item}</CheckItem>
            ))}
          </ul>
        </Section>

        <Section title="Defis & solutions" icon={FaWrench}>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5">
              <h4 className="font-semibold text-amber-700 mb-3">Defis</h4>
              <ul className="space-y-2.5">
                {challenges.map((item, index) => (
                  <CheckItem key={index} tone="amber">{item}</CheckItem>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
              <h4 className="font-semibold text-emerald-700 mb-3">Solutions</h4>
              <ul className="space-y-2.5">
                {solutions.map((item, index) => (
                  <CheckItem key={index} tone="emerald">{item}</CheckItem>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {media.length > 0 && (
          <Section title="Galerie" icon={FaImages}>
            <MediaGallery media={media} title={project.title} />
          </Section>
        )}

        <Section title="Resultats & impact" icon={FaTrophy}>
          <div className="grid sm:grid-cols-2 gap-3">
            {results.map((item, index) => (
              <div key={index} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <span className="mt-0.5 grid place-items-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                  <FaCheck className="w-3 h-3" />
                </span>
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Ameliorations futures" icon={FaRocket}>
          <ul className="space-y-2.5">
            {nextSteps.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <FaArrowRight className="mt-1 w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* CTA */}
        <section
          className="relative overflow-hidden rounded-3xl text-white p-8 md:p-10"
          style={{ backgroundImage: "linear-gradient(135deg, #172554, #1e1b4b)" }}
        >
          <div className="pointer-events-none absolute -top-16 -right-10 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Parlons de votre projet</h3>
              <p className="text-white/70 mt-2 text-base md:text-lg max-w-xl">
                Vous avez une idee ou un besoin digital ? Discutons-en pour construire une solution sur-mesure.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a href="/#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-blue-950 text-sm font-semibold hover:bg-blue-50 transition">
                <FaEnvelope className="w-3.5 h-3.5" /> Me contacter
              </a>
              <Link to="/#projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition">
                <FaArrowLeft className="w-3 h-3" /> Autres projets
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
