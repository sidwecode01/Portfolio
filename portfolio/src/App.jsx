import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import HearderDesign from './components/hearderDesign'
import Skills from './components/Skills'
import { useEffect } from 'react';
import Experience from './components/Experience';
import Projects from './components/project';
import Contact from './components/Contact';
import About from './components/About';


function App() {
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
         <About />

      </main>

    </>
  )
}

export default App
