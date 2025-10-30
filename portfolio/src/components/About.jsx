
import { useParams } from "react-router-dom"
import image1 from "../assets/image.png"
import { Link } from "react-router-dom"
import { FaReact, FaCss3Alt, FaJs, FaGitAlt, FaVuejs } from 'react-icons/fa';
import { SiLaravel } from 'react-icons/si';
import ecommerce1 from "../assets/ecommerceFront.png"
import trelloMobile from "../assets/trelloMobile.png"
import rotten from "../assets/rotten.jpeg"

const projects = [
  { title: "Portfolio", image: image1, description: "Ce projet est un site vitrine conçu pour présenter mes compétences en développement web, mes réalisations, mon parcours professionnel et mes projets personnels. L’objectif principal est de fournir une plateforme claire, moderne et responsive qui reflète mon identité professionnelle tout en offrant une navigation intuitive.Le portfolio est structuré en plusieurs sections : une page d’accueil avec une animation d’introduction, une section \" propos\" détaillant mon profil, une galerie de projets interactifs, une section \"Compétences\" illustrant mes outils et langages maîtrisés, ainsi qu’un formulaire de contact fonctionnel." },
  { title: "DashBoard", image: image1, description: " Application permettant de s’abonner à différents services: météo, cinéma, Pokémon… avec des timers. Développement de micro-services réutilisables." },
  { title: "Trello Clone Web", image: image1, description: "Ce projet est une reproduction fonctionnelle de l’application Trello, développée pour démontrer mes compétences en développement front-end et en gestion d’état complexe. Il permet aux utilisateurs de créer des tableaux, listes et cartes, de les organiser par glisser-déposer, et de suivre l’avancement de leurs tâches de manière intuitive." },
  { title: "Yowl – Plateforme sociale de commentaires universels", image: image1, description: "Yowl est une application web innovante qui permet à ses utilisateurs de commenter librement n’importe quel contenu en ligne, sans restriction liée au site d’origine. L’objectif est de créer une couche sociale universelle où les membres de la communauté Yowl peuvent échanger, débattre et partager leurs opinions sur tout type de contenu : articles, vidéos, images, produits, etc." },
  { title: "My rotten tomato", image: rotten, description: "My Rotten Tomato est une application web de streaming qui s’appuie sur l’API de The Movie Database (TMDB) pour offrir une expérience immersive de découverte de films et de séries. L’objectif du projet est de recréer une interface moderne et intuitive inspirée des grandes plateformes de streaming, tout en mettant en avant les données riches et dynamiques fournies par TMDB." },
  { title: "Post It – Application de planification et de notes universelles", image: image1, description: "Post It est une application web conçue pour permettre aux utilisateurs de noter, organiser et planifier librement toutes leurs idées, tâches et projets. Inspirée du concept des pense-bêtes physiques, cette plateforme numérique offre une interface intuitive où chaque utilisateur peut créer des notes personnalisées, les déplacer, les modifier et les regrouper selon ses besoins." },
  { title: "My SHOP – Plateforme e-commerce moderne", image: image1 , description: "My SHOP est une application web de commerce électronique conçue pour offrir une expérience d’achat fluide, intuitive et responsive. Le projet simule une boutique en ligne complète, avec gestion des produits, panier, paiement et interface administrateur. Il met en avant mes compétences en développement full-stack, en intégration d’API, et en conception d’interfaces utilisateur centrées sur l’expérience client."},
  { title: "SHOW TIME", image: image1, description: "SHOW TIME est une application web dédiée à la réservation de billets pour des concerts et événements musicaux. Elle permet aux utilisateurs de découvrir les spectacles à venir, de consulter les détails des artistes et des lieux, et de réserver leurs places en quelques clics. L’objectif est de rendre l’accès aux événements culturels plus simple, rapide et agréable." },
  { title: "E-Commerce Web Site (View) – Interface utilisateur d’une boutique en ligne", image: ecommerce1, description: "Ce projet représente la partie front-end d’un site e-commerce moderne, conçu pour simuler l’expérience d’achat en ligne. L’objectif était de créer une interface fluide, responsive et visuellement attrayante, en intégrant les principales fonctionnalités attendues par les utilisateurs d’une boutique en ligne. Lien du projet: https://e-commerce-amy-sidoine.netlify.app/" },
  { title: "Calculatrice scientifique – Logique NPI (Python)", image: image1, description: "Ce projet est une calculatrice scientifique développée en Python, reposant sur la logique de la Notation Polonaise Inverse (NPI), également appelée postfixée. Contrairement aux calculatrices classiques, celle-ci traite les expressions mathématiques sans avoir besoin de parenthèses, en respectant l’ordre des opérations via une pile (stack). Elle permet d’effectuer des calculs complexes de manière rapide et fiable." },
  { title: "Calculatrice standard – JavaScript", image: image1, description: "Ce projet est une calculatrice simple et intuitive développée en JavaScript, conçue pour effectuer les opérations arithmétiques de base. Elle simule le fonctionnement d’une calculatrice physique avec une interface utilisateur responsive et interactive, permettant aux utilisateurs d’effectuer des calculs directement depuis leur navigateur." },
  { title: "TICKET WIFI – Interface utilisateur pour l’achat de tickets Wi-Fi", image: image1 , description: "TICKEY WIFI est une reproduction front-end d’un site de vente de codes d’accès Wi-Fi. Ce projet simule l’expérience d’un utilisateur souhaitant acheter un ticket de connexion à Internet, avec une interface fluide, moderne et responsive. Il met en avant les étapes clés du parcours client : sélection du forfait, affichage des tarifs, saisie des informations, et confirmation de commande."},
  { title: "E-COMMERCE CLONE – Interface utilisateur d’un site e-commerce", image: image1, description: "Ce projet est une reproduction front-end d’un site e-commerce moderne, conçu pour simuler l’expérience d’achat en ligne. L’objectif était de recréer fidèlement l’interface d’un site marchand existant, en mettant l’accent sur le design, la navigation, et l’interaction utilisateur, sans intégrer de logique back-end." },
  { title: "Trello Clone Mobile – Application de gestion de tâches", image: trelloMobile, description: "Trello Clone Mobile est une application mobile inspirée de Trello, conçue pour permettre aux utilisateurs de gérer leurs projets et tâches de manière intuitive, directement depuis leur smartphone. Elle reprend les principes de l’organisation par tableaux, listes et cartes, tout en offrant une interface adaptée aux usages mobiles." },
  

]

export default function About() {

  const { title } = useParams()

  const project = projects.find(p => p.title === title)
  if (!project) {
    return (
      <div>Not project for this title</div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center p-6">
      <div className="bg-gray-50 dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2">


        <div className="h-64 md:h-auto">
          <img src={project.image} className="w-full h-full object-cover" />
        </div>


        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold font-serif text-gray-800 dark:text-white mb-2">{project.title}</h2>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-2">Description</h3>
              <p className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-200 text-sm">
                {project.description}
              </p>
            </div>

            <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400 mb-2">Technologies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <FaReact className="text-blue-400 w-6 h-6  hover:scale-110 transition-transform duration-200 inline-block animate-spin" />
                <span className="text-gray-700 dark:text-gray-200 text-sm">React</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCss3Alt className="text-teal-400 w-6 h-6  hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-700 dark:text-gray-200 text-sm">Tailwind CSS</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaJs className="text-yellow-400 w-6 h-6  hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-700 dark:text-gray-200 text-sm">JavaScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaGitAlt className="text-red-500 w-6 h-6  hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-700 dark:text-gray-200 text-sm">Git</span>
              </div>

              <div className="flex items-center space-x-2">
                <FaVuejs className="text-green-500 w-6 h-6  hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-700 dark:text-gray-200 text-sm">Vue.js</span>
              </div>

              <div className="flex items-center space-x-2">
                <SiLaravel className="text-red-600 w-6 h-6 hover:scale-110 transition-transform duration-200" />

                <span className="text-gray-700 dark:text-gray-200 text-sm">Laravel</span>
              </div>



            </div>
          </div>




          <div className="mt-6 text-right">
            <Link to={"/"} >
              <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg transition">Back to home page</button>

            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}