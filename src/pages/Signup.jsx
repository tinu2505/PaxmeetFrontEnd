// src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import styles from './AuthForms.module.css';  // NEW IMPORT

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    mobile: '',
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(form);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Join PaxMeet</h1>
          
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Mobile</label>
              <input
                type="tel"
                placeholder="Your phone number"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className={styles.input}
                required
                disabled={loading}
              />
            </div>
            
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={styles.input}
                required
                disabled={loading}
              />
            </div>
            
            <div className={styles.field}>
              <label className={styles.label}>Username</label>
              <input
                type="text"
                placeholder="@username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className={styles.input}
                required
                disabled={loading}
              />
            </div>
            
            <div className={styles.fieldGroup}>
              <div className="flex-1">
                <label className={styles.label}>First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className={styles.input}
                  required
                  disabled={loading}
                />
              </div>
              <div className="flex-1">
                <label className={styles.label}>Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className={styles.input}
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className={styles.field}>
              <label className={styles.label}>Date of Birth</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                className={styles.input}
                required
                disabled={loading}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? (
                <>
                  <span className={styles.loadingSpinner}></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
          
          <div className={styles.links}>
            <p>
              Already have an account?{' '}
              <Link to="/login" className={styles.link}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
