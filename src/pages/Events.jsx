import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Events.module.css';

const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Sunset Beach Trek',
    description: 'Easy coastal trek with a golden-hour view and chai at the top.',
    date: 'Sat, 21 Dec · 5:00 PM',
    location: 'North Goa',
    city: 'Goa',
    distanceKm: 8,
    gender: 'mixed',
    price: 0,
    category: 'Trek',
    tags: ['Beginner friendly', 'Outdoors', 'Free'],
  },
  {
    id: 2,
    title: 'Creators Meetup',
    description: 'Meet local creators, share ideas, and plan collabs for 2025.',
    date: 'Sun, 22 Dec · 4:00 PM',
    location: 'Panaji cowork',
    city: 'Goa',
    distanceKm: 3,
    gender: 'mixed',
    price: 199,
    category: 'Meetup',
    tags: ['Networking', 'Content', 'Paid'],
  },
  {
    id: 3,
    title: 'Photography Walk – Old Goa',
    description: 'Street and heritage photography session with live feedback.',
    date: 'Sat, 28 Dec · 7:00 AM',
    location: 'Old Goa',
    city: 'Goa',
    distanceKm: 15,
    gender: 'mixed',
    price: 299,
    category: 'Workshop',
    tags: ['Camera', 'Learning', 'Outdoors'],
  },
  {
    id: 4,
    title: 'Women’s Morning Run Club',
    description: 'Weekly 5K run with guided warm-up and cooldown.',
    date: 'Every Sun · 6:30 AM',
    location: 'Miramar',
    city: 'Goa',
    distanceKm: 5,
    gender: 'female',
    price: 0,
    category: 'Fitness',
    tags: ['Women only', 'Routine', 'Free'],
  },
  {
    id: 5,
    title: 'Board Games & Chai Night',
    description: 'Casual board game evening with snacks included.',
    date: 'Fri, 27 Dec · 8:00 PM',
    location: 'Panaji café',
    city: 'Goa',
    distanceKm: 2,
    gender: 'mixed',
    price: 149,
    category: 'Social',
    tags: ['Indoors', 'Games', 'Paid'],
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
              <motion.article
                key={event.id}
                className={styles.card}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.01 }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardCategory}>{event.category}</span>
                  <span className={styles.cardPrice}>
                    {event.price === 0 ? 'Free' : `₹${event.price}`}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{event.title}</h3>
                <p className={styles.cardDescription}>{event.description}</p>
                <div className={styles.cardMeta}>
                  <span>{event.date}</span>
                  <span>·</span>
                  <span>{event.location}</span>
                </div>
                <div className={styles.cardTags}>
                  {event.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                  </div>
                <button type="button" className={styles.viewBtn}>
                  View details
                </button>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}