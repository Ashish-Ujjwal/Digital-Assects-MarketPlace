// components/products/ProductGrid.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import '../../assets/styles/components/products/_product-grid.scss';
import { MdGridOn, MdViewList, MdViewModule, MdViewComfy } from "react-icons/md";

const ProductGrid = ({ 
  products, 
  loading = false, 
  variant = 'default', 
  title,
  showActions = false,
  showLoadMore = false,
  onLoadMore = () => {},
  totalCount = 0,
  emptyMessage = 'No products found.',
  loadingMessage = 'Loading products...',
  allowLayoutToggle = false
}) => {
  const [currentVariant, setCurrentVariant] = useState(variant);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Track if all products are loaded
  const allLoaded = products && totalCount > 0 ? products.length >= totalCount : false;
  
  // Handler for loading more products
  const loadMoreHandler = () => {
    if (isLoadingMore || allLoaded) return;
    
    setIsLoadingMore(true);
    onLoadMore().finally(() => {
      setIsLoadingMore(false);
    });
  };
  
  // Reset current variant when prop changes
  useEffect(() => {
    setCurrentVariant(variant);
  }, [variant]);
  
  // Function to toggle layout
  const toggleLayout = (newVariant) => {
    setCurrentVariant(newVariant);
  };
  
  // Render loading skeleton
  if (loading) {
    return (
      <div className="product-grid__skeleton">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="product-grid__skeleton-item">
            <div className="product-grid__skeleton-item-image"></div>
            <div className="product-grid__skeleton-item-content">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Render empty state
  if (!products || products.length === 0) {
    return (
      <div className="product-grid__empty">
        <h3>No products found</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }
  
  // Determine the CSS class based on the current variant
  const gridClassName = `product-grid product-grid--${currentVariant}`;
  
  return (
    <div className="product-grid-container">
      {(title || showActions || allowLayoutToggle) && (
        <div className="product-grid__header">
          {title && (
            <h2 className="product-grid__header-title">{title}</h2>
          )}
          
          <div className="product-grid__header-actions">
            {showActions && (
              <>
                <button className="btn-filter">
                  <MdViewModule size={18} />
                  Filter
                </button>
                <button className="btn-sort">
                  <MdViewComfy size={18} />
                  Sort
                </button>
              </>
            )}
            
            {allowLayoutToggle && (
              <div className="product-grid-container__layout-toggle">
                <button 
                  className={currentVariant !== 'list' ? 'active' : ''}
                  onClick={() => toggleLayout('default')}
                  aria-label="Grid view"
                >
                  <MdGridOn size={18} />
                </button>
                <button 
                  className={currentVariant === 'list' ? 'active' : ''}
                  onClick={() => toggleLayout('list')}
                  aria-label="List view"
                >
                  <MdViewList size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className={gridClassName}>
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="product-grid__item" 
            style={{"--item-index": index}}
          >
            <ProductCard product={product} variant={currentVariant} />
          </div>
        ))}
      </div>
      
      {showLoadMore && products.length > 0 && !allLoaded && (
        <div className="product-grid__load-more">
          <button 
            onClick={loadMoreHandler} 
            disabled={isLoadingMore || allLoaded}
            className={isLoadingMore ? 'loading' : ''}
          >
            {isLoadingMore ? '' : allLoaded ? 'All Products Loaded' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;