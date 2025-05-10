// src/components/forms/AuthForm.jsx
import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import FormInput from './FormInput';
import { useAuth } from '../../context/AuthContext';

const AuthForm = ({ formType }) => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: formType === 'signup' ? '' : undefined,
    confirmPassword: formType === 'signup' ? '' : undefined
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Username validation for signup
    if (formType === 'signup' && !formData.username) {
      newErrors.username = 'Username is required';
    }
    
    // Confirm password validation for signup
    if (formType === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (formType === 'login') {
        await login(formData.email, formData.password);
        navigate('/account');
      } else {
        await register(formData.username, formData.email, formData.password);
        navigate('/account');
      }
    } catch (error) {
      setErrors({
        form: error.message || 'Authentication failed. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {errors.form && <div className="form-error">{errors.form}</div>}
      
      {formType === 'signup' && (
        <FormInput
          type="text"
          name="username"
          placeholder="Username"
          icon={<FaUser />}
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />
      )}
      
      <FormInput
        type="email"
        name="email"
        placeholder="Email Address"
        icon={<FaEnvelope />}
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      
      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        icon={<FaLock />}
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      
      {formType === 'signup' && (
        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          icon={<FaLock />}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
      )}
      
      {formType === 'login' && (
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      )}
      
      <button 
        type="submit" 
        className="auth-submit-btn" 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          'Processing...'
        ) : formType === 'login' ? (
          <>
            <FaSignInAlt /> Login
          </>
        ) : (
          <>
            <FaUserPlus /> Create Account
          </>
        )}
      </button>
      
      <div className="social-login">
        <div className="divider">
          <span>OR</span>
        </div>
        <div className="social-buttons">
          <button type="button" className="social-btn google">
            Continue with Google
          </button>
          <button type="button" className="social-btn facebook">
            Continue with Facebook
          </button>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;