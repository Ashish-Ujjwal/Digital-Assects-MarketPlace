// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import {FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import AuthForm from '../components/forms/AuthForm';

const AuthPage = ({ mode = 'login' }) => {
  const [activeTab, setActiveTab] = useState(mode);
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            <FaSignInAlt /> Login
          </button>
          <button 
            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            <FaUserPlus /> Sign Up
          </button>
        </div>
        
        <div className="auth-content">
          {activeTab === 'login' ? (
            <AuthForm formType="login" />
          ) : (
            <AuthForm formType="signup" />
          )}
        </div>
        
        <div className="auth-footer">
          {activeTab === 'login' ? (
            <p>Don't have an account? <span className="auth-link" onClick={() => setActiveTab('signup')}>Sign up</span></p>
          ) : (
            <p>Already have an account? <span className="auth-link" onClick={() => setActiveTab('login')}>Login</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;