import Navbar from "./Navbar"
import me from '../assets/sidyellow2.png'
import Typewriter from "typewriter-effect";

export default function HearderDesign() {
    return (
    <div className='relative min-h-[550px] sm:min-h-[650px] flex flex-col items-center overflow-hidden'>
        <div className="relative w-full">
            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1440 700"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <path
                    d="M0,0 H1440 V560 Q1080,700 760,620 Q520,560 0,560 Z"
                    fill="#1e2a5a"
                />
            </svg>
            <div className="relative z-10">
                <Navbar />
                <section className="flex flex-col md:flex-row items-center justify-center w-full px-4 md:px-52 pt-24 pb-8 md:pt-32 md:pb-24 md:mt-0">
                    <div data-aos="fade-up" className="flex-1 md:text-left mt-10 md:mt-0">


        {/* Effet d'écriture progressive */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white md-4">
            <Typewriter
                options={{
                    strings: ["Nango Koffi Sidoine"],
                    autoStart: true,
                    loop: true,
                    delay: 70,
                    deleteSpeed: 50,
                    pauseFor: 2000,
                }}
            />

        </h1>

        <p data-aos="fade-up" data-aos-delay="300"
            className="text-base sm:text-lg text-gray-300 mb-6">
          Développeur Fullstack, je conçois des applications modernes qui résolvent de vrais problèmes. Formé par Wecode et en Licence 3 à l’UVCI, je transforme des idées ambitieuses en expériences digitales concrètes.
        </p>

        <a href="#contactMe">
            <button className="text-gray-950 hidden md:block mt-4 bg-white hover:bg-blue-300 font-semibold rounded-full text-sm px-5 py-2.5 text-center">
                Contact
            </button>
        </a>
    </div>

        <div data-aos="fade-up"
            className="flex-1 flex justify-center md:justify-end mt-0 md:mt-0">
            <img src={me} alt="Nothing found to you"
                className="h-[300px] sm:h-[450px] w-[250px] sm:w-[360px] object-cover rounded-lg" />
        </div>

                </section>
            </div>
        </div>
    </div>
    )


}
