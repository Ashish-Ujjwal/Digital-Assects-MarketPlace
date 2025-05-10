import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import "../../assets/styles/components/search/_search-bar.scss";

const SearchBar = ({ variant = 'default', suggestions = [] }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Get search bar class based on variant
  const searchBarClass = `search-bar search-bar--${variant}`;

  // Load recent searches from localStorage
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input on mount for large variant
  useEffect(() => {
    if (variant === 'large' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [variant]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Save to recent searches
      const newRecentSearches = [
        query.trim(),
        ...recentSearches.filter(item => item !== query.trim())
      ].slice(0, 5); // Keep only 5 most recent
      
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      
      // Navigate to search results
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (text) => {
    setQuery(text);
    navigate(`/products?search=${encodeURIComponent(text)}`);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current.focus();
  };

  // Combined suggestions plus recent searches
  const allSuggestions = [...suggestions];
  
  // Add recent searches if no query or if they match the current query
  if (query.length === 0 || recentSearches.some(s => s.toLowerCase().includes(query.toLowerCase()))) {
    const matchingRecentSearches = query.length === 0 
      ? recentSearches 
      : recentSearches.filter(s => s.toLowerCase().includes(query.toLowerCase()));
    
    matchingRecentSearches.forEach(search => {
      if (!allSuggestions.some(s => typeof s === 'object' ? s.text === search : s === search)) {
        allSuggestions.push({ text: search, isRecent: true });
      }
    });
  }

  return (
    <form ref={searchRef} onSubmit={handleSubmit} className={searchBarClass}>
      <FaSearch className="search-bar__icon" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(e.target.value.length > 0 || recentSearches.length > 0);
        }}
        onFocus={() => {
          setShowSuggestions(query.length > 0 || recentSearches.length > 0);
        }}
        placeholder="Search for digital assets..."
        className="search-bar__input"
        aria-label="Search products"
      />
      
      {query && (
        <button 
          type="button" 
          className="search-bar__clear" 
          onClick={clearSearch}
          aria-label="Clear search"
        >
          <IoClose />
        </button>
      )}
      
      <button type="submit" className="search-bar__submit" aria-label="Submit search">
        Search
      </button>
      
      {showSuggestions && allSuggestions.length > 0 && (
        <div className="search-bar__suggestions">
          {recentSearches.length > 0 && query.length === 0 && (
            <div className="search-bar__suggestions-header">
              <span>Recent Searches</span>
              <button 
                className="search-bar__suggestions-clear"
                onClick={() => {
                  setRecentSearches([]);
                  localStorage.removeItem('recentSearches');
                }}
              >
                Clear
              </button>
            </div>
          )}
          
          {allSuggestions.map((suggestion, index) => {
            const text = typeof suggestion === 'string' ? suggestion : suggestion.text;
            const category = typeof suggestion === 'object' ? suggestion.category : null;
            const isRecent = typeof suggestion === 'object' && suggestion.isRecent;
            
            return (
              <div 
                key={index} 
                className={`search-bar__suggestions-item ${isRecent ? 'search-bar__suggestions-item--recent' : ''}`}
                onClick={() => handleSuggestionClick(text)}
              >
                {isRecent && <span className="search-bar__suggestions-icon">⏱</span>}
                <span className="search-bar__suggestions-text">{text}</span>
                {category && (
                  <span className="search-bar__suggestions-category">
                    {category}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default SearchBar;