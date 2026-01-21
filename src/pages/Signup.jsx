// src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { GoogleLogin } from '@react-oauth/google';
import styles from './AuthForms.module.css';  // NEW IMPORT

const HOST = 'https://api.paxmeet.com';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

export default function Signup() {
  const { signup, checkEmail, sendSignupOtp, verifySignupOtp, setSignupPassword, checkUsername, loginWithGoogle, } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [checking, setChecking] = useState(false);
  const [form, setForm] = useState({
    email: '',
    otp: "",
    password: "",
    username: '',
    firstName: '',
    lastName: '',
    mobile: '',
    gender: '',
    dob: '',
    confirmPassword: "",
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError("");
    try {
      // loginWithGoogle sends the idToken to /accounts/oauth/google
      const data = await loginWithGoogle(credentialResponse.credential);

      if (data.is_new_user) {
        setStep(4);
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "email" || e.target.name === "username") {
      value = value.toLowerCase();
    }
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
    setError("");
  };

  const handleEmailSubmit = async () => {
    setError("");
    if (!form.email) return setError("Email required");

    setLoading(true);
    try {
      const exists = await checkEmail(form.email);
      if (exists) throw new Error("Email already registered");
      await sendSignupOtp(form.email);
      setStep(2); // go to OTP
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setError("");
    if (!form.otp) return setError("OTP required");

    setLoading(true);
    try {
      await verifySignupOtp({ email: form.email, otp: form.otp });
      setStep(3); // go to password
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async () => {
    setError("");
    if (!form.password) return setError("Password required");
    if (!PASSWORD_REGEX.test(form.password))
      return setError(
        "Password must be 8+ chars with 1 uppercase, 1 lowercase, 1 number, 1 special char"
      );

      setLoading(true);
    try {
      await setSignupPassword({ email: form.email, password: form.password });
      setStep(4); // go to username
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameSubmit = async () => {
    setError("");
    if (!form.username) return setError("Username required");

    setChecking(true);
    try {
      const exists = await checkUsername(form.username);
      if (exists) throw new Error("Username taken");
      setStep(5); // go to final details
    } catch (err) {
      setError(err.message);
    } finally {
      setChecking(false);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const required = {
      firstName: form.firstName,
      lastName: form.lastName,
      mobile: form.mobile,
      gender: form.gender,
      dob: form.dob,
    };

    for (const [field, value] of Object.entries(required)) {
      if (!value) return setError(`${field.replace(/([A-Z])/g, " $1").trim()} required`);
    }

    setLoading(true);
    try {
      await signup({
        phone: form.mobile.replace(/\s+/g, '').replace(/^91/, '+91'),  // Normalize to +91xxxxxxxxx,                 
        username: form.username,
        first_name: form.firstName,        
        last_name: form.lastName,
        gender: form.gender,           
        dob: form.dob,
        // invite_code: form.inviteCode
      });
      navigate("/profile");
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
          <div className={styles.stepIndicator}>
            Step {step} of 5
          </div>
          
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}
          
          {step === 1 && (
            <div className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={loading}
                  placeholder="you@example.com"
                />
              </div>
              <button
                type="button"
                className={styles.submitBtn}
                onClick={handleEmailSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className={styles.loadingSpinner} />
                    Checking...
                  </>
                ) : (
                  "Continue"
                )}
              </button>

              <div className={styles.divider}>
                <span>OR</span>
              </div>

              <div className={styles.googleWrapper}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google Signup Failed")}
                  theme="filled_black"
                  shape="pill"
                  text="signup_with"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>Enter OTP</label>
                <input
                  name="otp"
                  type="text"
                  maxLength={6}
                  value={form.otp}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={loading}
                  placeholder="123456"
                />
              </div>
              <div className={styles.stepActions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={handleOtpSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className={styles.loadingSpinner} />
                      Verifying...
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>Password</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={loading}
                  placeholder="Secure password"
                />
              </div>
              <div className={styles.stepActions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setStep(2)}
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={handlePasswordSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className={styles.loadingSpinner} />
                      Saving...
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>Username</label>
                <input
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={checking || loading}
                  placeholder="yourusername"
                />
              </div>
              <div className={styles.stepActions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => form.email && !form.password ? setStep(1) : setStep(3)}
                  disabled={checking || loading}
                >
                  Back
                </button>
                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={handleUsernameSubmit}
                  disabled={checking || loading}
                >
                  {checking ? (
                    <>
                      <span className={styles.loadingSpinner} />
                      Checking...
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <form className={styles.form} onSubmit={handleFinalSubmit}>
              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label className={styles.label}>First name</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className={styles.input}
                    disabled={loading}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Last name</label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className={styles.input}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <div className={styles.field}>
                  <label className={styles.label}>Mobile</label>
                  <input
                    name="mobile"
                    type="tel"
                    value={form.mobile}
                    onChange={handleChange}
                    className={styles.input}
                    disabled={loading}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Date of birth</label>
                  <input
                    name="dob"
                    type="date"
                    value={form.dob}
                    onChange={handleChange}
                    className={styles.input}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={loading}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className={styles.stepActions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setStep(4)}
                  disabled={loading}
                >
                  Back
                </button>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? (
                    <>
                      <span className={styles.loadingSpinner} />
                      Creating...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>
          )}

          <div className={styles.links}>
            <p>
              Already have an account?{" "}
              <Link to="/login" className={styles.link}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
