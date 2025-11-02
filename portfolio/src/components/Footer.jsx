import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer data-aos="fade-right" className="bg-blue-950 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold mb-2">Mon Portfolio</h2>
          <p className="text-sm text-gray-300">
            Développeur Fullstack passionné par le web moderne, les interfaces élégantes et les solutions performantes.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:underline">Accueil</a></li>
            <li><a href="#skills" className="hover:underline">Compétences</a></li>
            <li><a href="#projects" className="hover:underline">Projets</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Suivez-moi</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://github.com/EpitechCodingAcademyPromo2026" target="_blank" rel="noopener noreferrer">
              <FaGithub className="hover:text-gray-400" />
            </a>
            <a href="https://www.linkedin.com/in/koffi-sidoine-nango-160a2833b/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-gray-400" />
            </a>
            <a href="https://twitter.com/tonprofil" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="mt-10 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Sid-Of-God Design (Portfolio). Tous droits réservés.
      </div>
    </footer>
  );
}
