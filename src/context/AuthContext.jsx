import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure Axios defaults when user changes
  useEffect(() => {
    const storedUser = localStorage.getItem('smartlearn_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
      } catch (e) {
        localStorage.removeItem('smartlearn_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('smartlearn_user', JSON.stringify(data));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check credentials.';
      setError(msg);
      throw new Error(msg);
    }
  };

  const register = async (name, email, password, role) => {
    setError(null);
    try {
      const { data } = await axios.post('/api/auth/register', { name, email, password, role });
      setUser(data);
      localStorage.setItem('smartlearn_user', JSON.stringify(data));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      return data;
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(msg);
      throw new Error(msg);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartlearn_user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
