// src/components/forms/FormInput.jsx
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormInput = ({ 
  type, 
  name, 
  placeholder, 
  icon, 
  value, 
  onChange, 
  error 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className={`form-group ${error ? 'has-error' : ''}`}>
      <div className="input-wrapper">
        <span className="input-icon">
          {icon}
        </span>
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="form-input"
        />
        {type === 'password' && (
          <button 
            type="button" 
            className="password-toggle" 
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FormInput;