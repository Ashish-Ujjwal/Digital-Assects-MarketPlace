import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../utils/api';
import apiClient from '../api/axiosInstance';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: null,
    priceRange: null,
    search: '',
    sortBy: 'default'
  });

  const priceRanges = [
    { label: 'All Prices', value: null },
    { label: 'Under $10', value: 'under10' },
    { label: '$10 - $50', value: '10-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: 'Over $100', value: 'over100' }
  ];

  // console.log("Product :", products);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ]);
        setProducts(productsData);
        
        
        const categoriesWithCount = categoriesData.map(category => {
          const categoryName = category.name.toLowerCase().replace(/ /g, '-');
          const count = productsData.filter(product => product.category === categoryName).length;
          return { ...category, count };
        });
        
        setCategories(categoriesWithCount);
        setError(null);
      } catch (err) {
        setError('Failed to load products data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const getFilteredProducts = () => {
    let filtered = products.filter(product => {
      // Filter by category
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Filter by price range
      if (filters.priceRange) {
        switch (filters.priceRange) {
          case 'under10':
            if (product.price >= 10) return false;
            break;
          case '10-50':
            if (product.price < 10 || product.price > 50) return false;
            break;
          case '50-100':
            if (product.price < 50 || product.price > 100) return false;
            break;
          case 'over100':
            if (product.price <= 100) return false;
            break;
          default:
            break;
        }
      }

      // Filter by search query
      if (filters.search) {
        const searchQuery = filters.search.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(searchQuery);
        const descMatch = product.description.toLowerCase().includes(searchQuery);
        const authorMatch = product.author && product.author.name.toLowerCase().includes(searchQuery);
        
        if (!nameMatch && !descMatch && !authorMatch) {
          return false;
        }
      }

      return true;
    });

    // Sort the filtered products
    if (filters.sortBy) {
      switch(filters.sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'rating-desc':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
          break;
        default:
          // Default can show featured items first
          filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
          break;
      }
    }

    return filtered;
  };

  const getProductById = async(id) => {
    // return products.find(product => product._id === id) || null;
    try {
      const response = await apiClient.get(`/uikit/${id}`);
      // console.log(`single uikit: `, response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching product by ID:', error.message);
      return null;
    }
  };

  // Get related products based on category and tags
  const getRelatedProducts = (productId, limit = 4) => {
    const product = getProductById(productId);
    if (!product) return [];
    
    // Find products with the same category or matching tags
    const related = products
      .filter(p => p._id !== productId && (
        p.category === product.category || 
        (p.tags && product.tags && p.tags.some(tag => product.tags.includes(tag)))
      ));
    
    // Sort by relevance (number of matching tags)
    if (product.tags) {
      related.sort((a, b) => {
        const aMatches = a.tags ? a.tags.filter(tag => product.tags.includes(tag)).length : 0;
        const bMatches = b.tags ? b.tags.filter(tag => product.tags.includes(tag)).length : 0;
        return bMatches - aMatches;
      });
    }
    
    return related.slice(0, limit);
  };

  // Clear all active filters
  const clearFilters = () => {
    setFilters({
      category: null,
      priceRange: null,
      search: '',
      sortBy: 'default'
    });
  };

  // Update sort option
  const setSortOption = (sortOption) => {
    setFilters(prev => ({
      ...prev,
      sortBy: sortOption
    }));
  };

  return (
    <ProductContext.Provider value={{
      products,
      categories,
      loading,
      error,
      filters,
      setFilters,
      getFilteredProducts,
      getProductById,
      getRelatedProducts,
      priceRanges,
      clearFilters,
      setSortOption
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;