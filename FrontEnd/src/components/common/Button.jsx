// components/common/Button.jsx
import React from 'react';
import '../../assets/styles/components/common/_button.scss';
const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md',
  className = '', 
  disabled = false,
  block = false,
  icon = false,
  leftIcon = null,
  rightIcon = null
}) => {
  const baseClass = 'btn';
  const variantClass = variant ? `${baseClass}--${variant}` : '';
  const sizeClass = size ? `${baseClass}--${size}` : '';
  const blockClass = block ? `${baseClass}--block` : '';
  const iconClass = icon ? `${baseClass}--icon` : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${sizeClass} ${blockClass} ${iconClass} ${className}`}
      disabled={disabled}
    >
      {leftIcon && <span className={`${baseClass}__icon`}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={`${baseClass}__icon ${baseClass}__icon--right`}>{rightIcon}</span>}
    </button>
  );
};

export default Button;