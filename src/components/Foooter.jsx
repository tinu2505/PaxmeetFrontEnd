import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
    return(
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* main foter content */}
                <div className={styles.content}>
                    {/* brand and description */}
                    <div className={styles.brandSection}>
                        <Link to="/" className={styles.logo}>
                            <img src="src/assets/images/logo.png" alt="" />
                        </Link>
                        <p className={styles.description}>
                            Discover amazing events, treks, workshops, and meetups near you. 
                            Join the community that connects people through unforgettable experiences.
                        </p>
                        <div className={styles.downloadLinks}>
                            <Link to="/download" className={`${styles.appBtn} ${styles.android}`}>
                                Android
                            </Link>
                            <Link to="/download" className={`${styles.appBtn} ${styles.ios}`}>
                                iOS
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className={styles.linksSection}>
                        <h3 className={styles.sectionTitle}>
                            Quick Links
                        </h3>
                        <ul className={styles.linkList}>  
                            <li><Link to="/" className={styles.link}>Home</Link></li>
                            <li><Link to="/events" className={styles.link}>Events</Link></li>
                            <li><Link to="/premium" className={styles.link}>Premium</Link></li>
                            <li><Link to="/download" className={styles.link}>Download App</Link></li>
                        </ul>
                    </div>

                    {/* Company Info */}
                    <div className={styles.linksSection}>
                        <h3 className={styles.sectionTitle}>Company</h3>
                        <ul className={styles.linkList}>
                            <li><Link to="/about" className={styles.link}>About Us</Link></li>
                            <li><Link to="/contact" className={styles.link}>Contact</Link></li>
                            <li><Link to="/privacy" className={styles.link}>Privacy Policy</Link></li>
                            <li><Link to="/terms" className={styles.link}>Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Support & Socials */}
                    <div className={styles.supportSection}>
                        <h3 className={styles.sectionTitle}>Support</h3>
                        <ul className={styles.linkList}>
                            <li><Link to="/faq" className={styles.link}>FAQ</Link></li>
                            <li><Link to="/help" className={styles.link}>Help Center</Link></li>
                            <li><a href="mailto:support@paxmeet.com" className={styles.link}>support@paxmeet.com</a></li>
                        </ul>
                        <div className={styles.socialLinks}>
                            <a href="#" className={styles.socialIcon} aria-label="Facebook">Facebook</a>
                            <a href="#" className={styles.socialIcon} aria-label="Instagram">Instagram</a>
                            <a href="#" className={styles.socialIcon} aria-label="Twitter">Twitter</a>
                            <a href="#" className={styles.socialIcon} aria-label="LinkedIn">LinkedIn</a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>
                        © 2025 Paxmeet. All rights reserved.
                    </p>
                    <div className={styles.bottomLinks}>
                        <Link to="/privacy" className={styles.smallLink}>Privacy</Link>
                        <Link to="/terms" className={styles.smallLink}>Terms</Link>
                        <Link to="/cookies" className={styles.smallLink}>Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}