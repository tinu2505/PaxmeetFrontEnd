// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from 'lenis';

import './App.css';

import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Foooter';

import Home from './pages/Home';
import Events from './pages/Events';
import Premium from './pages/Premium';
import Download from './pages/Download';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Faq from './pages/Faq';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import EventDetail from './pages/EventDetail';
import Quiz from './pages/Quiz';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';

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

  useEffect(() => {
    // Keep `.preload` for Home so its GSAP timeline controls the reveal.
    // Remove `.preload` immediately for all other routes to avoid blocking UI.
    if (window.location.pathname !== '/') {
      document.body.classList.remove('preload');
    }
  }, []);

  return (
    <Router>
      <div className="app-root">
        <ScrollToTop />
        {!window.location.pathname.startsWith('/admin') && <Navbar />}

        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/download" element={<Download />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/quiz" element={<Quiz />} />

            <Route path="/admin" element={<AdminLayout />} >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Routes>
        </main>
        {!window.location.pathname.startsWith('/admin') && <Footer />}
      </div>
    </Router>
  );
}

export default App;
