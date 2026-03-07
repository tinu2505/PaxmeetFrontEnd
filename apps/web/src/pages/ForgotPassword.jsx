// src/pages/ForgotPassword.jsx - COMPLETE using AuthContext
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import styles from "./AuthForms.module.css";

export default function ForgotPassword() {
  const {
    requestPasswordResetOtp,
    verifyResetOtp,
    resetPassword,
  } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "email") {
      value = value.toLowerCase();
    }
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
    setError("");
  };

  // ---- STEP 1: send reset OTP ----
  const handleEmailSubmit = async () => {
    setError("");
    if (!form.email) return setError("Email required");

    setLoading(true);
    try {
      await requestPasswordResetOtp(form.email);
      setStep(2); // go to OTP
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---- STEP 2: verify OTP ----
  const handleOtpSubmit = async () => {
    setError("");
    if (!form.otp) return setError("OTP required");

    setLoading(true);
    try {
      await verifyResetOtp({ email: form.email, otp: form.otp });
      setStep(3); // go to new password
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---- STEP 3: reset password ----
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.newPassword) return setError("New password required");
    if (form.newPassword !== form.confirmPassword)
      return setError("Passwords don't match");
    if (form.newPassword.length < 8)
      return setError("Password must be at least 8 characters");

    setLoading(true);
    try {
      await resetPassword({
        email: form.email,
        newPassword: form.newPassword,
      });
      setError(""); // clear errors
      navigate("/login", { state: { message: "Password reset successfully!" } });
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
          <h1 className={styles.title}>
            {step === 1
              ? "Reset Password"
              : step === 2
              ? "Verify OTP"
              : "New Password"}
          </h1>

          {error && <div className={styles.error}>{error}</div>}

          {/* STEP 1: EMAIL */}
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
                  placeholder="your@email.com"
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
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
          )}

          {/* STEP 2: OTP */}
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

          {/* STEP 3: NEW PASSWORD */}
          {step === 3 && (
            <form className={styles.form} onSubmit={handleResetSubmit}>
              <div className={styles.field}>
                <label className={styles.label}>New Password</label>
                <input
                  name="newPassword"
                  type="password"
                  value={form.newPassword}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={loading}
                  placeholder="New secure password"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={loading}
                  placeholder="Confirm new password"
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
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                  {loading ? (
                    <>
                      <span className={styles.loadingSpinner} />
                      Resetting...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          )}

          <div className={styles.links}>
            <p>
              <Link to="/login" className={styles.link}>
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
