import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const TOKEN_KEY = "indigo_auth_token";
const API_URL = `${import.meta.env.VITE_API_URL}/api/users`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_URL}/verify`, {
          headers: {
            "x-auth-token": token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
        } else {
          localStorage.removeItem(TOKEN_KEY);
        }
      } catch (err) {
        console.error("Session verification failed", err);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const signup = async ({ name, email, password }) => {
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: data.error || "Signup failed." };
      }
      localStorage.setItem(TOKEN_KEY, data.token);
      setUser(data.user);
      return { user: data.user };
    } catch (err) {
      return { error: "Network error occurred." };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: data.error || "Invalid email or password." };
      }
      localStorage.setItem(TOKEN_KEY, data.token);
      setUser(data.user);
      return { user: data.user };
    } catch (err) {
      return { error: "Network error occurred." };
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
