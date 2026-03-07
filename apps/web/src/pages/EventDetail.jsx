import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './EventDetail.module.css';

export default function EventDetail() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { apiCall, loading: authLoading } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (authLoading) return;

        const fetchDetail = async () => {
            try {
                // Ensure this path matches your backend requirement
                const res = await apiCall(`/events/${eventId}/events_details`, { method: 'GET' });
                if (!res.ok) throw new Error(`Server error: ${res.status}`);
                
                const data = await res.json();
                // Based on your console log, the data is the object itself
                setEvent(data);
            } catch (err) {
                console.error("Failed to fetch event details:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [eventId, apiCall, authLoading]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div className={styles.loading}>Loading event details...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!event) return <div className={styles.error}>No event found.</div>;

    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>

            <div className={styles.container}>
                {/* Header Section */}
                <header className={styles.header}>
                    <div className={styles.badge}>{event.status}</div>
                    <h1 className={styles.title}>{event.name}</h1>
                    <div className={styles.meta}>
                        <div className={styles.creatorInfo}>
                            <img src={event.creator?.pfp} alt="host" className={styles.hostAvatar} />
                            <span>Hosted by <strong>{event.creator?.first_name} {event.creator?.last_name}</strong></span>
                        </div>
                        <div className={styles.categoryBadge}>
                            {event.categories?.[0]?.name}
                        </div>
                    </div>
                </header>

                <div className={styles.mainLayout}>
                    {/* Left Column: Content */}
                    <div className={styles.content}>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <span className={styles.icon}>📅</span>
                                <div>
                                    <p className={styles.infoLabel}>Date & Time</p>
                                    <p className={styles.infoValue}>{formatDate(event.start_datetime)}</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.icon}>📍</span>
                                <div>
                                    <p className={styles.infoLabel}>Location</p>
                                    <p className={styles.infoValue}>{event.location?.formatted_address}</p>
                                    <p className={styles.subValue}>{event.location?.area}</p>
                                </div>
                            </div>
                        </div>

                        <section className={styles.descriptionSection}>
                            <h3>About Event</h3>
                            {/* Using dangerouslySetInnerHTML because your API returns <p><strong> tags */}
                            <div 
                                className={styles.description} 
                                dangerouslySetInnerHTML={{ __html: event.description }} 
                            />
                        </section>
                    </div>

                    {/* Right Column: Sidebar Actions */}
                    <aside className={styles.sidebar}>
                        <div className={styles.actionCard}>
                            <div className={styles.priceRow}>
                                <span>Entry Fee</span>
                                <span className={styles.price}>{event.is_paid ? `₹${event.price}` : 'FREE'}</span>
                            </div>
                            <div className={styles.capacity}>
                                👥 {event.maximum_capacity} Slots Max
                            </div>
                            <button className={styles.joinBtn}>
                                {event.requires_approval ? 'Request to Join' : 'Join Now'}
                            </button>
                            <p className={styles.note}>
                                {event.private_event ? "🔒 This is a private event" : "🌍 This is a public event"}
                            </p>
                        </div>
                        
                        <div className={styles.shareCard}>
                            <p>Invite friends to this event</p>
                            <input readOnly value={event.invite_url} className={styles.urlInput} />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}