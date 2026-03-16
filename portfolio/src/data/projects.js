import image1 from "../assets/image.png";
import ecommerce1 from "../assets/ecommerceFront.png";
import trelloMobileImage from "../assets/trelloMobile.png";
import yowl from "../assets/yowl.png";
import rotten from "../assets/rotten.jpeg";
import freeAds from "../assets/freeAds.png";
import WorknoteiaImage from "../assets/worknoteia.jpeg";
import yobalo from "../assets/yobalo1.png";

export const projects = [
  {
    title: "Portfolio",
    image: image1,
    description:
      "Ce projet est un site vitrine concu pour presenter mes competences en developpement web, mes realisations, mon parcours professionnel et mes projets personnels. L'objectif principal est de fournir une plateforme claire, moderne et responsive qui reflete mon identite professionnelle tout en offrant une navigation intuitive. Le portfolio est structure en plusieurs sections : une page d'accueil avec une animation d'introduction, une section propos detaillant mon profil, une galerie de projets interactifs, une section Competences illustrant mes outils et langages maitrises, ainsi qu'un formulaire de contact fonctionnel.",
    technologies: ["React", "Tailwind CSS", "Git"],
  },
  {
    title: "DashBoard",
    image: image1,
    description:
      "Application permettant de s'abonner a differents services: meteo, cinema, Pokemon... avec des timers. Developpement de micro-services reutilisables.",
    technologies: ["React", "NextJS", "Flask", "Postman"],
  },
  {
    title: "Trello Clone Web",
    image: image1,
    description:
      "Ce projet est une reproduction fonctionnelle de l'application Trello, developpee pour demontrer mes competences en developpement front-end et en gestion d'etat complexe. Il permet aux utilisateurs de creer des tableaux, listes et cartes, de les organiser par glisser-deposer, et de suivre l'avancement de leurs taches de maniere intuitive.",
  },
  {
    title: "Yowl - Plateforme sociale de commentaires universels",
    image: yowl,
    description:
      "Yowl est une application web innovante qui permet a ses utilisateurs de commenter librement n'importe quel contenu en ligne, sans restriction liee au site d'origine. L'objectif est de creer une couche sociale universelle ou les membres de la communaute Yowl peuvent echanger, debattre et partager leurs opinions sur tout type de contenu : articles, videos, images, produits, etc.",
    technologies: ["Vue.js", "Laravel", "JavaScript"],
  },
  {
    title: "My rotten tomato",
    image: rotten,
    description:
      "My Rotten Tomato est une application web de streaming qui s'appuie sur l'API de The Movie Database (TMDB) pour offrir une experience immersive de decouverte de films et de series. L'objectif du projet est de recreer une interface moderne et intuitive inspiree des grandes plateformes de streaming, tout en mettant en avant les donnees riches et dynamiques fournies par TMDB.",
  },
  {
    title: "Post It - Application de planification et de notes universelles",
    image: image1,
    description:
      "Post It est une application web concue pour permettre aux utilisateurs de noter, organiser et planifier librement toutes leurs idees, taches et projets. Inspiree du concept des pense-betes physiques, cette plateforme numerique offre une interface intuitive ou chaque utilisateur peut creer des notes personnalisees, les deplacer, les modifier et les regrouper selon ses besoins.",
  },
  {
    title: "My SHOP - Plateforme e-commerce moderne",
    image: image1,
    description:
      "My SHOP est une application web de commerce electronique concue pour offrir une experience d'achat fluide, intuitive et responsive. Le projet simule une boutique en ligne complete, avec gestion des produits, panier, paiement et interface administrateur. Il met en avant mes competences en developpement full-stack, en integration d'API, et en conception d'interfaces utilisateur centrees sur l'experience client.",
    technologies: ["Vue.js", "Laravel", "JavaScript"],
  },
  {
    title: "SHOW TIME",
    image: image1,
    description:
      "SHOW TIME est une application web dediee a la reservation de billets pour des concerts et evenements musicaux. Elle permet aux utilisateurs de decouvrir les spectacles a venir, de consulter les details des artistes et des lieux, et de reserver leurs places en quelques clics. L'objectif est de rendre l'acces aux evenements culturels plus simple, rapide et agreable.",
  },
  {
    title: "E-Commerce Web Site (View) - Interface utilisateur d'une boutique en ligne",
    image: ecommerce1,
    description:
      "Ce projet represente la partie front-end d'un site e-commerce moderne, concu pour simuler l'experience d'achat en ligne. L'objectif etait de creer une interface fluide, responsive et visuellement attrayante, en integrant les principales fonctionnalites attendues par les utilisateurs d'une boutique en ligne. Lien du projet: https://e-commerce-amy-sidoine.netlify.app/",
    technologies: ["Vue.js", "Laravel", "JavaScript"],
  },
  {
    title: "Calculatrice scientifique - Logique NPI (Python)",
    image: image1,
    description:
      "Ce projet est une calculatrice scientifique developpee en Python, reposant sur la logique de la Notation Polonaise Inverse (NPI), egalement appelee postfixee. Contrairement aux calculatrices classiques, celle-ci traite les expressions mathematiques sans avoir besoin de parentheses, en respectant l'ordre des operations via une pile (stack). Elle permet d'effectuer des calculs complexes de maniere rapide et fiable.",
    technologies: ["Vue.js", "Laravel", "JavaScript"],
  },
  {
    title: "Calculatrice standard - JavaScript",
    image: image1,
    description:
      "Ce projet est une calculatrice simple et intuitive developpee en JavaScript, concue pour effectuer les operations arithmetiques de base. Elle simule le fonctionnement d'une calculatrice physique avec une interface utilisateur responsive et interactive, permettant aux utilisateurs d'effectuer des calculs directement depuis leur navigateur.",
  },
  {
    title: "TICKET WIFI - Interface utilisateur pour l'achat de tickets Wi-Fi",
    image: image1,
    description:
      "TICKET WIFI est une reproduction front-end d'un site de vente de codes d'acces Wi-Fi. Ce projet simule l'experience d'un utilisateur souhaitant acheter un ticket de connexion a Internet, avec une interface fluide, moderne et responsive. Il met en avant les etapes cles du parcours client : selection du forfait, affichage des tarifs, saisie des informations, et confirmation de commande.",
    technologies: ["Vue.js", "Laravel", "JavaScript"],
  },
  {
    title: "E-COMMERCE CLONE - Interface utilisateur d'un site e-commerce",
    image: image1,
    description:
      "Ce projet est une reproduction front-end d'un site e-commerce moderne, concu pour simuler l'experience d'achat en ligne. L'objectif etait de recreer fidelement l'interface d'un site marchand existant, en mettant l'accent sur le design, la navigation, et l'interaction utilisateur, sans integrer de logique back-end.",
    technologies: ["Vue.js", "Laravel", "JavaScript"],
  },
  {
    title: "Trello Clone Mobile - Application de gestion de taches",
    image: trelloMobileImage,
    description:
      "Trello Clone Mobile est une application mobile inspiree de Trello, concue pour permettre aux utilisateurs de gerer leurs projets et taches de maniere intuitive, directement depuis leur smartphone. Elle reprend les principes de l'organisation par tableaux, listes et cartes, tout en offrant une interface adaptee aux usages mobiles.",
    technologies: ["Vue.js", "Laravel", "JavaScript"],
  },
  {
    title: "WorknoteIA - Application mobile de prise de notes avec rapport automatique",
    image: WorknoteiaImage,
    description:
      "WorknoteIA est une application mobile developpee en React Native avec un backend Nest.js. Elle facilite la prise de notes des etudiants en stage et genere automatiquement des rapports hebdomadaires, mensuels et finaux grace a l'IA, afin qu'ils soient prets pour leurs presentations.",
    technologies: ["React Native", "Nest.js", "JavaScript", "AI"],
  },
  {
    title: "Yobalo - Plateforme de livraison de proximite",
    image: yobalo,
    description:
      "Yobalo est une plateforme de livraison de proximite composee d'un site vitrine (https://yobalo.com/) et de trois applications : client, livreur et dashboard admin. Elle permet de passer commande rapidement, suivre les livreurs en temps reel et gerer l'activite depuis l'administration.",
    technologies: ["React", "React Native", "Node.js", "API"],
  },
  {
    title: "Free Ads - Site e-commerce developpe en Laravel",
    image: freeAds,
    description:
      "Free Ads est un site e-commerce complet developpe avec Laravel, offrant une plateforme moderne pour la vente en ligne. Il inclut la gestion des produits, des utilisateurs, des commandes et des paiements, avec une interface utilisateur intuitive et responsive.",
    technologies: ["Laravel", "JavaScript", "HTML", "CSS"],
  },
];
