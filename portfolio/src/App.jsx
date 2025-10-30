import React from 'react'
import AOS from 'aos';
// import 'aos/dist/aos.css';

// import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './components/Accueil';
import About from './components/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/projet/:title" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App
