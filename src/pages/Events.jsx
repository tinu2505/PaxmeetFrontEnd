import { useMemo, useState } from 'react';
import { distance, motion } from 'framer-motion';
import styles from './Events.module.css';
import EventCard from './EventCard';
import { div } from 'framer-motion/client';

const MOCK_EVENTS = [
  {
    id: 1,
    title: "Travis Scott",
    description: "Easy coastal trek with a golden-hour view and chai at the top.",
    city: "Delhi",
    location: "Chandni Chowk",
    date: "30 SEP",
    day: "Friday",
    distanceKm: 8,
    distance: "200 meters",
    distanceSub: "from your location",
    gender: 'mixed',
    category: 'Trek',
    price: 200,
    image: "src/assets/images/--eventcardimage.png",
    avatar1: "src/assets/images/avatar1.png",
    avatar2: "src/assets/images/avatar2.png",
    goingText: "56 going",
    likes: "11k",
    views: "121k",
    tags: ["Music Event", "Chill vibe", "Chill vibe"],
  },
  {
    id: 2,
    title: "Travis Scott",
    description: "Easy coastal trek with a golden-hour view and chai at the top.",
    city: "Goa",
    location: "Chandni Chowk",
    date: "30 SEP",
    day: "Friday",
    distanceKm: 12,
    distance: "12 KM",
    distanceSub: "from your location",
    gender: 'female',
    category: 'Music',
    price: 'Free',
    image: "src/assets/images/--eventcardimage.png",
    avatar1: "src/assets/images/avatar1.png",
    avatar2: "src/assets/images/avatar2.png",
    goingText: "56 going",
    likes: "11k",
    views: "121k",
    tags: ["Music Event", "Chill vibe", "Chill vibe"],
  },
  {
    id: 3,
    title: "Travis Scott",
    description: "Easy coastal trek with a golden-hour view and chai at the top.",
    city: "Delhi",
    location: "Chandni Chowk",
    date: "30 SEP",
    day: "Friday",
    distanceKm: 21,
    distance: "21 KM",
    distanceSub: "from your location",
    gender: 'female',
    category: 'Workshop',
    price: 200,
    image: "src/assets/images/--eventcardimage.png",
    avatar1: "src/assets/images/avatar1.png",
    avatar2: "src/assets/images/avatar2.png",
    goingText: "56 going",
    likes: "11k",
    views: "121k",
    tags: ["Music Event", "Chill vibe", "Chill vibe"],
  },
  {
    id: 4,
    title: "Travis Scott",
    description: "Easy coastal trek with a golden-hour view and chai at the top.",
    city: "Mumbai",
    location: "Chandni Chowk",
    date: "30 SEP",
    day: "Friday",
    distanceKm: 15,
    distance: "15 KM",
    distanceSub: "from your location",
    gender: 'mixed',
    category: 'Social',
    price: 'free',
    image: "src/assets/images/--eventcardimage.png",
    avatar1: "src/assets/images/avatar1.png",
    avatar2: "src/assets/images/avatar2.png",
    goingText: "56 going",
    likes: "11k",
    views: "121k",
    tags: ["Music Event", "Chill vibe", "Chill vibe"],
  },
  {
    id: 5,
    title: "Travis Scott",
    description: "Easy coastal trek with a golden-hour view and chai at the top.",
    city: "Bangalore",
    location: "Chandni Chowk",
    date: "30 SEP",
    day: "Friday",
    distanceKm: 8,
    distance: "200 meters",
    distanceSub: "from your location",
    gender: 'mixed',
    category: 'Fitness',
    price: 1200,
    image: "src/assets/images/--eventcardimage.png",
    avatar1: "src/assets/images/avatar1.png",
    avatar2: "src/assets/images/avatar2.png",
    goingText: "56 going",
    likes: "11k",
    views: "121k",
    tags: ["Music Event", "Chill vibe", "Chill vibe"],
  },
  {
    id: 6,
    title: "Travis Scott",
    description: "Easy coastal trek with a golden-hour view and chai at the top.",
    city: "Delhi",
    location: "Chandni Chowk, Delhi",
    date: "30 SEP",
    day: "Friday",
    distanceKm: 8,
    distance: "200 meters",
    distanceSub: "from your location",
    gender: 'mixed',
    category: 'Meetup',
    price: 200,
    image: "src/assets/images/--eventcardimage.png",
    avatar1: "src/assets/images/avatar1.png",
    avatar2: "src/assets/images/avatar2.png",
    goingText: "56 going",
    likes: "11k",
    views: "121k",
    tags: ["Music Event", "Chill vibe", "Chill vibe"],
  },
];

const CATEGORIES = ['All', 'Trek', 'Meetup', 'Workshop', 'Fitness', 'Social'];

export default function Events() {
  const [searchText, setSearchText] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [distanceFilter, setDistanceFilter] = useState('any');
  const [genderFilter, setGenderFilter] = useState('any');
  const [priceFilter, setPriceFilter] = useState('any');
  const [dateFilter, setDateFilter] = useState('any');

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((event) => {
      const text = searchText.toLowerCase().trim();

      if (text) {
        const haystack = `${event.title} ${event.description} ${event.location} ${event.category}`
        .toLowerCase();
        if (!haystack.includes(text)) return false;
      }

      if (locationFilter) {
        if (!event.city.toLowerCase().includes(locationFilter.toLowerCase())) return false;
      }

      if (categoryFilter !== 'All' && event.category !== categoryFilter) {
        return false;
      }

      if (distanceFilter !== 'any') {
        const limit = Number(distanceFilter);
        if (event.distanceKm > limit) return false;
      }

      if (genderFilter !== 'any' && event.gender !== genderFilter) {
        return false;
      }

      if (priceFilter === 'free' && event.price > 0) return false;
      if (priceFilter === 'paid' && event.price === 0) return false;

      // dateFilter is placeholder; hook real dates later
      return true;
    });
  }, [searchText, locationFilter, categoryFilter, distanceFilter, genderFilter, priceFilter, dateFilter]);

  return(
    <section className={styles.page}>
      {/* Hero strip with search + filters */}
      <div className={styles.heroStrip}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Find events around you</h1>
          <p className={styles.heroSubtitle}>
            Filter by distance, vibe, and budget to discover meetups, treks, and workshops that fit you.
          </p>
        </div>
        <div className={styles.filtersWrapper}>
          {/* Top row: location + main search */}
          <div className={styles.filterRowPrimary}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Location</label>
              <input
                type="text"
                placeholder="Search city or area"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={`${styles.fieldGroup} ${styles.fullWidthOnMobile}`}>
              <label className={styles.label}>Search</label>
              <input
                type="text"
                placeholder="Try “trek”, “board games”, “camera”..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          {/* Second row: select filters */}
          <div className={styles.filterRowSecondary}>
            <div className={styles.fieldGroupCompact}>
              <label className={styles.label}>Distance</label>
              <select
                className={styles.select}
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(e.target.value)}
              >
                <option value="any">Any</option>
                <option value="5">Within 5 km</option>
                <option value="10">Within 10 km</option>
                <option value="20">Within 20 km</option>
              </select>
            </div>

            <div className={styles.fieldGroupCompact}>
              <label className={styles.label}>Gender</label>
              <select
                className={styles.select}
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="any">Any</option>
                <option value="mixed">Mixed</option>
                <option value="female">Women only</option>
              </select>
            </div>

            <div className={styles.fieldGroupCompact}>
              <label className={styles.label}>Price</label>
              <select
                className={styles.select}
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <option value="any">Any</option>
                <option value="free">Free only</option>
                <option value="paid">Paid only</option>
              </select>
            </div>

            <div className={styles.fieldGroupCompact}>
              <label className={styles.label}>Date</label>
              <select
                className={styles.select}
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="any">Any time</option>
                <option value="today">Today</option>
                <option value="weekend">This weekend</option>
                <option value="week">Next 7 days</option>
              </select>
            </div>
          </div>

          {/* Category pill group */}
          <div className={styles.categoriesRow}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.categoryPill} ${
                  categoryFilter === cat ? styles.categoryPillActive : ''
                }`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events grid */}
      <div className={styles.resultsSection}>
        <div className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>Upcoming events</h2>
          <p className={styles.resultsMeta}>
            Showing {filteredEvents.length} of {MOCK_EVENTS.length} events
          </p>
        </div>

        {filteredEvents.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No events match these filters yet</h3>
            <p>Try clearing some filters or changing your location.</p>
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => {
                setSearchText('');
                setLocationFilter('');
                setCategoryFilter('All');
                setDistanceFilter('any');
                setGenderFilter('any');
                setPriceFilter('any');
                setDateFilter('any');
              }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.01 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}