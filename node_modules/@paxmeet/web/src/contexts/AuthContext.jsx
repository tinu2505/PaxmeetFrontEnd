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
    // If a refresh token is available, persist both tokens to localStorage
    if (refresh !== undefined && refresh !== null) {
      setRefreshToken(refresh);
      localStorage.setItem(
        "paxmeet_tokens",
        JSON.stringify({ accessToken: access, refreshToken: refresh })
      );
      // remove any transient session token
      sessionStorage.removeItem("paxmeet_tokens_session");
    } else {
      // No refresh token -> treat access token as transient and store in sessionStorage
      setRefreshToken(null);
      sessionStorage.setItem(
        "paxmeet_tokens_session",
        JSON.stringify({ accessToken: access })
      );
      // ensure persistent tokens are not present (avoids init trying to refresh)
      localStorage.removeItem("paxmeet_tokens");
    }
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

  const loadSessionTokens = () => {
    const raw = sessionStorage.getItem("paxmeet_tokens_session");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const loadPartialUser = () => {
    const raw = sessionStorage.getItem("paxmeet_partial_user");
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
    sessionStorage.removeItem("paxmeet_tokens_session");
    sessionStorage.removeItem("paxmeet_partial_user");
  }; 

  // ---- token refresh ----
  const refreshAccessToken = useCallback(async (manualRefreshToken = null) => {
    // prefer provided manual refresh token, then state, then what's in localStorage
    const tokenToUse = manualRefreshToken || refreshToken || loadTokens()?.refreshToken;
    if (!tokenToUse) {
      console.warn('No refresh token available for refreshAccessToken');
      return null;
    }

    try {
      const res = await fetch(`${HOST}/accounts/refresh_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: tokenToUse }),
      });

      if (!res.ok) throw new Error("Refresh failed");

      const data = await res.json();
      const newAccess = data.token?.access || data.access || data.accessToken;
      const newRefresh = data.token?.refresh || data.refresh || data.refreshToken || tokenToUse;

      if (!newAccess) {
        console.error("Backend response missing access token:", data);
        throw new Error("No new access token");
      }

      saveTokens(newAccess, newRefresh);
      return newAccess;
    } catch (err) {
      if (err.message !== "Failed to fetch") {
        clearTokens();
        setUser(null);
      }
      return null;
    }
  }, [refreshToken]);

  // ---- authenticated API calls ----
  const apiCall = useCallback(
    async (path, options = {}, manualToken = null, manualRefresh = null) => {
      // prefer explicit manualToken, then in-memory accessToken, then session-stored access token
      let token = manualToken || accessToken || loadSessionTokens()?.accessToken;
      // attempt refresh if we don't have an access token
      if (!token && (manualRefresh || refreshToken || loadTokens()?.refreshToken)) {
        token = await refreshAccessToken(manualRefresh);
      }
      if (!token) throw new Error("Not authenticated");

      const makeReq = async (bearer) =>
        fetch(`${HOST}${path}`, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
            Authorization: `Bearer ${bearer}`,
          },
        });

      let res = await makeReq(token);

      if (res.status === 401) {
        if (user?.isRegistrationIncomplete) {
          console.warn("401 suppressed: User is completing registration.");
          return res;
        }
        const newToken = await refreshAccessToken(manualRefresh);
        if (!newToken) {
          // No refresh possible — return the 401 response so callers can handle fallbacks
          return res;
        }
        res = await makeReq(newToken);
      }
      return res;
    },
    [accessToken, refreshToken, refreshAccessToken, user]
  );

  // ---- initial auth check ----
  useEffect(() => {
    const init = async () => {
      const saved = loadTokens();
      const session = loadSessionTokens();
      const partial = loadPartialUser();

      // If neither persistent nor session tokens exist, we're unauthenticated
      if (!saved && !session) {
        setLoading(false);
        return;
      }

      // Prefer persistent tokens (with refresh) but accept session-only access tokens
      if (saved) {
        setAccessToken(saved.accessToken);
        setRefreshToken(saved.refreshToken);
      } else if (session) {
        setAccessToken(session.accessToken);
        setRefreshToken(null);
      }

      // If we have a persisted partial user, restore it so refresh won't drop registration progress
      if (partial && !saved) {
        setUser(partial);
      }

      try {
        const res = await apiCall(
          "/accounts/details",
          { method: "GET" },
          saved?.accessToken || session?.accessToken,
          saved?.refreshToken || null
        );

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else if (res.status === 401) {
          // If we used a session token and have a persisted partial user, keep the partial user and don't clear session token
          if (session && partial) {
            console.warn('Auth init: /accounts/details returned 401 for session token, restoring partial user and retaining token');
            setUser(partial);
            // do not clear session token so user can continue registration
          } else {
            if (saved) {
              console.warn('Auth init: /accounts/details returned 401 for persistent token; clearing stored tokens');
            } else {
              console.warn('Auth init: /accounts/details returned 401 for session token; clearing session token');
            }
            clearTokens();
            setUser(null);
          }
        }
      } catch (e) {
        console.error("Auth init failed:", e);
        // clear tokens/user when init fails to avoid stuck state
        clearTokens();
        setUser(null);
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

    try {
      const userRes = await apiCall('/accounts/details', { method: 'GET' }, accessToken);
      if (userRes.ok) {
        const userData = await userRes.json();
        console.log('Fetched user details after login:', userData);
        setUser(userData);
        return userData;
      }
    } catch (err) {
      console.error('User details fetch failed:', err);
    }
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

  const loginWithGoogle = async (idToken) => {
    const res = await fetch(`${HOST}/accounts/oauth/google`, { // Update with your actual Postman endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: idToken }), // Your API expectation
    });

    console.log("Raw Response Status:", res.status);

    const data = await res.json();

    console.log("Full Auth API Data:", data);

    // debug info to help trace why details fetch may fail
    

    // Extract tokens (support multiple response shapes)
    const accessToken = data.token?.access || data.access;
    const refreshToken = data.token?.refresh || data.refresh || null;

    console.log("Extracted Access Token:", accessToken ? "Found" : "NOT FOUND");
  console.log("Extracted Refresh Token:", refreshToken ? "Found" : "NOT FOUND");

    if (accessToken) {
      // Save both tokens when present to enable refresh flows
      saveTokens(accessToken, refreshToken);

      if (data.login_success === false) {
        const partialUser = {
          email: data.data?.email,
          firstName: data.data?.first_name,
          lastName: data.data?.last_name,
          isRegistrationIncomplete: true,
          isGoogleUser: true
        };
        // persist partial user so page reload won't log the user out
        try { sessionStorage.setItem("paxmeet_partial_user", JSON.stringify(partialUser)); } catch (e) { console.warn('Failed to persist partial user', e); }
        setUser(partialUser);
        return { ...data, needsRegistration: true, partialUser };
      }

      try {
        const profile = await getProfile();
        return { ...data, needsRegistration: false, user: profile };
      } catch (err) {
        console.warn("Profile fetch failed, using data from login response:", err);
        if (data.user) {
          setUser(data.user);
          return { ...data, needsRegistration: false };
        }
        throw err;
      }
      // Fetch user details to sync the state. Pass the refresh token so apiCall can refresh if needed.

    }
    return data;
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
    console.log("checkEmail response data:", data);
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
    const data = await res.json();
    console.log("create_user/email response data:", data);
    const accessToken = data.access;
    const refreshToken = data.refresh;

    console.log("create_user/email tokens:", { accessToken: !!accessToken, refreshToken: !!refreshToken });


    if (accessToken) {
      saveTokens(accessToken, refreshToken);
    }
    else{
      console.warn("No tokens in create_user/email response:", data);
    }
    return data;
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
    const currentToken = accessToken || loadTokens()?.accessToken || loadSessionTokens()?.accessToken;

    if (!currentToken) {
      throw new Error("Session expired. Please sign in with Google again.");
    } 

    const res = await apiCall(`/accounts/register_user/email`, {
      method: "POST",
      body: JSON.stringify(payload), // { username, firstName, lastName, mobile, gender, dob }
    }, currentToken);

    if (!res.ok) {
      const text = await res.text();
      console.error("Signup error raw:", text);
      let errJson;
      try {
        errJson = JSON.parse(text);
      } catch {
        errJson = null;
      }
      throw new Error(errJson?.message || text || "Signup failed");
    }

    const data = await res.json();
    console.log("Final signup response data:", data);
    const finalAccess = data.token?.access; 
    const finalRefresh = data.token?.refresh;
    if (finalAccess) {
      saveTokens(finalAccess, finalRefresh);
    }
    // completed signup -> remove any persisted partial user
    sessionStorage.removeItem("paxmeet_partial_user");
    setUser(data.user || { username: payload.username });  // Fallback
    return data; 
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

    loginWithGoogle,

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
