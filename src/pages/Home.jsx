import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Home.module.css';

const mockEvents = [
  {
    id: 1,
    title: 'Sunset Beach Trek',
    location: 'North Goa',
    date: '21 Dec · 5:00 PM',
    day: 'Sat',
    price: 0,
    category: 'Trek',
    tags: ['chill vibe, happening'],
    img: '/api/placeholder/420/260',
    views: 11000,
    likes: 10000,
    joined: 50,
  },
  {
    id: 2,
    title: 'Creators Meetup',
    location: 'Panaji',
    date: '22 Dec · 4:00 PM',
    day: 'Sat',
    price: 199,
    category: 'Meetup',
    tags: ['chill vibe, happening'],
    img: '/api/placeholder/420/260',
    views: 11000,
    likes: 10000,
    joined: 50,
  },
  {
    id: 3,
    title: 'Photography Walk',
    location: 'Old Goa',
    date: '28 Dec · 7:00 AM',
    day: 'Sun',
    price: 299,
    category: 'Workshop',
    tags: ['chill vibe, happening'],
    img: '/api/placeholder/420/260',
    views: 11000,
    likes: 10000,
    joined: 50,
  },
  {
    id: 4,
    title: 'Open Mic Night',
    location: 'Vasco',
    date: '27 Dec · 8:00 PM',
    day: 'Sun',
    price: 149,
    category: 'Show',
    tags: ['chill vibe, happening'],
    img: '/api/placeholder/420/260',
    views: 11000,
    likes: 10000,
    joined: 50,
  },
];

const mockCategories = [
  { id: 1, title: 'Treks', subtitle: 'Adventure awaits', img: '/api/placeholder/400/250' },
  { id: 2, title: 'Meetups', subtitle: 'Connect locally', img: '/api/placeholder/400/250' },
  { id: 3, title: 'Workshops', subtitle: 'Learn skills', img: '/api/placeholder/400/250' },
  { id: 4, title: 'Concerts', subtitle: 'Live music', img: '/api/placeholder/400/250' },
  { id: 5, title: 'Sports', subtitle: 'Play together', img: '/api/placeholder/400/250' },
];

const whyChooseUs = [
  { title: 'Real Connections', desc: 'Meet people who share your passions, not just profiles.', icon: '👥' },
  { title: 'Local Events', desc: 'Discover events happening in your city this weekend.', icon: '📍' },
  { title: 'Trusted Hosts', desc: 'Every organizer is verified for quality experiences.', icon: '✅' },
];

function EventCard({ event }){
  return (
    <motion.div
      className={styles.eventCard}
      initial={{ opacity: 0, scale: 0.9, x: 40 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      whileHover={{ y: -10, scale: 1.03 }}
      viewport={{ once: true }}
      transition={{ duration: 0.15 }}
    >
      {/* Top image */}
      <div
        className={styles.eventImage}
        style={{ backgroundImage: `url(${event.img})` }}
      />

      {/* Stats strip */}
      <div className={styles.eventStatsBar}>
        <div className={styles.eventStatItem}>
          <span className={styles.eventStatIcon}>👁️</span>
          <span>{event.views} viewed</span>
        </div>
        <div className={styles.eventStatItem}>
          <span className={styles.eventStatIcon}>❤️</span>
          <span>{event.likes} liked</span>
        </div>
        <div className={styles.eventStatItem}>
          <span className={styles.eventStatIcon}>👥</span>
          <span>{event.joined} going</span>
        </div>
      </div>

      {/* Main content */}
      <div className={styles.eventContent}>
        <div className={styles.eventHeaderRow}>
          <span className={styles.eventTag}>{event.category}</span>
          <span className={styles.eventPrice}>
            ₹{event.price === 0 ? 0 : event.price}
          </span>
        </div>

        <h3 className={styles.eventTitle}>{event.title}</h3>

        <p className={styles.eventLocation}>{event.location}</p>

        <div className={styles.eventFooterRow}>
          <div className={styles.eventDateBlock}>
            <span className={styles.eventDay}>{event.day}</span>
            <span className={styles.eventDate}>{event.date}</span>
          </div>
          <div className={styles.eventChipRow}>
            {event.tags?.map((tag) => (
              <span key={tag} className={styles.eventChip}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero Section - Dark */}
      <section className={`${styles.heroSection} `}>
        <div className={styles.container}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>
              Discover <span className={styles.gradientText}>Amazing</span> Events Near You
            </h1>
            <p className={styles.heroSubtitle}>
              Join thousands exploring treks, workshops, meetups, and unforgettable experiences in their city.
            </p>
            <div className={styles.heroCTAs}>
              <Link to="/events" className={`${styles.primaryBtn} ${styles.heroPrimaryCTA}`}>
                Explore Events
              </Link>
              <Link to="/download" className={`${styles.secondaryBtn} ${styles.heroSecondaryCTA}`}>
                Get the App
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={`${styles.eventsShowcaseSection} ${styles.lightSection}`}>
        <div className={styles.container}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Upcoming Events
          </motion.h2>
          <motion.div
          className={styles.eventsScroll}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.eventsList}>
            {mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </motion.div>
        </div>
      </section>

      {/* Categories Section - Light */}
      <section className={`${styles.categoriesSection} ${styles.lightSection}`}>
        <div className={styles.container}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Categories
          </motion.h2>
          <motion.div 
            className={styles.categoriesScroll}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.categoriesList}>
              {mockCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  className={styles.categoryCard}
                  initial={{ opacity: 0, scale: 0.8, x: 50 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.12, delay: index * 0.08 }}
                  whileHover={{ scale: 1.03, y: -8 }}
                  viewport={{ once: true }}
                >
                  <div className={styles.categoryImage} style={{ backgroundImage: `url(${category.img})` }}></div>
                  <div className={styles.categoryContent}>
                    <h3>{category.title}</h3>
                    <p>{category.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us - Dark */}
      <section className={`${styles.story} ${styles.darkSection}`}>
        <div className={styles["story-wrap"]}>
          {/* Left image column */}
          <div className={`${styles["story-col"]} ${styles["story-col--left"]}`}>
            <div className={styles["story-img-block"]}>
              <img src="src\assets\images\7-35-4x_BSRGAN.png" alt="Story left 1" />
              <h3>KYC-Verified Hosts</h3>
              <p>Every host passes KYC checks so you 
                join events with verified organizers, not random profiles.</p>
            </div>
            <div className={styles["story-img-block"]}>
              <img src="src\assets\images\14-62-4x_BSRGAN.png" alt="Story left 2" />
              <h3>Smart Ratings</h3>
              <p>Ratings blend reviews, attendance history, 
                and host responsiveness for more honest scores.</p>
            </div>
          </div>

          {/* Center sticky text */}
          <div className={`${styles["story-col"]} ${styles["story-col--center"]}`}>
            <div className={styles["story-center-inner"]}>
              <p className={styles["story-kicker"]}>Paxmeet</p>
              <h2 className={styles["story-title"]}>
                Why Choose Paxmeet?
              </h2>
              <p className={styles["story-text"]}>
                Founded in 2015, Paxmeet started with a mission to connect travelers
                with authentic local experiences while promoting sustainable tourism.
              </p>
              <p className={styles["story-text"]}>
                Today, we continue to create immersive experiences that support
                conservation, communities, and a more thoughtful way of travel.
              </p>
              <button className={styles["story-btn"]}>Discover our story</button>
            </div>
          </div>

          {/* Right image column */}
          <div className={`${styles["story-col"]} ${styles["story-col--right"]}`}>
            <div className={styles["story-img-block"]}>
              <img src="src\assets\images\7-35-4x_BSRGAN.png" alt="Story right 1" />
              <h3>Curated For You</h3>
              <p>Get event suggestions by interest, mood, and budget instead of just distance.</p>
            </div>
            <div className={styles["story-img-block"]}>
              <img src="src\assets\images\traceroute command in linux - Google Search - Google Chrome 13-05-2025 18_00_10.png" alt="Story right 2" />
              <h3>Safe Group Discovery</h3>
              <p>Join moderated groups for treks, meets, and hobbies with safety tools built in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Teaser - Light */}
      <section className={`${styles.premiumSection} ${styles.lightSection}`}>
        <div className={styles.container}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Go Premium
          </motion.h2>
          <div className={styles.premiumGrid}>
            <motion.div 
              className={`${styles.premiumCard} ${styles.featured}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
            >
              <span className={styles.premiumBadge}>Most popular</span>
              <h3>Pro Plan</h3>
              <div className={styles.price}>₹499<span>/month</span></div>
              <ul>
                <li>✅ Unlimited events</li>
                <li>✅ Priority listing</li>
                <li>✅ Advanced filters</li>
              </ul>
              <Link to="/premium" className={styles.primaryBtn}>Choose Pro</Link>
            </motion.div>
            <motion.div 
              className={styles.premiumCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
            >
              <h3>Basic</h3>
              <div className={styles.price}>Free</div>
              <ul>
                <li>✅ 5 events/month</li>
                <li>✅ Basic filters</li>
              </ul>
              <Link to="/premium" className={styles.primaryBtn}>Get Started</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download Promoter - Dark */}
      <section className={`${styles.downloadSection} ${styles.darkSection}`}>
        <div className={styles.container}>
          <motion.div 
            className={styles.downloadContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.sectionTitle}>Download Paxmeet App</h2>
            <p className={styles.downloadSubtitle}>Get tickets, notifications, and exclusive events on the go.</p>
            <div className={styles.downloadButtons}>
              <Link to="/download" className={`${styles.primaryBtn} ${styles.largeBtn}`}>
                📱 Android App
              </Link>
              <Link to="/download" className={`${styles.primaryBtn} ${styles.largeBtn} ${styles.iosBtn}`}>
                💻 iOS App
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form - Light */}
      <section className={`${styles.contactSection} ${styles.darkSection}`}>
        <div className={styles.container}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.h2>
          <motion.form 
            className={styles.contactForm}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Topic" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit" className={styles.primaryBtn}>Send Message</button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
