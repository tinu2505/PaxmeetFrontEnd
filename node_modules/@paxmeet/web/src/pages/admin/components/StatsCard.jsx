// src/pages/admin/components/StatsCard.jsx
import styles from '../Admin.module.css';

export function StatsCard({ title, value, icon, trend, trendValue }) {
  return (
    <div className={styles.statsCard}>
      <div className={styles.statsIcon}>{icon}</div>
      <div className={styles.statsInfo}>
        <span className={styles.statsTitle}>{title}</span>
        <h3 className={styles.statsValue}>{value}</h3>
        {trend && (
          <span className={trend === 'up' ? styles.trendUp : styles.trendDown}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}% <small>vs last month</small>
          </span>
        )}
      </div>
    </div>
  );
}