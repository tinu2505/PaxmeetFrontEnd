import { motion } from 'framer-motion';
import styles from './Premium.module.css';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    priceLabel: 'Free',
    highlight: 'Start hosting & joining',
    features: [
      'Host up to 3 events / month',
      'Basic discovery in your city',
      'Standard attendee limits',
      'Basic host profile',
    ],
    ctaLabel: 'Continue with Free',
    recommended: false,
  },
  {
    id: 'plus',
    name: 'Plus',
    priceLabel: '₹199 / month',
    highlight: 'For active hosts',
    features: [
      'Host up to 10 events / month',
      'Boosted visibility in search',
      'Access to advanced filters',
      'Priority support chat',
    ],
    ctaLabel: 'Start Plus',
    recommended: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    priceLabel: '₹499 / month',
    highlight: 'For communities & brands',
    features: [
      'Unlimited public events',
      'Featured spot in city carousels',
      'Deeper analytics & insights',
      'Co‑host management tools',
    ],
    ctaLabel: 'Talk to us',
    recommended: false,
  },
];

export default function Premium() {
  return (
    <section className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>Upgrade to Paxmeet Premium</h1>
          <p className={styles.heroSubtitle}>
            Get better visibility, smarter tools, and more control over your events and communities.
          </p>
          <p className={styles.heroNote}>
            Choose a plan that matches how often you host. You can switch or cancel anytime.
          </p>
        </div>
      </div>

      {/* Plans grid */}
      <div className={styles.plansSection}>
        <div className={styles.toggleRow}>
          <span className={styles.toggleLabel}>Billing</span>
          <div className={styles.togglePills}>
            <button className={`${styles.togglePill} ${styles.toggleActive}`}>Monthly</button>
            <button className={styles.togglePill}>Yearly (soon)</button>
          </div>
        </div>

        <div className={styles.grid}>
          {PLANS.map((plan, index) => (
            <motion.article
              key={plan.id}
              className={`${styles.card} ${plan.recommended ? styles.cardRecommended : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.01 }}
            >
              {plan.recommended && (
                <div className={styles.ribbon}>
                  <span>Most Popular</span>
                </div>
              )}

              <header className={styles.cardHeader}>
                <h2 className={styles.planName}>{plan.name}</h2>
                <p className={styles.planHighlight}>{plan.highlight}</p>
                <p className={styles.planPrice}>{plan.priceLabel}</p>
              </header>

              <ul className={styles.features}>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <button
                type="button"
                className={styles.primaryBtn}
                onClick={() => {
                  // later: route to /download or /login with plan context
                  window.location.href = '/download';
                }}
              >
                {plan.ctaLabel}
              </button>

              <p className={styles.cardFooterNote}>
                Requires Paxmeet app for ticketing & payments.
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Download CTA strip */}
      <div className={styles.downloadStrip}>
        <div>
          <h3>Ready to go premium?</h3>
          <p>Install the Paxmeet app to manage subscriptions, payouts, and RSVPs in one place.</p>
        </div>
        <div className={styles.downloadButtons}>
          <a href="/download" className={styles.appBtn}>
            Get the app
          </a>
        </div>
      </div>
    </section>
  );
}
