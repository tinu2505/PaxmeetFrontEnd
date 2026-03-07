import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Faq.module.css';

const FAQ_SECTIONS = [
  {
    id: 'hosting',
    title: 'Hosting on Paxmeet',
    items: [
      {
        q: 'Who can host events on Paxmeet?',
        a: 'Anyone with a valid account and basic profile can host, but certain event types and higher attendee limits may require KYC verification.',
      },
      {
        q: 'Do I need to complete KYC to host?',
        a: 'For private, small events KYC is optional, but for public or paid events KYC is strongly recommended and may be required to unlock payouts and higher visibility.',
      },
      {
        q: 'How do payouts work for paid events?',
        a: 'Ticket payments go through Paxmeet’s payment partners and are settled to your verified bank account based on our payout schedule for your region.',
      },
    ],
  },
  {
    id: 'attending',
    title: 'Attending events',
    items: [
      {
        q: 'Do I need the app to attend an event?',
        a: 'You can discover events on web, but the app gives you offline tickets, live updates, and an easier check‑in experience at the venue.',
      },
      {
        q: 'What if an event is cancelled?',
        a: 'If a host cancels, attendees are notified through the app and email. For paid events, refunds follow the host’s refund policy and payment partner timelines.',
      },
      {
        q: 'Can I see who else is attending?',
        a: 'For some events, hosts may show a limited attendee preview (like first names and profile pics). You can always control your own visibility from your profile.',
      },
    ],
  },
  {
    id: 'safety',
    title: 'Trust & safety',
    items: [
      {
        q: 'How does KYC work for hosts?',
        a: 'KYC is handled through trusted verification partners. Basic details may be requested (like ID and PAN/Aadhaar in India) and are stored securely as per policy.',
      },
      {
        q: 'How are ratings calculated?',
        a: 'Ratings combine attendee reviews, attendance history, and signals like cancellations and response time to give a more reliable score than stars alone.',
      },
      {
        q: 'How can I report an issue?',
        a: 'From the event or profile screen you can use the “Report” option to flag issues. Our team reviews safety reports with higher priority.',
      },
    ],
  },
  {
    id: 'account',
    title: 'Account & app',
    items: [
      {
        q: 'Is Paxmeet free to use?',
        a: 'Creating an account and attending many events is free. Hosts can upgrade to premium plans for boosted visibility, tools, and analytics.',
      },
      {
        q: 'Which platforms does Paxmeet support?',
        a: 'Paxmeet is available on Android and iOS via the app stores, and a web experience is available for discovery and basic actions.',
      },
      {
        q: 'How do I delete my account?',
        a: 'You can request deletion from the app settings or by contacting support. Some data may be retained as required by law and safety policies.',
      },
    ],
  },
];

export default function FAQ() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className={styles.kicker}>FAQ</p>
          <h1 className={styles.title}>Answers to common questions.</h1>
          <p className={styles.subtitle}>
            Everything you need to know about hosting, attending, trust, and your Paxmeet account.
          </p>
        </motion.div>
      </div>

      {/* FAQ accordion */}
      <div className={styles.faqSection}>
        {FAQ_SECTIONS.map((section) => (
          <div key={section.id} className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.items}>
              {section.items.map((item, index) => {
                const id = `${section.id}-${index}`;
                const isOpen = openItem === id;
                return (
                  <motion.div
                    key={id}
                    className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                  >
                    <button
                      type="button"
                      className={styles.itemHeader}
                      onClick={() => toggleItem(id)}
                    >
                      <span className={styles.question}>{item.q}</span>
                      <span className={styles.chevron}>{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className={styles.answerWrapper}>
                        <p className={styles.answer}>{item.a}</p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contact hint */}
      <div className={styles.contactStrip}>
        <p>Can’t find what you’re looking for?</p>
        <a href="/contact" className={styles.contactLink}>
          Contact Paxmeet support
        </a>
      </div>
    </section>
  );
}
