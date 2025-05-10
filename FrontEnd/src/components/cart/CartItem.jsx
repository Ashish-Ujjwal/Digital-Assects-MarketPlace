// components/cart/CartItem.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { FiMinus, FiPlus, FiTrash2} from 'react-icons/fi';
import '../../assets/styles/components/cart/_cart-item.scss';

const CartItem = ({ item, simple = false }) => {
  const { updateCartItemQuantity, removeFromCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) {
      updateCartItemQuantity(item.id, newQuantity);
    }
  };
  
  const handleIncrement = () => {
    updateCartItemQuantity(item.id, item.quantity + 1);
  };
  
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateCartItemQuantity(item.id, item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(item.id);
  };

  // Calculate discount percentage if original price exists
  const discountPercentage = item.originalPrice 
    ? Math.round((1 - (item.price / item.originalPrice)) * 100) 
    : null;
  
  return (
    <div 
      className={`cart-item ${simple ? 'cart-item--simple' : ''} ${isHovered ? 'cart-item--hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="cart-item__image-container">
        <Link to={`/products/${item.id}`} className="cart-item__image-link">
          <div className="cart-item__image">
            <img src={item.images[0]} alt={item.name} />
          </div>
        </Link>
        
        {discountPercentage && (
          <div className="cart-item__discount-badge">
            -{discountPercentage}%
          </div>
        )}
      </div>
      
      <div className="cart-item__content">
        <div className="cart-item__header">
          <h3 className="cart-item__title">
            <Link to={`/products/${item.id}`}>{item.name}</Link>
          </h3>
          
          {!simple && (
            <button 
              className="cart-item__remove-button" 
              onClick={handleRemove}
              aria-label="Remove item"
            >
              <FiTrash2 />
            </button>
          )}
        </div>
        
        <div className="cart-item__details">
          {item.variant && (
            <div className="cart-item__variant">
              <span className="cart-item__detail-label">Variant:</span> {item.variant}
            </div>
          )}
          
          {item.author && (
            <div className="cart-item__author">
              {item.author.avatar && (
                <img 
                  src={item.author.avatar} 
                  alt={item.author.name} 
                  className="cart-item__author-avatar" 
                />
              )}
              <span>{item.author.name}</span>
            </div>
          )}
          
          {item.licenseType && (
            <div className="cart-item__license">
              {item.licenseType}
            </div>
          )}
        </div>
        
        <div className="cart-item__bottom">
          <div className="cart-item__price">
            <div className="cart-item__price-current">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            {item.originalPrice && (
              <div className="cart-item__price-original">
                ${(item.originalPrice * item.quantity).toFixed(2)}
              </div>
            )}
          </div>
          
          {!simple && (
            <div className="cart-item__quantity-controls">
              <button 
                type="button" 
                className="cart-item__quantity-button"
                onClick={handleDecrement}
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
              >
                <FiMinus size={14} />
              </button>
              
              <input
                type="number"
                className="cart-item__quantity-input"
                value={item.quantity}
                onChange={handleQuantityChange}
                min="1"
                aria-label="Item quantity"
              />
              
              <button 
                type="button" 
                className="cart-item__quantity-button"
                onClick={handleIncrement}
                aria-label="Increase quantity"
              >
                <FiPlus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;