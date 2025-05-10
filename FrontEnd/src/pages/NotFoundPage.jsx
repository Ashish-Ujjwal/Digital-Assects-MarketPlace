import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <FaExclamationTriangle className="not-found-icon" />
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          Oops! The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-button home-button">
            <FaHome className="button-icon" />
            Back to Home
          </Link>
          <button onClick={() => window.history.back()} className="not-found-button back-button">
            <FaArrowLeft className="button-icon" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;