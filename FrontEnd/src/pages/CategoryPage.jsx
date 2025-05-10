import React from 'react';
import '../assets/styles/pages/_categories.scss';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import {
  FaLayerGroup,
  FaThLarge,
  FaFont,
  FaSquare,
  FaDesktop,
  FaShareAlt,
  FaVideo,
  FaImage,
  FaBox
} from 'react-icons/fa';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { categories, loading, error } = useProducts();
 
  // Icon mapping for different category types using Font Awesome icons
  const categoryIcons = {
    'ui-kits': FaLayerGroup,
    'icons': FaThLarge,
    'fonts': FaFont,
    'textures': FaSquare,
    'presentations': FaDesktop,
    'social-media': FaShareAlt,
    'motion-graphics': FaVideo,
    'illustrations': FaImage,
    // Add fallback for any new categories
    'default': FaBox
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName}`);
  };

  if (loading) {
    return <div className="loading-state">Loading categories...</div>;
  }

  if (error) {
    return <div className="error-message">Failed to load categories. Please try again later.</div>;
  }

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>Browse Categories</h1>
        <p>Discover premium digital assets for your creative projects</p>
      </div>
      <div className="categories-grid">
        {categories.map((category, index) => {
          const categoryName = category.name.toLowerCase().replace(/ /g, '-');
          const IconComponent = categoryIcons[categoryName] || categoryIcons.default;
         
          return (
            <div
              key={category.id}
              className={`category-banner category-${index % 4}`}
              onClick={() => handleCategoryClick(categoryName)}
            >
              <div className="category-content">
                <div className="category-icon">
                  <IconComponent />
                </div>
                <div className="category-info">
                  <h2>{category.name}</h2>
                  <p>{category.description || `Explore our collection of ${category.name}`}</p>
                  {category.count !== undefined && (
                    <span className="category-count">{category.count} products</span>
                  )}
                </div>
              </div>
              <div className="category-overlay"></div>
              <button
                className="category-button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent div's onClick
                  handleCategoryClick(categoryName);
                }}
              >
                Explore {category.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesPage;