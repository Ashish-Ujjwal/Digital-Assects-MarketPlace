// pages/ProductListPage.jsx
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import FilterSidebar from '../components/products/FilterSidebar';
import {
  FaSlidersH,
  FaChevronDown,
  FaTh,
  FaList,
  FaTimes,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

import { useProducts } from '../context/ProductContext';
import { motion } from 'framer-motion'; 
import '../assets/styles/pages/_product-list.scss';

const ProductListPage = () => {
  const { getFilteredProducts, loading, setFilters, setSortOption: updateSortInContext } = useProducts();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {
    const categoryId = searchParams.get('category');
    const search = searchParams.get('search');

    setFilters(prev => ({
      ...prev,
      categoryId: categoryId || prev.categoryId,
      search: search || prev.search
    }));
    
    // Scroll to top when filters change
    window.scrollTo(0, 0);
  }, [searchParams, setFilters]);

  const filteredProducts = getFilteredProducts();
  
  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the product list
    const productListElement = document.querySelector('.product-list');
    if (productListElement) {
      productListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const toggleMobileFilters = useCallback(() => {
    setShowMobileFilters(prevState => !prevState);
  }, []);

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption); // Update local state for the select input
    updateSortInContext(newSortOption); // Update the context's sort option
  };

  // When filter drawer is toggled, manage body overflow
  useEffect(() => {
    document.body.style.overflow = showMobileFilters ? 'hidden' : 'auto';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileFilters]);

  return (
    <div className="product-list">
      <motion.div 
        className="product-list__header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="product-list__header-title">Discover Our Products</h1>
        <p className="product-list__header-description">
          Explore our curated collection of high-quality products designed to enhance your lifestyle and meet all your needs.
        </p>
      </motion.div>

      <div className="product-list__controls">
        <div className="product-list__controls-results">
          <span className="product-list__controls-results-count">{filteredProducts.length}</span> products found
        </div>
        
        <div className="product-list__controls-actions">
          {/* Mobile filter button */}
          <button 
            className="product-list__filters-toggle"
            onClick={toggleMobileFilters}
            aria-label="Toggle filters"
          >
            <FaSlidersH />
            <span>Filters</span>
          </button>
          
          <div className="product-list__controls-sorting">
            <label className="product-list__controls-sorting-label" htmlFor="sort-select">Sort by:</label>
            <div className="product-list__controls-sorting-select-wrapper">
              <select 
                id="sort-select"
                className="product-list__controls-sorting-select" 
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="default">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          {/* Uncomment if you want to restore the view toggle buttons
          <div className="product-list__view-toggle" role="group" aria-label="View mode">
            <button 
              className={`product-list__view-toggle-button ${viewMode === 'grid' ? 'product-list__view-toggle-button--active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
            >
              <FaTh />
            </button>
            <button 
              className={`product-list__view-toggle-button ${viewMode === 'list' ? 'product-list__view-toggle-button--active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
            >
              <FaList />
            </button>
          </div>
          */}
        </div>
      </div>

      <div className="product-list__layout">
        {/* Desktop Filters */}
        <aside className="product-list__filters">
          <div className="product-list__filters-sticky">
            <h2 className="product-list__filters-title">Refine Results</h2>
            <FilterSidebar isMobile={false} />
          </div>
        </aside>

        {/* Mobile Filters Drawer - We'll use FilterSidebar component directly */}
        {showMobileFilters && (
          <div className="product-list__backdrop" onClick={toggleMobileFilters}></div>
        )}
        
        <motion.div 
          className={`product-list__filters--mobile ${showMobileFilters ? 'is-active' : ''}`}
          initial={{ x: '-100%' }}
          animate={{ x: showMobileFilters ? 0 : '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="product-list__filters-header">
            <h2 className="product-list__filters-title">Filters</h2>
            <button 
              className="product-list__filters-close"
              onClick={toggleMobileFilters}
              aria-label="Close filters"
            >
              <FaTimes />
            </button>
          </div>
          <div className="product-list__filters-content">
            <FilterSidebar isMobile={true} onClose={toggleMobileFilters} />
          </div>
        </motion.div>

        <div className="product-list__content">
          {loading ? (
            <div className="product-list__loading">
              <div className="product-list__loading-spinner"></div>
              <p>Loading amazing products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div 
              className={`product-list__grid ${viewMode === 'list' ? 'product-list__grid--list' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ProductGrid products={currentProducts} viewMode={viewMode} />
            </motion.div>
          ) : (
            <motion.div 
              className="product-list__empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="product-list__empty-icon">
                <FaSearch />
              </div>
              <h2 className="product-list__empty-title">No products found</h2>
              <p className="product-list__empty-message">
                We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
              </p>
              <button 
                className="product-list__empty-action" 
                onClick={() => {
                  setFilters({});
                  setCurrentPage(1);
                }}
              >
                Clear all filters
              </button>
            </motion.div>
          )}

          {filteredProducts.length > productsPerPage && (
            <div className="product-list__pagination">
              <button 
                className="product-list__pagination-button product-list__pagination-prev"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <FaChevronLeft />
              </button>
              
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                // Calculate page number based on current page (center current page when possible)
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = index + 1;
                } else if (currentPage <= 3) {
                  pageNum = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + index;
                } else {
                  pageNum = currentPage - 2 + index;
                }
                
                return (
                  <button
                    key={pageNum}
                    className={`product-list__pagination-button ${currentPage === pageNum ? 'product-list__pagination-button--active' : ''}`}
                    onClick={() => paginate(pageNum)}
                    aria-label={`Page ${pageNum}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                className="product-list__pagination-button product-list__pagination-next"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;