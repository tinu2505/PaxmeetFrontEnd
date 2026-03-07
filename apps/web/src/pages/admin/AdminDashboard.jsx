// src/pages/admin/AdminDashboard.jsx
import { StatsCard } from './components/StatsCard';
import styles from './Admin.module.css';

export default function AdminDashboard() {
  return (
    <div className={styles.dashboardGrid}>
      <StatsCard 
        title="Total Users" 
        value="1,284" 
        icon="👤" 
        trend="up" 
        trendValue="12" 
      />
      <StatsCard 
        title="Active Sessions" 
        value="42" 
        icon="🌐" 
      />
      <StatsCard 
        title="New Signups" 
        value="156" 
        icon="📈" 
        trend="up" 
        trendValue="8" 
      />
      <StatsCard 
        title="Server Load" 
        value="24%" 
        icon="⚙️" 
        trend="down" 
        trendValue="2" 
      />
    </div>
  );
}