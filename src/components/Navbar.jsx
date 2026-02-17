import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logoSrc from '../assets/images/logo.png';
import { useAuth } from '../contexts/AuthContext.jsx';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav id="site-navbar" className={styles.navbarContainer}>
      {/* Left: Logo */}
      <div id="navbar-logo" className={styles.logoSection}>
        <img src="/src/assets/images/logo.png" alt="Paxmeet" className={styles.logo} />
      </div>

      {/* Center: Nav Pill */}
      <div id="navbar-links" className={styles.navPill}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
          Home
        </NavLink>
        <NavLink to="/events" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
          Events
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
          Contact
        </NavLink>
      </div>

      {/* Right: Menu Button */}
      <div id="navbar-action" className={styles.actionSection}>
        <button className={styles.menuBtn}>
          <p>Menu</p>
          <span className={styles.dots}><img src="src\assets\images\filled.png" alt="dots" /></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
