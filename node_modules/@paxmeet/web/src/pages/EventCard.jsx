import { useNavigate } from 'react-router-dom';
import styles from "./EventCard.module.css";

function EventCard({ event }) {
  const navigate = useNavigate();
  const locationStr = event.location || "";
  const [firstWord, ...rest] = locationStr.split(' ');
  const restOfLocation = rest.join(' ');

  const handleCardClick = () => {
    navigate(`/events/${event.unique_id || event.id}`);
  }

  return (
    <article className={styles.eventCard} onClick={handleCardClick}>
      {/* Image / header area */}
      <div className={styles.imageWrapper}>
        <img
          src={event.image}
          alt={event.title}
          className={styles.image}
          onError={(e) => { e.target.src = 'src/assets/images/--eventcardimage.png'; }}
        />

        {/* Likes / views pill */}
        <div className={styles.likeView}>
          <div className={styles.likeBlock}>
            <span className={styles.iconHeart} aria-hidden="true" />
            <span className={styles.countText}>{event.likes}</span>
          </div>
          <div className={styles.viewBlock}>
            <span className={styles.iconEye} aria-hidden="true" />
            <span className={styles.countText}>{event.views}</span>
          </div>
        </div>

        {/* Distance pill */}
        <div className={styles.distance}>
          <span className={styles.iconRoute} aria-hidden="true" />
          <div className={styles.distanceText}>
            <span className={styles.distanceMain}>{event.distance}</span>
            <span className={styles.distanceSub}>From your location</span>
          </div>
        </div>

        {/* Small attendee avatars */}
        <div className={styles.attendees}>
          <div
            className={`${styles.avatar} ${styles.avatar1}`}
            style={{ backgroundImage: `url(${event.avatar1})` }}
          />
          <div
            className={`${styles.avatar} ${styles.avatar2}`}
            style={{ backgroundImage: `url(${event.avatar2})` }}
          />
          <span className={styles.attendeeText}>{event.goingText}</span>
        </div>
      </div>

      {/* Content area */}
      <div className={styles.content}>
        <div className={styles.headerRow}>
          <div className={styles.details}>
            <h3 className={styles.title}>{event.title}</h3>

            <div className={styles.locationRow}>
              <span className={styles.iconLocation} aria-hidden="true" />
              <span className={styles.city}>{event.city}</span>
              <span className={styles.addressRow}>
                <span className={styles.address}>
                  <span className={styles.locationFirstWord}>{firstWord}</span> {restOfLocation}
                </span>
              </span>
            </div>

            <div className={styles.dateRow}>
              <div className={styles.dateMain}>
                <span className={styles.iconCalendar} aria-hidden="true" />
                <span className={styles.dateText}>{event.date}</span>
              </div>

              <div className={styles.dateSub}>
                <span className={styles.dayText}>{event.day}</span>
              </div>
            </div>
          </div>

          <div className={styles.priceBlock}>
            <div className={styles.priceText}>₹{event.price}</div>
            <button className={styles.arrowButton} aria-label="View details">
              <span className={styles.arrowIcon} />
            </button>
          </div>
        </div>

        <div className={styles.tagsRow}>
          {(event.tags || []).map((tag, i) => (
            <span key={i} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default EventCard;
