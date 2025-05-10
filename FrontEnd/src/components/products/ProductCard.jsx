// components/products/ProductCard.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { 
  FaHeart, 
  FaBalanceScale, 
  FaStar, 
  FaComment, 
  FaShoppingCart, 
  FaEye 
} from "react-icons/fa";
import '../../assets/styles/components/products/_product-card.scss';

const ProductCard = ({ product, variant ='default' }) => {
  const { addToCart } = useCart();
  const navigate= useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    navigate(`/products/${product.id}?preview=true`);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const calculateDiscountPercentage = () => {
    if (product.originalPrice && product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };
  const shouldShowDescription = variant !== 'compact' && variant !== 'list';
  
  // In list view, show a different button layout
  const isListView = variant === 'list';
  

  return (
    <div className={`product-card product-card--${variant}`}>
      <div className="product-card__image-container">
      <img 
        src={product.images && product.images.length > 0 ? product.images[0] : ''} 
        alt={product.name} 
        className="product-card__image"
      />
        <div className="product-card__image-overlay">
          <button 
            className="product-card__preview"
            onClick={handlePreview}
          >
            <FaEye /> Preview
          </button>
        </div>
      </div>
      
      {/* Badges */}
      <div className="product-card__badges">
        {product.featured && (
          <span className="product-card__badge product-card__badge--featured">
            Featured
          </span>
        )}
        {product.isNew && (
          <span className="product-card__badge product-card__badge--new">
            New
          </span>
        )}
        {product.onSale && (
          <span className="product-card__badge product-card__badge--sale">
            {calculateDiscountPercentage()}% OFF
          </span>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="product-card__actions">
        <button 
          className={`action-button ${isLiked ? 'action-button--liked' : ''}`}
          onClick={handleLike}
        >
          <FaHeart className="icon-heart" />
        </button>
        <button className="action-button">
          <FaBalanceScale className="icon-compare" />
        </button>
      </div>
      
      <div className="product-card__content">
        {product.author && (
          <div className="product-card__author">
            <img
              src={product.author.avatar}
              alt={product.author.name}
              className="product-card__author-avatar"
            />
            <Link 
              to={`/author/${product.author.id}`} 
              className="product-card__author-name"
            >
              {product.author.name}
            </Link>
          </div>
        )}
        
        <h3 className="product-card__title">
          <Link to={`/products/${product._id}`}>{product.name}</Link>
        </h3>
        
        {product.category && (
          <div className="product-card__category">{product.category}</div>
        )}
        
        {shouldShowDescription && product.description && (
        <p className="product-card__description">{product.description}</p>
      )}
        
        <div className="product-card__meta">
          <div className="product-card__stats">
            <div className="product-card__stats-item product-card__stats-rating">
              <FaStar className="icon-star" />
              <span>{product.rating}</span>
            </div>
            <div className="product-card__stats-item product-card__stats-reviews">
              <FaComment className="icon-review" />
              <span>{product.reviewCount}</span>
            </div>
          </div>
          
          <div className="product-card__price">
            <span className="product-card__price-current">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="product-card__price-original">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Conditional button rendering */}
      <div className="product-card__footer">
        {isListView ? (
          <div className="product-card__list-actions">
            <button 
              className="product-card__button" 
              onClick={handleAddToCart}
            >
              <FaShoppingCart />
              Add
            </button>
          </div>
        ) : (
          <button 
            className="product-card__button" 
            onClick={handleAddToCart}
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;