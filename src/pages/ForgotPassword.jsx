// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';

const API_BASE = 'https://api.paxmeet.com'; // same as AuthContext

export default function ForgotPassword() {
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'reset'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/accounts/forgot_password/send_otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to send OTP');
      }
      setStep('otp');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/accounts/forgot_password/verify_otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok || !data.valid) {
        throw new Error(data.message || 'Invalid OTP');
      }
      setStep('reset');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/accounts/forgot_password/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp,
          newPassword: passwords.newPassword,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Could not reset password');
      }
      // redirect to login or show success
      // navigate('/login');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // render UI based on `step` (email → otp → reset)
  // call sendOtp / verifyOtp / resetPassword on buttons
}
