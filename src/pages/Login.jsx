// src/pages/Login.jsx - BULLETPROOF VERSION
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx"; // adjust path if needed
import { GoogleLogin } from '@react-oauth/google';
import styles from "./AuthForms.module.css"; // adjust path if needed

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginWithGoogle, isAuthenticated } = useAuth();

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "identifier") {
      value = value.toLowerCase();
    }
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await auth.login(form);
      await new Promise(resolve => setTimeout(resolve, 500));
      if (auth.isAuthenticated) {
        navigate('/profile');
      } else {
        setError('Auth sync failed, refreshing...');
        window.location.href = '/profile';  // Force reload
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    setLoading(true);
    try {
      // credentialResponse.credential is the JWT idToken from Google
      const result = await loginWithGoogle(credentialResponse.credential);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome Back</h1>
          {error && <div className={styles.error}>{error}</div>}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Email or Username</label>
              <input
                name="identifier"
                type="text"
                value={form.identifier}
                onChange={handleChange}
                className={styles.input}
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <>
                  <span className={styles.loadingSpinner} />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className={styles.divider}>
            <span>OR</span>
          </div>
          
          <div className={styles.googleWrapper}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google login failed")}
              useOneTap={false}
              theme="filled_black"
              shape="pill"
            />
          </div>
          <div className={styles.links}>
            <p>
              <Link to="/forgot-password" className={styles.link}>
                Forgot Password?
              </Link>
            </p>
            <p>
              New to PaxMeet?{" "}
              <Link to="/signup" className={styles.link}>
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
