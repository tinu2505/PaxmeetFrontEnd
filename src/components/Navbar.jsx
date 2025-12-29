import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Mobile Menu Button */}
        <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.active : ''}`}></span>
        </button>
        
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img src={logoSrc} alt="Paxmeet logo" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
          <li><Link to="/" className={styles.navLink}>Home</Link></li>
          <li><Link to="/events" className={styles.navLink}>Events</Link></li>
          <li><Link to="/premium" className={styles.navLink}>Premium</Link></li>
          <li><Link to="/download" className={styles.navLink}>Download</Link></li>
          <li><Link to="/about" className={styles.navLink}>About</Link></li>
          <li><Link to="/contact" className={styles.navLink}>Contact</Link></li>
        </ul>

        {/* Right Side: Join Button + Profile */}
        <div className={styles.rightSection}>
          {/*<Link to="/download" className={`${styles.primaryBtn} ${styles.joinBtn}`}>
            Join/Download
          </Link>*/}
          
          {/* Profile Dropdown */}
          <Link to='/profile'><button className={styles.profileBtn} onClick={toggleProfile}>
          </button></Link>
          
          {profileOpen && (
            <ul className={styles.profileDropdown}>
              {isAuthenticated ? (
                <>
                  <li><Link to="/profile" className={styles.dropdownItem}>Profile</Link></li>
                  <li><button onClick={logout} className={styles.dropdownItem}>Logout</button></li>
                </>
              ) : (
                <>
                  <li><Link to="/profile" className={styles.dropdownItem}>Login</Link></li>
                  <li><Link to="/profile" className={styles.dropdownItem}>Signup</Link></li>
                </>
              )}
              <li><Link to="/faq" className={styles.dropdownItem}>FAQ</Link></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
