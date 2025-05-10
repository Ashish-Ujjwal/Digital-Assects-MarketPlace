import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import { FaChevronDown, FaChevronUp, FaCheckSquare, FaRegSquare } from "react-icons/fa";
import '../../assets/styles/components/products/_filter-sidebar.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const FilterSidebar = ({ isMobile, onClose }) => {
  const { categories, setFilters, filters, priceRanges } = useProducts();
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    priceRange: true
  });
  
  const location = useLocation();
  const navigate = useNavigate();

  // Read URL parameters on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    const priceRangeParam = searchParams.get('priceRange');
    
    // Only update filters if URL parameters exist and are different from current filters
    const shouldUpdateFilters = 
      (categoryParam !== null && categoryParam !== filters.category) || 
      (priceRangeParam !== null && priceRangeParam !== filters.priceRange);
    
    if (shouldUpdateFilters) {
      setFilters(prev => ({
        ...prev,
        category: categoryParam || prev.category,
        priceRange: priceRangeParam || prev.priceRange
      }));
    }
  }, [location.search, setFilters]);

  // Update URL when filters change
  useEffect(() => {
    const searchParams = new URLSearchParams();
    
    if (filters.category) {
      searchParams.set('category', filters.category);
    }
    
    if (filters.priceRange) {
      searchParams.set('priceRange', filters.priceRange);
    }
    
    const newUrl = searchParams.toString() 
      ? `${location.pathname}?${searchParams.toString()}`
      : location.pathname;
    
    // Use replace to avoid adding to browser history stack for filter changes
    navigate(newUrl, { replace: true });
  }, [filters, navigate, location.pathname]);

  const handleCategoryChange = (categoryName) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === categoryName ? null : categoryName
    }));
  };

  const handlePriceRangeChange = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRange: range
    }));
  };

  const handleClearFilters = () => {
    setFilters(prev => ({
      ...prev,
      category: null,
      priceRange: null
    }));
    
    // Close mobile filters when clearing
    if (isMobile && onClose) {
      onClose();
    }
  };
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleApplyFilters = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const hasActiveFilters = filters.category !== null || filters.priceRange !== null;

  return (
    <div className="filter-sidebar__content">
      {hasActiveFilters && (
        <button
          className="filter-sidebar__header-clear"
          onClick={handleClearFilters}
          aria-label="Clear all filters"
        >
          Clear all filters
        </button>
      )}
     
      <div className="filter-sidebar__section">
        <button 
          className="filter-sidebar__section-title"
          onClick={() => toggleSection('categories')}
          aria-expanded={expandedSections.categories}
          aria-controls="category-section"
        >
          <span>Categories</span>
          {expandedSections.categories 
            ? <FaChevronUp size={16} className="filter-sidebar__section-icon" /> 
            : <FaChevronDown size={16} className="filter-sidebar__section-icon" />
          }
        </button>
        
        {expandedSections.categories && (
          <div id="category-section" className="filter-sidebar__checkbox-list">
            {categories.map(category => {
              const categoryValue = category.name.toLowerCase().replace(/ /g, '-');
              return (
                <div key={category.id} className="filter-sidebar__checkbox-list-item">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={filters.category === categoryValue}
                    onChange={() => handleCategoryChange(categoryValue)}
                    className="filter-sidebar__checkbox-input"
                  />
                  <label 
                    htmlFor={`category-${category.id}`}
                    className={`filter-sidebar__checkbox-label ${filters.category === categoryValue ? 'is-active' : ''}`}
                  >
                    {filters.category === categoryValue 
                      ? <FaCheckSquare size={16} className="filter-sidebar__checkbox-icon" /> 
                      : <FaRegSquare size={16} className="filter-sidebar__checkbox-icon" />
                    }
                    <span className="filter-sidebar__checkbox-text">{category.name}</span>
                    <span className="filter-sidebar__checkbox-list-item-count">
                      {category.count || 0}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        )}
      </div>
   
      <div className="filter-sidebar__section">
        <button 
          className="filter-sidebar__section-title"
          onClick={() => toggleSection('priceRange')}
          aria-expanded={expandedSections.priceRange}
          aria-controls="price-section"
        >
          <span>Price Range</span>
          {expandedSections.priceRange 
            ? <FaChevronUp size={16} className="filter-sidebar__section-icon" /> 
            : <FaChevronDown size={16} className="filter-sidebar__section-icon" />
          }
        </button>
        
        {expandedSections.priceRange && (
          <div id="price-section" className="filter-sidebar__radio-list">
            {priceRanges.map((range, index) => (
              <div key={index} className="filter-sidebar__radio-list-item">
                <input
                  type="radio"
                  id={`price-range-${index}`}
                  name="priceRange"
                  checked={filters.priceRange === range.value}
                  onChange={() => handlePriceRangeChange(range.value)}
                  className="filter-sidebar__radio-input"
                />
                <label 
                  htmlFor={`price-range-${index}`}
                  className={`filter-sidebar__radio-label ${filters.priceRange === range.value ? 'is-active' : ''}`}
                >
                  {range.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isMobile && (
        <div className="filter-sidebar__buttons">
          <button 
            className="filter-sidebar__cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="filter-sidebar__apply-button"
            onClick={handleApplyFilters}
          >
            Apply Filters
            {hasActiveFilters && (
              <span className="filter-sidebar__apply-badge"></span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;