import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Premium.module.css';

export default function Premium() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.paxmeet.com/payments/subscriptions');
        if (!response.ok) throw new Error('Failed to fetch subscription plans');
        
        const data = await response.json();
        setPlans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading premium plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <section className={styles.page}>
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
          {plans.map((plan, index) => {
            const monthlyPrice = plan.pricing?.find(p => p.duration === 'monthly');
            const currency = monthlyPrice?.currency === 'INR' ? '₹' : monthlyPrice?.currency;
            
            return (
              <motion.article
                key={plan.plan_id}
                className={`${styles.card} ${plan.title === 'pro' ? styles.cardRecommended : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {plan.title === 'pro' && <div className={styles.ribbon}><span>Most Popular</span></div>}

                <header className={styles.cardHeader}>
                  <h2 className={styles.planName}>{plan.plan_name}</h2>
                  <p className={styles.planHighlight}>{plan.description}</p>
                  <div className={styles.priceContainer}>
                    <span className={styles.currency}>{currency}</span>
                    <span className={styles.amount}>{monthlyPrice?.amount || '0'}</span>
                    <span className={styles.interval}>/month</span>
                  </div>
                </header>

                <ul className={styles.features}>
                  {plan.features?.slice(0, 6).map((feat, i) => (
                    <li key={i} className={feat.coming_soon ? styles.comingSoon : ''}>
                      {feat.feature}
                      {feat.coming_soon && <span className={styles.tag}>Soon</span>}
                    </li>
                  ))}
                </ul>

                <button className={styles.primaryBtn} onClick={() => window.location.href = '/download'}>
                  Get Started
                </button>
              </motion.article>
            );
          })}
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
