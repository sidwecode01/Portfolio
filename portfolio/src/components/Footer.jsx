import logo from "../assets/Logo.png";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-blue-950 text-white mt-20">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-900/40 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-800/30 blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-5 py-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="h-12 w-12 rounded-xl object-cover" />
              <div>
                <h2 className="text-xl font-semibold">Mon Portfolio</h2>
                <p className="text-xs text-white/70">Designer & Fullstack Developer</p>
              </div>
            </div>
            <p className="text-base text-white/70 leading-relaxed">
              Developpeur Fullstack passionne par le web moderne, les interfaces
              elegantes et les experiences utiles.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs text-white/80">
              Disponible pour collaborations et missions.
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Navigation</h3>
            <ul className="space-y-2 text-base text-white/70">
              <li><a href="#home" className="hover:text-white">Accueil</a></li>
              <li><a href="#skills" className="hover:text-white">Competences</a></li>
              <li><a href="#projects" className="hover:text-white">Projets</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Suivez-moi</h3>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/EpitechCodingAcademyPromo2026"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/koffi-sidoine-nango-160a2833b/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com/tonprofil"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaTwitter />
              </a>
            </div>
            <div className="text-base text-white/70">
              <p>sidoine.nango@epitech.eu</p>
              <p>+225 0151390918</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-white/60">
          &copy; {new Date().getFullYear()} Sid-Of-God Design (Portfolio). Tous droits reserves.
        </div>
      </div>
    </footer>
  );
}
