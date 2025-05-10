// src/components/routes/PublicOnlyRoute.jsx (for routes like login that should redirect if user is already logged in)
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PublicOnlyRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }
  
  // If user is logged in, redirect to referred page or dashboard
  if (currentUser) {
    const from = location.state?.from?.pathname || '/account';
    return <Navigate to={from} replace />;
  }
  
  return children;
};

export default PublicOnlyRoute;