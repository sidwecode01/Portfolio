import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import HearderDesign from './hearderDesign'
import Skills from './Skills'
import { useEffect } from 'react';
import Experience from './Experience';
import Projects from "./Project";
import Contact from './Contact';
import Footer from './Footer';






export default function Accueil() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <main>
        <HearderDesign />
        <Skills />
         <Experience />
         <Projects />
         <Contact />
         <Footer />
        

      </main>

    </>
  )
}


