import { motion } from 'framer-motion';
import styles from './Profile.module.css';

const MOCK_USER = {
  name: 'Aarav Patel',
  handle: '@aaravtreks',
  bio: 'Hosts treks and outdoor meetups across Goa. Always chasing golden hour.',
  location: 'Goa, India',
  joined: 'Joined 2024',
  avatarInitials: 'AP',
  premium: 'Plus',
  kycStatus: 'Verified',
  stats: {
    hosted: 18,
    attended: 26,
    rating: 4.8,
    reviews: 34,
  },
};

const MOCK_EVENTS_HOSTED = [
  { id: 1, title: 'Sunset Beach Trek', date: 'Sat · 21 Dec · 5 PM', status: 'Upcoming' },
  { id: 2, title: 'Creators Walk & Chai', date: 'Sun · 15 Dec · 4 PM', status: 'Completed' },
];

const MOCK_EVENTS_ATTENDED = [
  { id: 3, title: 'Photography Walk – Old Goa', date: 'Sat · 7 Dec · 7 AM' },
  { id: 4, title: 'Board Games & Chai Night', date: 'Fri · 29 Nov · 8 PM' },
];

export default function Profile() {
  return (
    <section className={styles.page}>
      {/* User header */}
      <div className={styles.header}>
        <div className={styles.userMain}>
          <div className={styles.avatar}>
            <span>{MOCK_USER.avatarInitials}</span>
          </div>
          <div className={styles.userText}>
            <h1 className={styles.name}>{MOCK_USER.name}</h1>
            <p className={styles.handle}>{MOCK_USER.handle}</p>
            <p className={styles.bio}>{MOCK_USER.bio}</p>
            <p className={styles.meta}>
              <span>{MOCK_USER.location}</span> · <span>{MOCK_USER.joined}</span>
            </p>
          </div>
        </div>

        <div className={styles.badges}>
          <div className={styles.badge}>
            <span className={styles.badgeLabel}>Plan</span>
            <span className={styles.badgeValue}>{MOCK_USER.premium}</span>
          </div>
          <div className={`${styles.badge} ${styles.badgeSuccess}`}>
            <span className={styles.badgeLabel}>KYC</span>
            <span className={styles.badgeValue}>{MOCK_USER.kycStatus}</span>
          </div>
        </div>
      </div>

      {/* Stats + Auth panel + FAQ */}
      <div className={styles.topRow}>
        <motion.div
          className={styles.statsCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2>Overview</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{MOCK_USER.stats.hosted}</span>
              <span className={styles.statLabel}>Hosted</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{MOCK_USER.stats.attended}</span>
              <span className={styles.statLabel}>Attended</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{MOCK_USER.stats.rating}</span>
              <span className={styles.statLabel}>Rating</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{MOCK_USER.stats.reviews}</span>
              <span className={styles.statLabel}>Reviews</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.authCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <h2>Account access</h2>
          <p className={styles.authText}>
            Log in to manage your profile, events, and payouts. New here? Create a host or attendee
            account in a few steps.
          </p>

          <div className={styles.authButtons}>
            <button type="button" className={styles.primaryBtn}>
              Log in
            </button>
            <button type="button" className={styles.secondaryBtn}>
              Sign up
            </button>
          </div>

          <button type="button" className={styles.linkBtn}>
            Forgot password
          </button>
        </motion.div>

        <motion.div
          className={styles.faqCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2>Help & FAQ</h2>
          <p className={styles.faqText}>
            Learn how hosting works, how KYC is handled, and what safety tools Paxmeet provides.
          </p>
          <a href="/faq" className={styles.linkBtnInline}>
            View FAQ
          </a>
        </motion.div>
      </div>

      {/* Hosted / attended events lists */}
      <div className={styles.bottomRow}>
        <motion.div
          className={styles.listCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.listHeader}>
            <h2>Hosted events</h2>
            <button type="button" className={styles.textBtn}>
              View all
            </button>
          </div>
          <ul className={styles.list}>
            {MOCK_EVENTS_HOSTED.map((e) => (
              <li key={e.id} className={styles.listItem}>
                <div>
                  <p className={styles.listTitle}>{e.title}</p>
                  <p className={styles.listMeta}>{e.date}</p>
                </div>
                <span
                  className={`${styles.statusBadge} ${
                    e.status === 'Upcoming' ? styles.statusUpcoming : styles.statusCompleted
                  }`}
                >
                  {e.status}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className={styles.listCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className={styles.listHeader}>
            <h2>Recently attended</h2>
            <button type="button" className={styles.textBtn}>
              View all
            </button>
          </div>
          <ul className={styles.list}>
            {MOCK_EVENTS_ATTENDED.map((e) => (
              <li key={e.id} className={styles.listItem}>
                <div>
                  <p className={styles.listTitle}>{e.title}</p>
                  <p className={styles.listMeta}>{e.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
