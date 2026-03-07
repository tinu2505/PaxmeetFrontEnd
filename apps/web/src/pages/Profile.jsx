// src/pages/Profile.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import styles from './Profile.module.css';  // REUSE OUR STYLES

export default function Profile() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div>Loading profile...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div>Redirecting to login...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* User Header */}
          <div className="flex flex-col md:flex-row gap-6 items-center mb-8 p-6 bg-[var(--bg-secondary)] rounded-2xl">
            <div className="w-24 h-24 bg-[var(--gradient-primary)] rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-2xl">
              {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className={styles.title}>{user.first_name || 'User'}</h1>
              <p className="text-[var(--text-secondary)] text-lg mb-1">{user.email}</p>
              {user.username && (
                <p className="text-[var(--primary-light)] font-semibold">@ {user.username}</p>
              )}
            </div>
            <button 
              onClick={logout}
              className="bg-red-500/20 hover:bg-red-500 text-white border border-red-500/50 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Log out
            </button>
          </div>

          {/* Stats */}
          <div className={styles.profileStats}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{user.stats?.hosted ?? 0}</span>
              <span className={styles.statLabel}>Hosted</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>{user.stats?.attended ?? 0}</span>
              <span className={styles.statLabel}>Attended</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>
                {user.stats?.rating ? `${(user.stats.rating * 5).toFixed(1)}/5` : '0'}
              </span>
              <span className={styles.statLabel}>Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
