import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';
import logoSrc from '../assets/images/logo.png';
import { useAuth } from '../contexts/AuthContext.jsx';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const navPillRef = useRef(null);
  const homeRef = useRef(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // when component mounts, shrink pill to home width then grow and trigger link fades
  useEffect(() => {
    if (navPillRef.current && homeRef.current) {
      const homeWidth = homeRef.current.offsetWidth + 10; // a little padding
      const fullWidth = navPillRef.current.scrollWidth;
      // set starting width
      navPillRef.current.style.width = `${homeWidth}px`;
      // force repaint then animate
      requestAnimationFrame(() => {
        navPillRef.current.style.transition = 'width 0.5s ease';
        navPillRef.current.style.width = `${fullWidth}px`;
      });
      // after expansion, set flag which will add the animate class
      setTimeout(() => {
        setAnimationStarted(true);
        // clear inline width so it can resize normally later
        if (navPillRef.current) navPillRef.current.style.width = '';
      }, 500);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav id="site-navbar" className={styles.navbarContainer}>
      {/* Left: Logo */}
      <div id="navbar-logo" className={styles.logoSection}>
        <img src="https://media.paxmeet.com/logo.png" alt="Paxmeet" style={{ width: '150px', height: 'auto' }} className={styles.logo} />
        <img src="https://media.paxmeet.com/P_logo.svg" alt="mobileLogo" className={styles.mobileLogo} />
      </div>

      {/* Center: Nav Pill */}
      <div
        id="navbar-links"
        ref={navPillRef}
        className={
          styles.navPill + (animationStarted ? ` ${styles.animate}` : '')
        }
      >
        <NavLink
          to="/"
          ref={homeRef}
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          Events
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.navLink
          }
        >
          Contact
        </NavLink>
      </div>

      {/* Right: Menu Button */}
      <div id="navbar-action" className={styles.actionSection} ref={dropdownRef}>
        <button className={styles.menuBtn} onClick={() => setIsOpen(!isOpen)}>
          <p>Menu</p>
          {/* Animated Dots Wrapper */}
          <motion.div
            className={styles.dotsWrapper}
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.dots}><img src="https://media.paxmeet.com/dots.svg" alt="dots" /></span>
          </motion.div>
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.dropdownMenu}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.dropdownContent}>
                {/* Mobile-only links injected here */}
                <div className={styles.mobileNavLinks}>
                  <NavLink to="/" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Home</NavLink>
                  <NavLink to="/events" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Events</NavLink>
                  <NavLink to="/about" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>About</NavLink>
                  <NavLink to="/contact" className={styles.dropdownItem} onClick={() => setIsOpen(false)}>Contact</NavLink>
                  <hr className={styles.menuDivider} />
                </div>
                <NavLink to="/download" className={styles.dropdownItem}>Download</NavLink>
                <NavLink to="/premium" className={styles.dropdownItem}>Premium</NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
