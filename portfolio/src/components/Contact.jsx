import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaUser, FaEnvelope, FaTag, FaCommentDots } from 'react-icons/fa';

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qcwuo7f",    
        "template_slozavn",    
        form.current,
        "jScHsLI3uwaxSxTSu"    
      )
      .then(() => {
        alert("Message envoyé avec succès !");
      })
      .catch((error) => {
        console.error("Erreur :", error);
        alert("Échec de l'envoi du message.");
      });
  };

  return (
    <section id="contact" className="text-gray-600">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        {/* Intro + coordonnées */}
        <div data-aos="fade-up" data-aos-delay="300" className="text-center lg:w-2/3 w-full">
          <h1 className="sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Contact</h1>
          <p className="mb-8 leading-relaxed">
            Tu as une question, une opportunité à proposer ou simplement envie
            d’échanger autour du développement web ? Je suis toujours ouvert aux
            collaborations, aux retours constructifs et aux nouveaux défis.
            <br />
            N’hésite pas à me contacter via le formulaire ci-dessous ou
            directement par e-mail. Je réponds avec plaisir et réactivité.
          </p>

          {/* Coordonnées */}
          <div data-aos="fade-up" data-aos-delay="500" className="flex flex-col items-center text-xl font-bold space-y-4">
            {/* Téléphone */}
            <div className="flex items-center space-x-2">
              <svg className="text-green-500 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 4.5A2.25 2.25 0 014.5 2.25h3a2.25 2.25 0 012.25 2.25v3A2.25 2.25 0 017.5 9.75h-.75a11.25 11.25 0 0011.25 11.25v-.75a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 012.25 2.25v3a2.25 2.25 0 01-2.25 2.25h-3A19.5 19.5 0 012.25 4.5z" />
              </svg>
              <span>+225 0151390918</span>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-2">
              <svg className="text-red-500 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75m19.5 0H2.25" />
              </svg>
              <span>sidoine.nango@epitech.eu</span>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center space-x-2">
              <svg className="text-blue-500 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.867-3.063-1.869 0-2.156 1.46-2.156 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.034 0 3.593 1.996 3.593 4.59v5.606z" />
              </svg>
              <a href="https://www.linkedin.com/in/koffi-sidoine-nango-160a2833b" className="hover:underline">
                Linkedin
              </a>
            </div>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div
      id="contactMe"
      data-aos="fade-up"
      data-aos-delay="400"
      className="rounded-2xl w-full mt-16 bg-blue-950 py-12 px-4 md:px-8"
    >
      <h2 className="text-white text-center font-light text-4xl md:text-5xl lg:text-6xl mb-10">
        Contact Me
      </h2>

      <form ref={form} onSubmit={sendEmail} className="flex flex-col items-center">
        <div className="md:w-3/4 lg:w-2/3 xl:w-1/2 space-y-4">
          {/* Name & Email */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative w-full">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                name="name"
                type="text"
                placeholder="Nom"
                required
                className="pl-10 py-3 px-4 rounded-md bg-gray-900 text-gray-200 w-full outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="relative w-full">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                className="pl-10 py-3 px-4 rounded-md bg-gray-900 text-gray-200 w-full outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="relative">
            <FaTag className="absolute top-3 left-3 text-gray-400" />
            <input
              name="subject"
              type="text"
              placeholder="Objet"
              className="pl-10 py-3 px-4 rounded-md bg-gray-900 text-gray-200 w-full outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Message */}
          <div className="relative">
            <FaCommentDots className="absolute top-3 left-3 text-gray-400" />
            <textarea
              name="message"
              rows="5"
              placeholder="Message"
              required
              className="pl-10 py-3 px-4 rounded-md bg-gray-900 text-gray-200 w-full outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Send Message
        </button>
      </form>
    </div>
      </div>
    </section>
  );
}
