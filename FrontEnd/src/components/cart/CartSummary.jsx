// components/cart/CartSummary.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';
import '../../assets/styles/components/cart/_cart-summary.scss';

const CartSummary = () => {
  const { cartItems } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const discount = discountApplied ? subtotal * 0.15 : 0; // 15% discount if code applied
  const total = subtotal + tax - discount;

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
    // Reset discount when code changes
    if (discountApplied) {
      setDiscountApplied(false);
    }
  };

  const applyPromoCode = () => {
    if (!promoCode.trim()) return;
    
    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Applying promo code:', promoCode);
      setDiscountApplied(true);
      setIsApplying(false);
    }, 800);
  };

  return (
    <div className="cart-summary">
      <div className="cart-summary__header">
        <h2 className="cart-summary__title">Order Summary</h2>
      </div>
      
      <div className="cart-summary__content">
        {cartItems.length > 0 ? (
          <>
            <div className="cart-summary__totals">
              <div className="cart-summary__row">
                <span className="cart-summary__label">Subtotal</span>
                <span className="cart-summary__value">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="cart-summary__row">
                <span className="cart-summary__label">Tax (10%)</span>
                <span className="cart-summary__value">${tax.toFixed(2)}</span>
              </div>
              
              {discountApplied && (
                <div className="cart-summary__row cart-summary__row--discount">
                  <span className="cart-summary__label">Discount (15%)</span>
                  <span className="cart-summary__value">-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="cart-summary__divider"></div>
              
              <div className="cart-summary__row cart-summary__row--total">
                <span className="cart-summary__label">Total</span>
                <span className="cart-summary__value cart-summary__total-value">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="cart-summary__promo">
              <label className="cart-summary__promo-label" htmlFor="promoCode">Promo Code</label>
              <div className="cart-summary__promo-input">
                <input 
                  id="promoCode"
                  type="text" 
                  placeholder="Enter code" 
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                  disabled={isApplying || discountApplied}
                />
                <Button 
                  onClick={applyPromoCode} 
                  disabled={isApplying || discountApplied || !promoCode.trim()} 
                  className={`cart-summary__promo-button ${isApplying ? 'cart-summary__promo-button--loading' : ''}`}
                >
                  {isApplying ? 'Applying...' : discountApplied ? 'Applied' : 'Apply'}
                </Button>
              </div>
              {discountApplied && (
                <div className="cart-summary__promo-success">
                  Code "{promoCode}" applied successfully!
                </div>
              )}
            </div>
            
            <div className="cart-summary__checkout">
              <Link to="/checkout" className="cart-summary__checkout-link">
                <Button className="cart-summary__checkout-button">
                  Proceed to Checkout
                </Button>
              </Link>
              <div className="cart-summary__secure-checkout">
                <span className="cart-summary__secure-icon">🔒</span> Secure checkout
              </div>
            </div>
          </>
        ) : (
          <div className="cart-summary__empty">
            <p>Your cart is empty</p>
            <Link to="/products" className="cart-summary__continue-shopping">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSummary;