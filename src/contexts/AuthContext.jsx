// src/contexts/AuthContext.jsx - COMPLETE
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();

// Base API URL - update to your real backend or Postman mock
const HOST = import.meta.env.VITE_API_URL ?? "https://api.paxmeet.com";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---- token management ----
  const saveTokens = (access, refresh) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    localStorage.setItem(
      "paxmeet_tokens",
      JSON.stringify({ accessToken: access, refreshToken: refresh })
    );
  };

  const loadTokens = () => {
    const raw = localStorage.getItem("paxmeet_tokens");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const clearTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("paxmeet_tokens");
  };

  // ---- token refresh ----
  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return null;

    const res = await fetch(`${HOST}/accounts/refresh_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      clearTokens();
      setUser(null);
      return null;
    }

    const data = await res.json();
    saveTokens(data.accessToken, data.refreshToken || refreshToken);
    return data.accessToken;
  }, [refreshToken]);

  // ---- authenticated API calls ----
  const apiCall = useCallback(
    async (path, options = {}) => {
      let token = accessToken;
      if (!token) {
        token = await refreshAccessToken();
        if (!token) throw new Error("Not authenticated");
      }

      const makeReq = async (bearer) =>
        fetch(`${HOST}${path}`, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
          },
        });

      let res = await makeReq(token);

      if (res.status === 401) {
        const newToken = await refreshAccessToken();
        if (!newToken) throw new Error("Session expired");
        res = await makeReq(newToken);
      }

      return res;
    },
    [accessToken, refreshAccessToken]
  );

  // ---- initial auth check ----
  useEffect(() => {
    const init = async () => {
      const saved = loadTokens();
      if (!saved) {
        setLoading(false);
        return;
      }

      setAccessToken(saved.accessToken);
      setRefreshToken(saved.refreshToken);

      try {
        const res = await apiCall("/accounts/details", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (e) {
        console.error("Auth init failed:", e);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [apiCall]);

  // ---- core auth functions ----
  const login = async ({ identifier, password }) => {
    const res = await fetch(`${HOST}/accounts/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Login failed");
    }

    const data = await res.json(); // { accessToken, refreshToken, user }
    const accessToken = data.token?.access;
    const refreshToken = data.token?.refresh;
    if (!accessToken) throw new Error('No access token received');
    saveTokens(accessToken, refreshToken);
    return data.user;
  };

  const logout = async () => {
    try {
      await fetch(`${HOST}/accounts/logout`, { method: "POST" });
    } catch (e) {
      console.error("Logout failed:", e);
    }
    clearTokens();
    setUser(null);
  };

  // ---- signup step-by-step APIs ----
  const checkEmail = async (email) => {
    const res = await fetch(`${HOST}/accounts/check/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }) 
    });
    if (!res.ok) {
      throw new Error("Cannot check email availability");
    }
    const data = await res.json(); // { exists: boolean }
    return data.exists;
  };

  const sendSignupOtp = async (email) => {
    const res = await fetch(`${HOST}/accounts/send_otp/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Cannot send OTP");
    }
    return true;
  };

  const verifySignupOtp = async ({ email, otp }) => {
    const res = await fetch(`${HOST}/accounts/verify_otp/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Invalid OTP");
    }
    return true;
  };

  const setSignupPassword = async ({ email, password }) => {
    const res = await fetch(`${HOST}/accounts/create_user/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Cannot save password");
    }
    return await res.json();
  };

  const checkUsername = async (username) => {
    const res = await fetch(`${HOST}/accounts/check/username`,{ 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Cannot check username");
    }
    const data = await res.json(); // { exists: boolean }
    return data.exists;
  };

  // final signup – creates account + logs in
  const signup = async (payload) => {
    const res = await fetch(`${HOST}/accounts/register_user/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), // { email, password, username, firstName, lastName, mobile, gender, dob }
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Signup failed");
    }

    const data = await res.json();
    const accessToken = data.token?.access;
    const refreshToken = data.token?.refresh;
    if (!accessToken) throw new Error('Signup succeeded but no tokens received');
    saveTokens(accessToken, refreshToken);
    setUser(data.user || { email: payload.email, username: payload.username });  // Fallback
    return data.user || { email: payload.email };
  };

  // ---- forgot password APIs ----
  const requestPasswordResetOtp = async (email) => {
    const res = await fetch(`${HOST}/accounts/forgot_password/send_otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Cannot send reset OTP");
    }
    return true;
  };

  const verifyResetOtp = async ({ email, otp }) => {
    const res = await fetch(`${HOST}/accounts/forgot_password/verify_otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Invalid reset OTP");
    }
    return true;
  };

  const resetPassword = async ({ email, newPassword }) => {
    const res = await fetch(`${HOST}/accounts/forgot_password/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: newPassword }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Cannot reset password");
    }
    return true;
  };

  // ---- profile helpers ----
  const getProfile = async () => {
    const res = await apiCall("/accounts/details", { method: "GET" });
    if (!res.ok) throw new Error("Failed to load profile");
    const data = await res.json();
    setUser(data);
    return data;
  };

  const updateProfile = async (updates) => {
    const res = await apiCall("/accounts/update", {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Failed to update profile");
    }
    const data = await res.json();
    setUser(data);
    return data;
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user && !!accessToken,

    // core auth
    login,
    signup,
    logout,

    // signup steps
    checkEmail,
    sendSignupOtp,
    verifySignupOtp,
    setSignupPassword,
    checkUsername,

    // forgot password
    requestPasswordResetOtp,
    verifyResetOtp,
    resetPassword,

    // profile
    getProfile,
    updateProfile,

    // low-level
    apiCall,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
