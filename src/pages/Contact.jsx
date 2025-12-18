import { motion } from 'framer-motion';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.page}>
      {/* Hero intro */}
      <div className={styles.hero}>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.kicker}>Contact</p>
          <h1 className={styles.title}>Let’s talk about your next event.</h1>
          <p className={styles.subtitle}>
            Questions, feedback, or partnership ideas? Share a few details and the Paxmeet team will
            get back to you.
          </p>
        </motion.div>

        <motion.div
          className={styles.infoCard}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <h2>Quick info</h2>
          <ul>
            <li>
              <span>Support:</span> support@paxmeet.com
            </li>
            <li>
              <span>For hosts:</span> hosts@paxmeet.com
            </li>
            <li>
              <span>Response time:</span> within 1–2 business days
            </li>
          </ul>
          <a href="/faq" className={styles.link}>
            Visit FAQ
          </a>
        </motion.div>
      </div>

      {/* Contact form */}
      <div className={styles.formSection}>
        <motion.form
          className={styles.form}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Name</label>
              <input
                type="text"
                placeholder="Your full name"
                className={styles.input}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Topic</label>
              <select className={styles.input} required>
                <option value="">Choose a topic</option>
                <option value="hosting">Hosting events</option>
                <option value="attending">Attending events</option>
                <option value="partnerships">Partnerships</option>
                <option value="support">Account & support</option>
                <option value="other">Something else</option>
              </select>
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>City</label>
              <input
                type="text"
                placeholder="Your city"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Message</label>
            <textarea
              rows={5}
              placeholder="Share as much context as you can about your question or idea."
              className={styles.textarea}
              required
            />
          </div>

          <button type="submit" className={styles.primaryBtn}>
            Send message
          </button>

          <p className={styles.helper}>
            By submitting, you agree that Paxmeet can contact you about your request.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
