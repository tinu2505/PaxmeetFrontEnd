import { motion } from 'framer-motion';
import styles from './Download.module.css';

export default function Download() {
  return (
    <section className={styles.page}>
      {/* Hero: headline + device mockup + buttons */}
      <div className={styles.hero}>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.title}>Get the Paxmeet app</h1>
          <p className={styles.subtitle}>
            Discover events, manage tickets, and stay connected with your groups anytime, anywhere.
          </p>

          <div className={styles.buttonsRow}>
            <a href="#" className={`${styles.storeBtn} ${styles.androidBtn}`}>
              <span className={styles.storeIcon}>📱</span>
              <span className={styles.storeText}>
                <span className={styles.storeLabel}>Get it on</span>
                <span className={styles.storeName}>Google Play</span>
              </span>
            </a>

            <a href="#" className={`${styles.storeBtn} ${styles.iosBtn}`}>
              <span className={styles.storeIcon}>🍏</span>
              <span className={styles.storeText}>
                <span className={styles.storeLabel}>Download on the</span>
                <span className={styles.storeName}>App Store</span>
              </span>
            </a>
          </div>

          <p className={styles.helperText}>Or scan the QR code to open your store directly.</p>
        </motion.div>

        <motion.div
          className={styles.heroVisual}
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Device mockup placeholder */}
          <div className={styles.phoneMock}>
            <div className={styles.phoneScreen}>
              <div className={styles.screenHeader}>
                <span className={styles.logoDot} />
                <span className={styles.screenTitle}>Paxmeet</span>
              </div>
              <div className={styles.screenCardLarge}>
                <p className={styles.screenChip}>Today · Near you</p>
                <h3>Sunset Beach Trek</h3>
                <p>North Goa · 5:00 PM</p>
              </div>
              <div className={styles.screenCardSmall}>
                <h4>Creators meetup</h4>
                <p>Panaji · Sun · 4 PM</p>
              </div>
              <div className={styles.screenCardSmall}>
                <h4>Morning run club</h4>
                <p>Miramar · Every Sun</p>
              </div>
            </div>
          </div>

          {/* QR placeholder */}
          <div className={styles.qrBlock}>
            <div className={styles.qrBox}>
              {/* Replace with real <img src="/qr.png" /> later */}
              <div className={styles.qrPattern} />
            </div>
            <p className={styles.qrText}>Scan to download</p>
          </div>
        </motion.div>
      </div>

      {/* Reasons to download */}
      <div className={styles.reasonsSection}>
        <motion.h2
          className={styles.reasonsTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Why use the app?
        </motion.h2>

        <div className={styles.reasonsGrid}>
          <motion.div
            className={styles.reasonCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <div className={styles.reasonIcon}>🎟️</div>
            <h3>Offline tickets</h3>
            <p>Access your passes even with low network or no SMS OTPs.</p>
          </motion.div>

          <motion.div
            className={styles.reasonCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className={styles.reasonIcon}>⭐</div>
            <h3>Better discovery</h3>
            <p>Personalized event suggestions based on your interests and past activity.</p>
          </motion.div>

          <motion.div
            className={styles.reasonCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <div className={styles.reasonIcon}>🔔</div>
            <h3>Smart alerts</h3>
            <p>Get notified when spots are filling up or new events drop in your city.</p>
          </motion.div>

          <motion.div
            className={styles.reasonCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className={styles.reasonIcon}>🛡️</div>
            <h3>Safer hosting</h3>
            <p>Manage RSVPs, KYC, and ratings in one place to keep events smooth.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
