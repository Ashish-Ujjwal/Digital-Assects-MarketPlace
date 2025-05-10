import React, { useState } from 'react';
import '../../assets/styles/components/common/_input.scss';

const Input = ({ 
  type = 'text', 
  label, 
  name, 
  value, 
  onChange, 
  placeholder = '', 
  required = false, 
  error = '', 
  helperText = '',
  size = 'md',
  success = false,
  prefix = null,
  suffix = null,
  icon = null,
  disabled = false,
  autoFocus = false,
  className = '',
  onFocus = () => {},
  onBlur = () => {},
  maxLength,
  showCharCount = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(value?.length || 0);
  
  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur(e);
  };
  
  const handleChange = (e) => {
    if (showCharCount) {
      setCharCount(e.target.value.length);
    }
    onChange(e);
  };

  const controlClasses = [
    'form-control',
    `form-control--${size}`,
    error ? 'form-control--error' : '',
    success ? 'form-control--success' : '',
    disabled ? 'form-control--disabled' : '',
    isFocused ? 'form-control--focused' : '',
    icon ? 'form-control--with-icon' : '',
    className
  ].filter(Boolean).join(' ');

  const formGroupClasses = [
    'form-group',
    isFocused ? 'form-group--focused' : '',
    error ? 'form-group--error' : '',
    success ? 'form-group--success' : '',
    disabled ? 'form-group--disabled' : ''
  ].filter(Boolean).join(' ');

  const renderInput = () => (
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      autoFocus={autoFocus}
      maxLength={maxLength}
      className={controlClasses}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
    />
  );

  // Input with prefix, suffix, or icon
  if (prefix || suffix || icon) {
    return (
      <div className={formGroupClasses}>
        {label && (
          <label className="form-label" htmlFor={name}>
            {label}
            {required && <span className="form-label__required">*</span>}
          </label>
        )}
        <div className={`input-wrapper ${isFocused ? 'input-wrapper--focused' : ''}`}>
          <div className="input-group">
            {prefix && <div className="input-group__prefix">{prefix}</div>}
            {renderInput()}
            {suffix && <div className="input-group__suffix">{suffix}</div>}
            {icon && <div className="input-group__icon">{icon}</div>}
          </div>
          {showCharCount && maxLength && (
            <div className="char-count">
              <span className={charCount >= maxLength ? 'char-count--limit' : ''}>
                {charCount}/{maxLength}
              </span>
            </div>
          )}
        </div>
        {error && <span className="form-text form-text--error" id={`${name}-error`}>{error}</span>}
        {helperText && !error && <span className="form-text" id={`${name}-helper`}>{helperText}</span>}
      </div>
    );
  }

  // Standard input without prefix/suffix
  return (
    <div className={formGroupClasses}>
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
          {required && <span className="form-label__required">*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {renderInput()}
        {showCharCount && maxLength && (
          <div className="char-count">
            <span className={charCount >= maxLength ? 'char-count--limit' : ''}>
              {charCount}/{maxLength}
            </span>
          </div>
        )}
      </div>
      {error && <span className="form-text form-text--error" id={`${name}-error`}>{error}</span>}
      {helperText && !error && <span className="form-text" id={`${name}-helper`}>{helperText}</span>}
    </div>
  );
};

export default Input;