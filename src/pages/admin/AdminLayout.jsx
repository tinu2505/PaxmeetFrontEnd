import { Link, Outlet } from 'react-router-dom';
import styles from './Admin.module.css';

export default function AdminLayout() {
  return (
    <div className={styles.adminContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>PaxMeet Admin</div>
        <nav className={styles.nav}>
          <Link to="/admin/dashboard" className={styles.navItem}>Dashboard</Link>
          <Link to="/admin/users" className={styles.navItem}>Manage Users</Link>
          <Link to="/admin/reports" className={styles.navItem}>Reports</Link>
          <Link to="/admin/settings" className={styles.navItem}>System Settings</Link>
        </nav>
      </aside>
      <main className={styles.content}>
        <header className={styles.topHeader}>
          <h2>Admin Control Panel</h2>
          <div className={styles.adminProfile}>Admin User</div>
        </header>
        <div className={styles.viewContainer}>
          <Outlet /> {/* This is where specific pages like Users or Stats will render */}
        </div>
      </main>
    </div>
  );
}