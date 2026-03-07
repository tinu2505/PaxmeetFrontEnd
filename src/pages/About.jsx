import { motion } from 'framer-motion';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.page}>
      {/* Hero: who we are */}
      <div className={styles.hero}>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.kicker}>About Paxmeet</p>
          <h1 className={styles.title}>We help you find your people, not just events.</h1>
          <p className={styles.subtitle}>
            Paxmeet is built for people who love going out but hate endlessly scrolling through
            noisy feeds. It connects you to curated meetups, treks, and workshops that actually
            match your vibe.
          </p>
        </motion.div>
      </div>

      {/* Mission + vision */}
      <div className={styles.missionSection}>
        <motion.div
          className={styles.missionCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2>Our mission</h2>
          <p>
            Make it easy and safe for anyone to step out, try something new, and build real‑world
            friendships around shared interests.
          </p>
        </motion.div>

        <motion.div
          className={styles.missionCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2>What makes us different</h2>
          <p>
            Paxmeet blends event discovery with KYC, ratings, and host tools so both attendees and
            organizers feel confident at every step.
          </p>
        </motion.div>
      </div>

      {/* Storyboard timeline */}
      <div className={styles.timelineSection}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Our story so far
        </motion.h2>

        <div className={styles.timelineWrapper}>
          <div className={styles.timelineLine} />

          <div className={styles.timelineGrid}>
            <motion.div
              className={`${styles.timelineItem} ${styles.left}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className={styles.timelineDot} />
              <div className={styles.timelineCard}>
                <p className={styles.timelineMeta}>Idea · Early 2024</p>
                <h3>Noticing the gap</h3>
                <p>
                  Friends kept asking in WhatsApp groups, “Anything happening this weekend?” but
                  existing platforms felt either too random or too noisy.
                </p>
              </div>
            </motion.div>

            <motion.div
              className={`${styles.timelineItem} ${styles.right}`}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <span className={styles.timelineDot} />
              <div className={styles.timelineCard}>
                <p className={styles.timelineMeta}>Prototype · 2024</p>
                <h3>Designing for real life</h3>
                <p>
                  We started with simple listings for treks and meetups, then added trust features
                  like host verification and basic ratings.
                </p>
              </div>
            </motion.div>

            <motion.div
              className={`${styles.timelineItem} ${styles.left}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className={styles.timelineDot} />
              <div className={styles.timelineCard}>
                <p className={styles.timelineMeta}>Today</p>
                <h3>Growing communities</h3>
                <p>
                  Paxmeet now focuses on curated local communities—running groups, creator circles,
                  and hobby clubs—with tools that respect both hosts and guests.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values / pillars similar to “Why choose us” */}
      <div className={styles.valuesSection}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          What we care about
        </motion.h2>

        <div className={styles.valuesGrid}>
          <motion.div
            className={styles.valueCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h3>Trust by design</h3>
            <p>
              KYC for hosts, clear event details, and transparent ratings so you know what to expect
              before you RSVP.
            </p>
          </motion.div>

          <motion.div
            className={styles.valueCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <h3>Real connections</h3>
            <p>
              Events are built around shared interests, not just locations, to help you meet people
              you actually vibe with.
            </p>
          </motion.div>

          <motion.div
            className={styles.valueCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h3>Respect for time</h3>
            <p>
              Smarter discovery, cleaner UI, and fewer steps so finding something to do never feels
              like work.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
