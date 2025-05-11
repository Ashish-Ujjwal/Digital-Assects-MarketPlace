// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/axiosInstance';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);


  // Refresh token logic runs ONCE on page load
  useEffect(() => {
    const refreshTokenAndSetUser = async () => {
      try {
        const res = await apiClient.post(
          '/users/refresh-token',
          {},
          { withCredentials: true }
        );
        const { user, accessToken } = res.data.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
      } catch (error) {
        // console.log('🔁 Refresh token invalid or expired. Logging out...');
        localStorage.clear();
        setCurrentUser(null);
      }
    };

    // Run on first page load only
    refreshTokenAndSetUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      console.log(email, password);

      const response = await apiClient.post('/users/login',
        {
          email,
          password,
        },
      );

      console.log(response);

      const user = response.data.data.user; // adjust this according to your backend response
      const token = response.data.data.accessToken;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', token); // optional: save token

      setCurrentUser(user);
      return user;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }

  };

  // Register function
  const register = async (name, email, password) => {
    console.log(name, email, password);
    try {
      setError(null);
      setLoading(true);

      const response = await apiClient.post('/users/register', {
        name,
        email,
        password,
      });

      const user = response.data.user;
      const token = response.data.token;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', token); // optional

      setCurrentUser(user);
      return user;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Update Profile
  const updateProfile = async (updatedData) => {
    // console.log(updatedData);
    try {
      setError(null);
      setLoading(true);

      const response = await apiClient.post(
        '/users/update-account',
        updatedData,
      );

      const updatedUser = response.data.user;

      // Update local storage and context
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

      return updatedUser;
    } catch (err) {
      const message = err.response?.data?.message || 'Update failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };


  // Logout function
  const logout = async () => {
    try {
      // Call backend logout API
      await apiClient.post('/users/logout', {}, {
        withCredentials: true // Send cookies (refreshToken)
      });

      // Remove all user data from localStorage
      localStorage.clear(); // optional, if no other app data is stored

      // Clear auth context
      setCurrentUser(null);

    } catch (error) {
      // Force refresh to recover from potential CORS/session errors
      window.location.reload();
      console.error("Logout failed:", error);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};