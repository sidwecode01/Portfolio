import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaReact, FaCss3Alt, FaJs, FaGitAlt, FaVuejs, FaHtml5 } from "react-icons/fa";
import { SiLaravel, SiNestjs, SiNextdotjs, SiTailwindcss, SiPostman, SiFlask } from "react-icons/si";
import { slugify } from "../utils/slugify";
import { projects } from "../data/projects";

const techIcons = {
  React: <FaReact className="text-blue-400 w-6 h-6" />,
  "Tailwind CSS": <SiTailwindcss className="text-teal-400 w-6 h-6" />,
  JavaScript: <FaJs className="text-yellow-400 w-6 h-6" />,
  Git: <FaGitAlt className="text-red-500 w-6 h-6" />,
  "Vue.js": <FaVuejs className="text-green-500 w-6 h-6" />,
  Laravel: <SiLaravel className="text-red-600 w-6 h-6" />,
  HTML: <FaHtml5 className="text-orange-500 w-6 h-6" />,
  CSS: <FaCss3Alt className="text-blue-500 w-6 h-6" />,
  NestJS: <SiNestjs className="text-red-500 w-6 h-6" />,
  "Next.js": <SiNextdotjs className="text-black w-6 h-6" />,
  Postman: <SiPostman className="text-orange-500 w-6 h-6" />,
  Flask: <SiFlask className="text-gray-500 w-6 h-6" />,
};

const Section = ({ title, children }) => (
  <section className="mt-12">
    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
    <div className="text-gray-700 leading-relaxed text-base md:text-lg">{children}</div>
  </section>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full bg-blue-950 text-white text-xs md:text-sm px-3 py-1">
    {children}
  </span>
);

export default function About() {
  const { title } = useParams();
  const project = projects.find((p) => slugify(p.title) === title);

  if (!project) {
    return <div className="p-6">Pas de projet correspondant a ce titre</div>;
  }

  const techs = project.technologies || [];
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const features = project.features || [
    "Interface claire et responsive",
    "Parcours utilisateur fluide",
    "Architecture modulaire pour evoluer facilement",
  ];
  const challenges = project.challenges || [
    "Optimisation des performances front-end",
    "Gestion d'etat et interaction complexe",
    "Qualite visuelle sans compromettre la rapidite",
  ];
  const solutions = project.solutions || [
    "Chargement progressif des contenus",
    "Composants reutilisables et separation claire",
    "Animations legeres et GPU friendly",
  ];
  const results = project.results || [
    "Experience utilisateur plus fluide",
    "Navigation plus intuitive",
    "Interface professionnelle et moderne",
  ];
  const nextSteps = project.nextSteps || [
    "Ajouter des analytics pour mieux comprendre l'usage",
    "Ameliorer l'accessibilite et le SEO",
    "Optimiser encore les temps de chargement",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-blue-950 font-semibold tracking-wide text-sm uppercase">Case study</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mt-2">
              {project.title}
            </h1>
            <p className="text-gray-600 text-base md:text-lg mt-4">
              {project.tagline || "Projet concu pour resoudre un besoin concret avec une execution moderne."}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {techs.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-blue-950 text-white text-sm font-semibold hover:bg-blue-900 transition"
                >
                  Live demo
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full border border-blue-950 text-blue-950 text-sm font-semibold hover:bg-blue-50 transition"
                >
                  GitHub
                </a>
              )}
              {!project.links?.live && !project.links?.github && (
                <a
                  href="/#contact"
                  className="px-5 py-2 rounded-full bg-blue-950 text-white text-sm font-semibold hover:bg-blue-900 transition"
                >
                  Demander une demo
                </a>
              )}
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-[0_30px_80px_-50px_rgba(15,23,42,0.6)]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        <Section title="Project Overview">
          <p>
            {project.overview || project.description ||
              "Ce projet a ete developpe pour repondre a un besoin concret et apporter une solution claire et durable."}
          </p>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-100 p-4 bg-gray-50">
              <p className="text-sm text-gray-500">Probleme</p>
              <p className="text-gray-800">
                {project.problem || "Manque d'experience fluide et d'outil centralise pour les utilisateurs."}
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 p-4 bg-gray-50">
              <p className="text-sm text-gray-500">Solution</p>
              <p className="text-gray-800">
                {project.solution || "Une interface moderne avec un parcours simplifie et des interactions efficaces."}
              </p>
            </div>
          </div>
        </Section>

        <Section title="My Role">
          <p>
            {project.role ||
              "J'ai concu l'interface, structure les composants, et defini les choix techniques pour garantir une experience fluide."}
          </p>
          <p className="mt-3">
            {project.architecture ||
              "Architecture claire, separation des responsabilites et composants reutilisables pour faciliter l'evolution."}
          </p>
        </Section>

        <Section title="Technical Stack">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {techs.map((tech, index) => (
              <div key={index} className="flex items-center gap-2 rounded-xl border border-gray-100 p-3 bg-white">
                {techIcons[tech]}
                <span className="text-gray-800 text-sm md:text-base font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Key Features">
          <ul className="list-disc pl-5 space-y-2">
            {features.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Challenges & Solutions">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-100 p-5 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-2">Challenges</h4>
              <ul className="list-disc pl-5 space-y-2">
                {challenges.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-100 p-5 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-2">Solutions</h4>
              <ul className="list-disc pl-5 space-y-2">
                {solutions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section title="Screenshots / Gallery">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((img, index) => (
              <div key={index} className="rounded-2xl overflow-hidden border border-gray-100">
                <img
                  src={img}
                  alt={`${project.title} ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-56 object-cover"
                />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Results / Impact">
          <ul className="list-disc pl-5 space-y-2">
            {results.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Next Improvements">
          <ul className="list-disc pl-5 space-y-2">
            {nextSteps.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Section>

        <section className="mt-12 rounded-3xl bg-blue-950 text-white p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">Parlons de votre projet</h3>
            <p className="text-white/80 mt-2 text-base md:text-lg">
              Vous avez une idee ou un besoin digital ? Discutons-en pour construire une solution sur-mesure.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/#contact" className="px-5 py-2 rounded-full bg-white text-blue-950 text-sm font-semibold">
              Me contacter
            </a>
            <Link to="/#projects" className="px-5 py-2 rounded-full border border-white/40 text-white text-sm font-semibold">
              Voir d'autres projets
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
