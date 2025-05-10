// pages/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaArrowLeft, FaTrashAlt} from 'react-icons/fa';
import '../assets/styles/pages/_cart.scss';

const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  return (
    <div className="cart-page">
      <div className="cart-page__header-container">
        <h1 className="cart-page__header">Your Shopping Cart</h1>
        <div className="cart-page__header-count">
          {cartItems.length > 0 && (
            <span>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
          )}
        </div>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="cart-page__empty">
          <div className="cart-page__empty-icon">
            <FaShoppingCart />
          </div>
          <h2 className="cart-page__empty-text">Your cart is empty</h2>
          <p className="cart-page__empty-message">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products" className="cart-page__empty-action">
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-page__actions">
            <Link to="/products" className="cart-page__back-link">
              <FaArrowLeft /> Continue Shopping
            </Link>
            <button 
              onClick={handleClearCart} 
              className="cart-page__clear-btn"
            >
              <FaTrashAlt /> Clear Cart
            </button>
          </div>
        
          <div className="cart-page__content">
            <div className="cart-page__items">
              <div className="cart-page__table-container">
                <table className="cart-page__table">
                  <thead>
                      <th>Product</th>
                  </thead>
                  <tbody>
                    {cartItems.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="cart-page__mobile-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-page__mobile-item">
                    <CartItem item={item} isMobile={true} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="cart-page__summary">
              <CartSummary />
            </div>
          </div>
          
          {cartItems.length > 0 && (
            <div className="cart-page__recommendations">
              <h3 className="cart-page__recommendations-title">You might also like</h3>
              <div className="cart-page__recommendations-grid">
                {/* Recommendation items would go here */}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;