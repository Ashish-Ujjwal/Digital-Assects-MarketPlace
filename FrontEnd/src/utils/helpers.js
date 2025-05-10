// utils/helpers.js
// Utility functions for formatting and validation

// Format price with currency symbol
export const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };
  
  // Truncate text with ellipsis
  export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };
  
  // Validate email format
  export const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  // Format date to readable string
  export const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Generate a random ID (for new items)
  export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  }; 
