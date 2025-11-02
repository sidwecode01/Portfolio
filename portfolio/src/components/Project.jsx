import image1 from "../assets/image.png"
import ecommerce1 from "../assets/ecommerceFront.png"
import { Link } from "react-router-dom"
import trelloMobile from "../assets/trelloMobile.png"
import rotten from "../assets/rotten.jpeg"


const ProjectCard = ({ image, title }) => (

    <div className="p-4 md:w-1/3 mb-6">
        <Link to={`/projet/${title}`}>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105 hover:-translate-y-1">
                <img src={image} alt="" className="object-cover h-48 w-full" />
                <div className="p-4">
                    <h2 className="text-xl font-medium text-white">{title}</h2>
                    <a className="text-blue-300 hover:text-blue-100 inline-flex items-center mt-3">
                        Fullscreen
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
                    </a>
                </div>
            </div>
        </Link>
    </div>


)

export default function Projects() {
    const projects = [
        { title: "Portfolio", image: image1, },
        { title: "DashBoard", image: image1 },
        { title: "Trello Clone Web", image: image1 },
        { title: "Trello Clone Mobile – Application de gestion de tâches", image: trelloMobile },
        { title: "Yowl – Plateforme sociale de commentaires universels", image: image1 },
        { title: "My rotten tomato", image: rotten },
        { title: "Post It – Application de planification et de notes universelles", image: image1 },
        { title: "My SHOP – Plateforme e-commerce moderne", image: image1 },
        { title: "SHOW TIME", image: image1 },
        { title: "E-Commerce Web Site (View) – Interface utilisateur d’une boutique en ligne", image: ecommerce1 },
        { title: "Calculatrice scientifique – Logique NPI (Python)", image: image1 },
        { title: "Calculatrice (Javascript)", image: image1 },
        { title: "TICKET WIFI – Interface utilisateur pour l’achat de tickets Wi-Fi", image: image1 },
        { title: "E-COMMERCE CLONE – Interface utilisateur d’un site e-commerce", image: image1 },

    ]
    return (
        <section id="projects" className="text-gray-400 bg-blue-950 ">
            <div className="container px-3 py-11 mx-auto">
                <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col">
                    <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
                        <h1 className="sm:w-2/5 text-white font-medium title-font text-3xl mb-2 sm:mb-0">Mes projets</h1>
                        <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
                            Chaque projet présenté ci-dessous reflète mon parcours, mes apprentissages et ma passion pour le développement. À travers des interfaces web, des applications mobiles, des outils interactifs et des reproductions d’applications populaires, j’ai exploré différentes technologies et méthodologies pour créer des expériences utiles, intuitives et modernes.                        </p>
                        {/* <button type="button" data-aos="fade-up" data-aos-delay="300" className="text-gray-900 bg-white hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold rounded-full text-xs sm:text-sm px-4 py-2 text-center">
                            View all
                        </button> */}
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-delay="400" className=" flex flex-wrap sm:m-4 -mx-4 -mb-10 -mt-4">

                    {
                        projects.map((project, index) => (

                            <ProjectCard key={index} {...project} />
                        ))
                    }

                </div>

            </div>
        </section>
    )
}