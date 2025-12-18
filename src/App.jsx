import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { useEffect } from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar';
import Footer from './components/Foooter';
import Home from './pages/Home';
import Events from './pages/Events';
import Premium from './pages/Premium';
import Download from './pages/Download';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';

function App() {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return(
    <Router>
      <div className="app" data-scrollbar>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/download" element={<Download />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );

}

export default App
