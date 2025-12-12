import { useState } from "react";
import logo from "../assets/Logo.png"

const NavbarLinks = [
  { id: 1, name: "Home", link: "#home" },
  { id: 2, name: "Compétences", link: "#skills" },
  { id: 3, name: "Experience", link: "#experience" },
  { id: 4, name: "Mes projets", link: "#projects" },
  { id: 5, name: "Contact", link: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 w-full z-20 bg-blue-950 ">
      <div className="container mx-auto p-5 flex flex-col md:flex-row items-center justify-between">
        {/* Logo + Burger */}
        <div className="flex justify-between w-full md:w-auto items-center">
          <a className="text-white font-bold text-3xl"><img
  src={logo}
  alt="Sid-Of-God"
  className="w-15 h-15 mx-auto my-4 rounded-lg shadow-lg transition-transform hover:scale-105"
/>
</a>

          {/* Bouton burger */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu mobile avec transition */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col items-center text-gray-300">
            {NavbarLinks.map((navBar) => (
              <a key={navBar.id} href={navBar.link} className="hover:text-white mb-2">
                {navBar.name}
              </a>
            ))}
            <a href="#contactMe">
              <button className="text-gray-950 mt-4 bg-white hover:bg-blue-300 font-semibold rounded-full text-sm px-5 py-2.5 text-center">
                Contact
              </button>
            </a>
          </nav>
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex md:ml-auto md:mr-auto font-medium flex-wrap items-center text-base text-gray-300 justify-center">
          {NavbarLinks.map((navBar) => (
            <a key={navBar.id} href={navBar.link} className="hover:text-white mr-7">
              {navBar.name}
            </a>
          ))}
        </nav>

        {/* Bouton desktop */}
        <a href="#contactMe" className="hidden md:flex">
          <button className="text-gray-950 mt-4 bg-white hover:bg-blue-300 font-semibold rounded-full text-sm px-5 py-2.5 text-center">
            Contact
          </button>
        </a>
      </div>
    </header>
  );
}
