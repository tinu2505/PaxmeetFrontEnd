// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

// use your Postman mock URL here
const HOST = 'https://api.paxmeet.com';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveTokens = (access, refresh) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    localStorage.setItem(
      'paxmeet_tokens',
      JSON.stringify({ accessToken: access, refreshToken: refresh })
    );
  };

  const loadTokens = () => {
    const raw = localStorage.getItem('paxmeet_tokens');
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
    localStorage.removeItem('paxmeet_tokens');
  };

  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) return null;

    const res = await fetch(`${HOST}/accounts/refresh_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

  const apiCall = useCallback(
    async (path, options = {}) => {
      let token = accessToken;

      if (!token) {
        token = await refreshAccessToken();
        if (!token) throw new Error('Not authenticated');
      }

      const res = await fetch(`${HOST}${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        const newToken = await refreshAccessToken();
        if (!newToken) throw new Error('Session expired');
        const retry = await fetch(`${HOST}${path}`, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
            Authorization: `Bearer ${newToken}`,
          },
        });
        return retry;
      }

      return res;
    },
    [accessToken, refreshAccessToken]
  );

  useEffect(() => {
    const init = async () => {
      const saved = loadTokens();
      if (!saved) {
        setLoading(false);
      }

      setAccessToken(saved.accessToken);
      setRefreshToken(saved.refreshToken);
      try {
        const res = await apiCall('/accounts/details', { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [apiCall]);

  const login = async ({ identifier, password }) => {
    const res = await fetch(`${HOST}/accounts/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Login failed');
    }

    const data = await res.json(); // { accessToken, refreshToken, user }
    saveTokens(data.accessToken, data.refreshToken);
    setUser(data.user);
    return data.user;
  };

  const signup = async (payload) => {
    const res = await fetch(`${HOST}/accounts/register_user/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Signup failed');
    }

    const data = await res.json();
    if (data.accessToken && data.refreshToken) {
      saveTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
    }
    return data;
  };

  const logout = async () => {
    try {
      await fetch(`${HOST}/accounts/logout`, { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    clearTokens();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user && !!accessToken,
    login,
    signup,
    logout,
    apiCall,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
