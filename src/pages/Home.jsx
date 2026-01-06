import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Home.module.css';
import EventCard from "./EventCard";

const mockEvents = [
  {
    id: 1,
    title: "Travis Scott",
    city: "Delhi",
    location: "Chandni Chowk, Delhi",
    date: "30 SEP",
    day: "Friday",
    price: 200,
    image: "src/assets/images/--eventcardimage.png",
    avatar1: "src/assets/images/avatar1.png",
    avatar2: "src/assets/images/avatar2.png",
    goingText: "56 going",
    distance: "200 meters",
    distanceSub: "from your location",
    likes: "11k",
    views: "121k",
    tags: ["Music Event", "Chill vibe", "Chill vibe"],
  },
  {
    id: 2,
    title: "Travis Scott",
    city: "Delhi",
    location: "Chandni Chowk, Delhi",
    date: "30 SEP",
    day: "Friday",
    price: 200,
    image: "src/assets/images/--eventcardimage.png",
    avatar1: "src/assets/images/avatar1.png",
    avatar2: "src/assets/images/avatar2.png",
    goingText: "56 going",
    distance: "200 meters",
    distanceSub: "from your location",
    likes: "11k",
    views: "121k",
    tags: ["Music Event", "Chill vibe", "Chill vibe"],
  },
  {
    id: 3,
    title: "Travis Scott",
    city: "Delhi",
    location: "Chandni Chowk, Delhi",
    date: "30 SEP",
    day: "Friday",
    price: 200,
    image: "src/assets/images/--eventcardimage.png",
    avatar1: "src/assets/images/avatar1.png",
    avatar2: "src/assets/images/avatar2.png",
    goingText: "56 going",
    distance: "200 meters",
    distanceSub: "from your location",
    likes: "11k",
    views: "121k",
    tags: ["Music Event", "Chill vibe", "Chill vibe"],
  },
  {
    id: 4,
    title: "Travis Scott",
    city: "Delhi",
    location: "Chandni Chowk, Delhi",
    date: "30 SEP",
    day: "Friday",
    price: 200,
    image: "src/assets/images/--eventcardimage.png",
    avatar1: "src/assets/images/avatar1.png",
    avatar2: "src/assets/images/avatar2.png",
    goingText: "56 going",
    distance: "200 meters",
    distanceSub: "from your location",
    likes: "11k",
    views: "121k",
    tags: ["Music Event", "Chill vibe", "Chill vibe"],
  },
  {
    id: 5,
    title: "Travis Scott",
    city: "Delhi",
    location: "Chandni Chowk, Delhi",
    date: "30 SEP",
    day: "Friday",
    price: 200,
    image: "src/assets/images/--eventcardimage.png",
    avatar1: "src/assets/images/avatar1.png",
    avatar2: "src/assets/images/avatar2.png",
    goingText: "56 going",
    distance: "200 meters",
    distanceSub: "from your location",
    likes: "11k",
    views: "121k",
    tags: ["Music Event", "Chill vibe", "Chill vibe"],
  },
  {
    id: 6,
    title: "Travis Scott",
    city: "Delhi",
    location: "Chandni Chowk, Delhi",
    date: "30 SEP",
    day: "Friday",
    price: 200,
    image: "src/assets/images/--eventcardimage.png",
    avatar1: "src/assets/images/avatar1.png",
    avatar2: "src/assets/images/avatar2.png",
    goingText: "56 going",
    distance: "200 meters",
    distanceSub: "from your location",
    likes: "11k",
    views: "121k",
    tags: ["Music Event", "Chill vibe", "Chill vibe"],
  },
];

const mockCategories = [
  { id: 1, title: 'Treks', subtitle: 'Adventure awaits', img: 'src/assets/images/category.png' },
  { id: 2, title: 'Meetups', subtitle: 'Connect locally', img: 'src/assets/images/category.png' },
  { id: 3, title: 'Workshops', subtitle: 'Learn skills', img: 'src/assets/images/category.png' },
  { id: 4, title: 'Concerts', subtitle: 'Live music', img: 'src/assets/images/category.png' },
  { id: 5, title: 'Sports', subtitle: 'Play together', img: 'src/assets/images/category.png' },
  { id: 6, title: 'Kids', subtitle: 'Play together', img: 'src/assets/images/category.png' },
  { id: 7, title: 'Music', subtitle: 'Play together', img: 'src/assets/images/category.png' },
  { id: 8, title: 'Movies', subtitle: 'Play together', img: 'src/assets/images/category.png' },
  { id: 9, title: 'Hangout', subtitle: 'Play together', img: 'src/assets/images/category.png' },
];

const whyChooseUs = [
  { title: 'Real Connections', desc: 'Meet people who share your passions, not just profiles.', icon: '👥' },
  { title: 'Local Events', desc: 'Discover events happening in your city this weekend.', icon: '📍' },
  { title: 'Trusted Hosts', desc: 'Every organizer is verified for quality experiences.', icon: '✅' },
];

export default function Home() {
  return (
    <>
      {/* Hero Section - Dark 
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
      </section>*/}

      {/* New Figma hero */}
      <motion.section className={styles.figmaHeroSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75 }}
      >
        <div className={styles.figmaHeroInner}>
          {/* Left text block */}
          <motion.div className={styles.figmaHeroTextBlock}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1 className={styles.figmaHeroTitleHang}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hang <span className={styles.figmaHeroTitleBorder}>out</span>
            </motion.h1>

            <motion.h1 className={styles.figmaHeroTitleMore}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              MORE
            </motion.h1>

            <motion.div className={styles.figmaHeroSwipeRow}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <span className={styles.figmaHeroSwipe}>SWIPE</span>
              <span className={styles.figmaHeroLess}>LESS</span>
            </motion.div>

            <motion.p className={styles.figmaHeroSubtitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Discover real events, real people, and real memories – not endless profiles.
            </motion.p>

            <motion.div className={styles.figmaHeroCTAGroup}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              <motion.button className={styles.figmaHeroPrimaryBtn}
                whileTap={{ scale: 0.98 }}
              >
                Explore events
              </motion.button>
              <motion.button className={styles.figmaHeroSecondaryBtn}
                whileTap={{ scale: 0.98 }}
              >
                Become a host
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right cards column */}
          <motion.div className={styles.figmaHeroCardsColumn}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className={styles.figmaHeroCardsTrack}>
              <div className={styles.figmaHeroCardsList}>
                <motion.div className={`${styles.figmaHeroCard} ${styles.figmaHeroCardTop}`}>
                  <div className={styles.figmaHeroCardImage} />
                  <div className={styles.figmaHeroCardMeta}>
                    <span className={styles.figmaHeroCardTag}>Liquor tasting</span>
                    <span className={styles.figmaHeroCardLocation}>Mumbai • Tonight</span>
                  </div>
                </motion.div>

                <motion.div className={styles.figmaHeroCard}>
                  <div className={styles.figmaHeroCardImageParty} />
                  <div className={styles.figmaHeroCardMeta}>
                    <span className={styles.figmaHeroCardTag}>House party</span>
                    <span className={styles.figmaHeroCardLocation}>Bangalore • Friday</span>
                  </div>
                </motion.div>

                <motion.div className={styles.figmaHeroCard}>
                  <div className={styles.figmaHeroCardImagePicnic} />
                  <div className={styles.figmaHeroCardMeta}>
                    <span className={styles.figmaHeroCardTag}>Picnic</span>
                    <span className={styles.figmaHeroCardLocation}>Delhi • Sunday</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className={`${styles.figmaHeroCard} ${styles.figmaHeroCardTop}`}>
                  <div className={styles.figmaHeroCardImage} />
                  <div className={styles.figmaHeroCardMeta}>
                    <span className={styles.figmaHeroCardTag}>Liquor tasting</span>
                    <span className={styles.figmaHeroCardLocation}>Mumbai • Tonight</span>
                  </div>
                </motion.div>

                <motion.div 
                  className={styles.figmaHeroCard}>
                  <div className={styles.figmaHeroCardImageParty} />
                  <div className={styles.figmaHeroCardMeta}>
                    <span className={styles.figmaHeroCardTag}>House party</span>
                    <span className={styles.figmaHeroCardLocation}>Bangalore • Friday</span>
                  </div>
                </motion.div>

                <motion.div 
                  className={styles.figmaHeroCard}>
                  <div className={styles.figmaHeroCardImagePicnic} />
                  <div className={styles.figmaHeroCardMeta}>
                    <span className={styles.figmaHeroCardTag}>Picnic</span>
                    <span className={styles.figmaHeroCardLocation}>Delhi • Sunday</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>


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
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
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
                <li>Unlimited events</li>
                <li>Priority listing</li>
                <li>Advanced filters</li>
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
                <li>5 events/month</li>
                <li>Basic filters</li>
              </ul>
              <Link to="/premium" className={styles.primaryBtn}>Get Started</Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className={styles.downloadContactMerge}>
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
      </section>
    </>
  );
}
