import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaUser, FaEnvelope, FaTag, FaCommentDots } from "react-icons/fa";

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
    <section id="contact" className="text-gray-700">
      <div className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-100 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-200 blur-3xl"></div>

        <div className="container mx-auto px-5 py-24 relative">
          <div data-aos="fade-up" data-aos-delay="200" className="text-center mb-12">
            <h1 className="sm:text-4xl text-3xl mb-3 font-semibold text-gray-900">Contact</h1>
            <p className="max-w-2xl mx-auto leading-relaxed text-gray-600 text-base md:text-lg">
              Tu as une question, une opportunité à proposer ou simplement envie
              d’échanger autour du développement web ? Je suis toujours ouvert aux
              collaborations, aux retours constructifs et aux nouveaux défis.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="rounded-3xl border border-blue-100 bg-white/80 backdrop-blur p-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.6)]"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Discutons de ton projet</h2>
              <p className="text-gray-600 mb-8">
                N’hésite pas à me contacter via le formulaire ou directement.
                Je réponds avec plaisir et réactivité.
              </p>

              <div className="grid gap-4">
                <div className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white p-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-950 text-white flex items-center justify-center">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 4.5A2.25 2.25 0 014.5 2.25h3a2.25 2.25 0 012.25 2.25v3A2.25 2.25 0 017.5 9.75h-.75a11.25 11.25 0 0011.25 11.25v-.75a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 012.25 2.25v3a2.25 2.25 0 01-2.25 2.25h-3A19.5 19.5 0 012.25 4.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-gray-500">Telephone</p>
                    <p className="font-semibold text-gray-900 text-base md:text-lg">+225 0151390918</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white p-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-950 text-white flex items-center justify-center">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75m19.5 0H2.25" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900 text-base md:text-lg">sidoine.nango@epitech.eu</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-white p-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-950 text-white flex items-center justify-center">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.867-3.063-1.869 0-2.156 1.46-2.156 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.034 0 3.593 1.996 3.593 4.59v5.606z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-gray-500">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/koffi-sidoine-nango-160a2833b" className="font-semibold text-gray-900 text-base md:text-lg hover:underline">
                      koffi-sidoine-nango
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="contactMe"
              data-aos="fade-up"
              data-aos-delay="400"
              className="rounded-3xl w-full bg-blue-950 p-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.7)]"
            >
              <h2 className="text-white text-left font-light text-3xl md:text-4xl mb-8">
                Envoie-moi un message
              </h2>

              <form ref={form} onSubmit={sendEmail} className="flex flex-col">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full">
                      <FaUser className="absolute top-3 left-3 text-gray-400" />
                      <input
                        name="name"
                        type="text"
                        placeholder="Nom"
                        required
                        className="pl-10 py-3 px-4 rounded-xl bg-white/10 text-gray-100 w-full outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                      />
                    </div>
                    <div className="relative w-full">
                      <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                      <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="pl-10 py-3 px-4 rounded-xl bg-white/10 text-gray-100 w-full outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <FaTag className="absolute top-3 left-3 text-gray-400" />
                    <input
                      name="subject"
                      type="text"
                      placeholder="Objet"
                      className="pl-10 py-3 px-4 rounded-xl bg-white/10 text-gray-100 w-full outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                    />
                  </div>

                  <div className="relative">
                    <FaCommentDots className="absolute top-3 left-3 text-gray-400" />
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Message"
                      required
                      className="pl-10 py-3 px-4 rounded-xl bg-white/10 text-gray-100 w-full outline-none focus:ring-2 focus:ring-blue-400 resize-none placeholder:text-gray-400"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-white text-blue-950 font-semibold py-3 px-6 transition hover:bg-blue-100"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
