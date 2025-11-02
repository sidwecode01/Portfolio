import { useState } from "react";
import { FaHtml5, FaCss3Alt, FaReact, FaVuejs, FaGitAlt, FaGithub, FaFigma } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiNestjs, SiLaravel, SiFlask, SiPython } from "react-icons/si";
import { MdLanguage } from "react-icons/md";
import CV_Resume from "../assets/CV_Resume.pdf";
import imageReact from "../assets/framework/react1.png";
import imageNest from "../assets/framework/nest1.jpg";
import imageLaravel from "../assets/framework/laravel.webp";
import imageVue from "../assets/framework/vue.jpg";

const skillsData = {
  "Front-end": ["HTML", "CSS", "Tailwind CSS", "React", "Vue.js", "Next.js"],
  "Back-end": ["Laravel", "NestJS", "Flask", "Python"],
  "Design & Prototypage": ["Figma"],
  "Outils de développement": ["Git", "GitHub", "VS Code"],
  "Méthodologies": ["Agile / Scrum", "Trello"],
  "Langues": ["Français", "Anglais"],
};

const iconMap = {
  HTML: <FaHtml5 className="text-orange-500 text-xl" />,
  CSS: <FaCss3Alt className="text-blue-500 text-xl" />,
  "Tailwind CSS": <SiTailwindcss className="text-teal-400 text-xl" />,
  React: <FaReact className="text-cyan-400 text-xl" />,
  "Vue.js": <FaVuejs className="text-green-500 text-xl" />,
  "Next.js": <SiNextdotjs className="text-black text-xl" />,
  Laravel: <SiLaravel className="text-red-500 text-xl" />,
  NestJS: <SiNestjs className="text-red-600 text-xl" />,
  Flask: <SiFlask className="text-gray-700 text-xl" />,
  Python: <SiPython className="text-yellow-500 text-xl" />,
  Figma: <FaFigma className="text-pink-500 text-xl" />,
  Git: <FaGitAlt className="text-orange-600 text-xl" />,
  GitHub: <FaGithub className="text-black text-xl" />,
//   "VS Code": <SiVscode className="text-blue-600 text-xl" />,
//   Trello: <SiTrello className="text-blue-400 text-xl" />,
  "Agile / Scrum": <MdLanguage className="text-purple-500 text-xl" />,
  Français: <MdLanguage className="text-blue-700 text-xl" />,
  Anglais: <MdLanguage className="text-blue-700 text-xl" />,
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState("Front-end");

  return (
    <main id="skills" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left section */}
        <div className="flex flex-col justify-between">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-blue-950">FULLSTACK DEVELOPER</h1>
            <p className="text-lg text-gray-600 mt-2">Compétences</p>
          </div>

          <div data-aos="fade-left" className="grid grid-cols-2 gap-4">
            <img src={imageReact} alt="React" className="rounded-lg shadow-md h-32 object-cover" />
            <img src={imageNest} alt="NestJS" className="rounded-lg shadow-md h-32 object-cover" />
            <img src={imageLaravel} alt="Laravel" className="rounded-lg shadow-md h-32 object-cover" />
            <img src={imageVue} alt="Vue.js" className="rounded-lg shadow-md h-32 object-cover" />
          </div>

          <div data-aos="fade-up" className="mt-6">
            <a href={CV_Resume} download>
              <button className="bg-blue-950 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-semibold text-sm">
                Télécharger le CV
              </button>
            </a>
          </div>
        </div>

        {/* Right section */}
        <div data-aos="fade-right"  className="bg-white p-6 rounded-lg shadow-md">
          <label className="block mb-2 font-semibold text-gray-700">Catégorie :</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-6"
          >
            {Object.keys(skillsData).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-3 gap-4">
            {skillsData[selectedCategory].map((skill) => (
              <div key={skill} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center shadow">
                  {iconMap[skill] || <span className="text-sm font-medium">{skill[0]}</span>}
                </div>
                <span className="mt-2 text-xs font-medium text-gray-700">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
