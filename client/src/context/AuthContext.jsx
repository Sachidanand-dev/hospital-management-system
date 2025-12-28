import { createContext, useContext, useState, useEffect } from "react";
import {
  login as loginApi,
  register as registerApi,
  getMyProfile,
} from "../api/auth.api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const userData = await getMyProfile();
          setUser(userData);
        } catch (err) {
          console.error("Failed to fetch profile:", err);
          localStorage.removeItem("accessToken");
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginApi(credentials);
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      await registerApi(userData);
      // Registration usually doesn't auto-login, or it might depending on backend.
      // Assuming it just registers for now.
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    // Optional: Call API logout if needed
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
