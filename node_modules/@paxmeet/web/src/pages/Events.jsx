import { useMemo, useState, useEffect } from 'react';
import { distance, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './Events.module.css';
import EventCard from './EventCard';
import { useAuth } from '../contexts/AuthContext';
import { getBrowserLocation } from '../utils/location';

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
  const navigate = useNavigate();
  const motionProps = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4 },
    whileHover: { y: -6, scale: 1.01 }
  };

  const { isAuthenticated, apiCall, loading: authLoading } = useAuth();

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem('accessToken');
  
  const [searchText, setSearchText] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [distanceFilter, setDistanceFilter] = useState('any');
  const [genderFilter, setGenderFilter] = useState('any');
  const [priceFilter, setPriceFilter] = useState('any');
  const [dateFilter, setDateFilter] = useState('any');

  useEffect(() => {
    // If no token, redirect to login or show popup
    if (authLoading) return;

    // 4. Use context boolean to check login status
    if (!isAuthenticated) {
      alert("Please login to view events.");
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {

        let lat = 24.7874167; 
        let lng = 73.0537217;

        try {
          const coords = await getBrowserLocation();
          lat = coords.lat;
          lng = coords.lng;
          console.log("Using browser location:", lat, lng);
        } catch (locError) {
        console.warn("Location access denied or failed, using fallbacks:", locError.message);
        }

        const catRes = await apiCall('/events/get_categories_types', { method: 'GET' });
        const catData = await catRes.json();

        if (catData.success&& Array.isArray(catData.categories)) {
          const categoryNames = catData.categories.map(cat => cat.name);
          setCategories(['All', ...categoryNames]);
        }
        else if (Array.isArray(catData)) {
          // Fallback if the API returns the array directly
          const categoryNames = catData.map(cat => cat.name);
          setCategories(['All', ...categoryNames]);
        }

        const eventRes = await apiCall(`/events/fetch_events?lat=${lat}&lng=${lng}`, { method: 'GET' });
        const eventData = await eventRes.json();
        console.log(eventData)
        
        if (eventData.results && Array.isArray(eventData.results)) {
          setEvents(eventData.results);
        } else {
          console.warn("API success but results array not found:", eventData);
          setEvents([]);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, authLoading, navigate, apiCall]);

  const filteredEvents = useMemo(() => {
    if (!Array.isArray(events)) return [];

    return events.filter((event) => {
      const text = searchText.toLowerCase().trim();

      if (text) {
        const haystack = `${event.name || ''} ${event.location?.formatted_address || ''}`.toLowerCase();
        if (!haystack.includes(text)) return false;
      }

      if (categoryFilter !== 'All' && event.category !== categoryFilter) return false;

      return true;
    });
  }, [events, searchText, categoryFilter]);
  
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }).toUpperCase();
  };

  if (loading) return <div className={styles.emptyState}>Loading events...</div>;

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
            {categories.map((cat) => (
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

        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.unique_id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -6, scale: 1.01 }}
          >
            <EventCard
              event={{
                ...event,
                id: event.unique_id,
                title: event.name,
                image: event.images?.[0]?.image|| 'src/assets/images/--eventcardimage.png',
                location: event.location?.formatted_address,
                views: event.stats?.views_count || 0,
                likes: event.stats?.likes_count || 0,
                goingText: `${event.stats?.audience_count || 0} going`,
                tags: event.category ? [event.category] : [],
                date: formatDate(event.start_datetime),
                day: new Date(event.start_datetime).toLocaleDateString('en-US', { weekday: 'long' })
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}