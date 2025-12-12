import Navbar from "./Navbar"
import me from '../assets/sidyellow.jpg'
import Typewriter from "typewriter-effect";

export default function HearderDesign() {
    return (<div className='relative overflow-hidden min-h-[550px] sm:min-h-[650px] flex flex-col items-center '> <div className="md:h-[611px] h-[990px] md:w-[1600px] w-[950px]  bg-gradient-to-r  absolute bg-blue-950 rounded-full transform rotate-6 -top-40 md:-top-10 z-0"> </div> <Navbar /> <section className="flex flex-col md:flex-row items-center justify-center w-full px-4 md:px-52 pt-24 pb-4 md:pd-24 md:pt-32 md:pb-24  md:mt-0 z-10"> <div data-aos="fade-up" className="flex-1 md:text-left mt-10 md:mt-0">


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
            Développeur Fullstack passionné par la création
            d’applications utiles et modernes. Formé par Wecode
            et actuellement en Licence 3 à l’UVCI.
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
    )


}
