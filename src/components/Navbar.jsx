import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          Paxmeet
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
            👤
          </button></Link>
          
          {profileOpen && (
            <div className={styles.profileDropdown}>
              <Link to="/login" className={styles.dropdownItem}>Login</Link>
              <Link to="/signup" className={styles.dropdownItem}>Signup</Link>
              <hr className={styles.divider} />
              <Link to="/profile" className={styles.dropdownItem}>Profile</Link>
              <Link to="/faq" className={styles.dropdownItem}>FAQ</Link>
              <Link to="/logout" className={styles.dropdownItem}>Logout</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.active : ''}`}></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
