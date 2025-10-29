import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import HearderDesign from './components/hearderDesign'
import Skills from './components/Skills'
import { useEffect } from 'react';


function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <main>
        <HearderDesign />
        <Skills />
      </main>

    </>
  )
}

export default App
