// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import FormInput from '../components/forms/FormInput';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };
  
  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email address is invalid');
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This would be replaced with your actual password reset API call
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Reset Password</h1>
        </div>
        
        {!isSubmitted ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            <p className="form-info">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            
            <FormInput
              type="email"
              name="email"
              placeholder="Email Address"
              icon={<FaEnvelope />}
              value={email}
              onChange={handleEmailChange}
              error={error}
            />
            
            <button 
              type="submit" 
              className="auth-submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
            
            <div className="auth-links">
              <Link to="/auth/login" className="back-link">
                <FaArrowLeft /> Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="success-message">
            <h2>Check Your Email</h2>
            <p>
              We've sent password reset instructions to:
              <strong> {email}</strong>
            </p>
            <p>
              Please check your inbox and follow the instructions to reset your password.
            </p>
            <Link to="/auth/login" className="auth-submit-btn">
              Return to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;