import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useCart } from '../context/CartContext';
import { FiUser, FiMail, FiMapPin, FiCreditCard, FiLock, FiCheckCircle, FiShoppingCart, FiPackage, FiShield } from 'react-icons/fi';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
    
    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!formData.cardName) newErrors.cardName = 'Name on card is required';
    
    if (!formData.cardExpiry) {
      newErrors.cardExpiry = 'Card expiry is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = 'Format must be MM/YY';
    }
    
    if (!formData.cardCvv) {
      newErrors.cardCvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cardCvv)) {
      newErrors.cardCvv = 'CVV must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value) => {
    // Format card number with spaces after every 4 digits
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formattedValue
    }));
    
    // Clear error when user starts typing
    if (errors.cardNumber) {
      setErrors(prev => ({
        ...prev,
        cardNumber: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Process successful order
        clearCart();
        navigate('/confirmation', { 
          state: { 
            orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
            orderDate: new Date().toISOString()
          } 
        });
      } catch (error) {
        console.error('Error processing order:', error);
        alert('There was an error processing your order. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  return (
    <div className="checkout-page">
      <h1 className="checkout-page__header">Checkout</h1>
      
      <div className="checkout-page__breadcrumbs">
        <span className="checkout-page__breadcrumbs-item">Home</span>
        <span className="checkout-page__breadcrumbs-item">Cart</span>
        <span className="checkout-page__breadcrumbs-item checkout-page__breadcrumbs-item--active">Checkout</span>
      </div>
      
      <div className="checkout-page__steps">
        <div className="checkout-page__step">
          <div className="checkout-page__step-icon checkout-page__step-icon--completed">
            <FiCheckCircle />
          </div>
          <div className="checkout-page__step-label checkout-page__step-label--completed">Cart</div>
        </div>
        <div className="checkout-page__step">
          <div className="checkout-page__step-icon checkout-page__step-icon--active">
            <FiCreditCard />
          </div>
          <div className="checkout-page__step-label checkout-page__step-label--active">Checkout</div>
        </div>
        <div className="checkout-page__step">
          <div className="checkout-page__step-icon">
            <FiPackage />
          </div>
          <div className="checkout-page__step-label">Confirmation</div>
        </div>
      </div>
      
      <div className="checkout-page__content">
        <div className="checkout-page__main">
          <form onSubmit={handleSubmit}>
            <div className="checkout-page__section">
              <div className="checkout-page__section-header">
                <h2 className="checkout-page__section-header-title">
                  Contact Information
                </h2>
              </div>
              
              <div className="checkout-page__form-row">
                <div className="checkout-page__form-group">
                  <label className="checkout-page__label" htmlFor="firstName">First Name</label>
                  <Input 
                    id="firstName"
                    className="checkout-page__input"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    prefix={<FiUser />}
                    error={errors.firstName}
                  />
                  {errors.firstName && <div className="checkout-page__help-text">{errors.firstName}</div>}
                </div>
                
                <div className="checkout-page__form-group">
                  <label className="checkout-page__label" htmlFor="lastName">Last Name</label>
                  <Input 
                    id="lastName"
                    className="checkout-page__input"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    prefix={<FiUser />}
                    error={errors.lastName}
                  />
                  {errors.lastName && <div className="checkout-page__help-text">{errors.lastName}</div>}
                </div>
              </div>
              
              <div className="checkout-page__form-row checkout-page__form-row--full">
                <div className="checkout-page__form-group">
                  <label className="checkout-page__label" htmlFor="email">Email</label>
                  <Input 
                    id="email"
                    className="checkout-page__input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    prefix={<FiMail />}
                    error={errors.email}
                  />
                  {errors.email && <div className="checkout-page__help-text">{errors.email}</div>}
                </div>
              </div>
            </div>
            
            <div className="checkout-page__section">
              <div className="checkout-page__section-header">
                <h2 className="checkout-page__section-header-title">
                  Shipping Address
                </h2>
              </div>
              
              <div className="checkout-page__form-row checkout-page__form-row--full">
                <div className="checkout-page__form-group">
                  <label className="checkout-page__label" htmlFor="address">Address</label>
                  <Input 
                    id="address"
                    className="checkout-page__input"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    prefix={<FiMapPin />}
                    error={errors.address}
                  />
                  {errors.address && <div className="checkout-page__help-text">{errors.address}</div>}
                </div>
              </div>
              
              <div className="checkout-page__form-row">
                <div className="checkout-page__form-group">
                  <label className="checkout-page__label" htmlFor="city">City</label>
                  <Input 
                    id="city"
                    className="checkout-page__input"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    error={errors.city}
                  />
                  {errors.city && <div className="checkout-page__help-text">{errors.city}</div>}
                </div>
                
                <div className="checkout-page__form-group">
                  <label className="checkout-page__label" htmlFor="zipCode">Zip Code</label>
                  <Input 
                    id="zipCode"
                    className="checkout-page__input"
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    error={errors.zipCode}
                  />
                  {errors.zipCode && <div className="checkout-page__help-text">{errors.zipCode}</div>}
                </div>
              </div>
            </div>
            
            <div className="checkout-page__section">
              <div className="checkout-page__section-header">
                <h2 className="checkout-page__section-header-title">
                  Payment Information
                </h2>
              </div>
              
              <div className="checkout-page__form-row checkout-page__form-row--full">
                <div className="checkout-page__form-group">
                  <label className="checkout-page__label" htmlFor="cardNumber">Card Number</label>
                  <Input 
                    id="cardNumber"
                    className="checkout-page__input"
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    required
                    prefix={<FiCreditCard />}
                    placeholder="XXXX XXXX XXXX XXXX"
                    maxLength={19}
                    error={errors.cardNumber}
                  />
                  {errors.cardNumber && <div className="checkout-page__help-text">{errors.cardNumber}</div>}
                </div>
              </div>
              
              <div className="checkout-page__form-row checkout-page__form-row--full">
                <div className="checkout-page__form-group">
                  <label className="checkout-page__label" htmlFor="cardName">Name on Card</label>
                  <Input 
                    id="cardName"
                    className="checkout-page__input"
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                    error={errors.cardName}
                  />
                  {errors.cardName && <div className="checkout-page__help-text">{errors.cardName}</div>}
                </div>
              </div>
              
              <div className="checkout-page__form-row">
                <div className="checkout-page__form-group">
                  <label className="checkout-page__label" htmlFor="cardExpiry">Expiry Date</label>
                  <Input 
                    id="cardExpiry"
                    className="checkout-page__input"
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    required
                    maxLength={5}
                    error={errors.cardExpiry}
                  />
                  {errors.cardExpiry && <div className="checkout-page__help-text">{errors.cardExpiry}</div>}
                </div>
                
                <div className="checkout-page__form-group">
                  <label className="checkout-page__label" htmlFor="cardCvv">CVV</label>
                  <Input 
                    id="cardCvv"
                    className="checkout-page__input"
                    type="text"
                    name="cardCvv"
                    value={formData.cardCvv}
                    onChange={handleChange}
                    required
                    suffix={<FiLock size={16} />}
                    maxLength={4}
                    error={errors.cardCvv}
                  />
                  {errors.cardCvv && <div className="checkout-page__help-text">{errors.cardCvv}</div>}
                </div>
              </div>
              
              <div className="checkout-page__payment-methods">
                <div className="checkout-page__payment-methods-item">
                  <img src="https://cdn4.iconfinder.com/data/icons/flat-brand-logo-2/512/visa-512.png" alt="Visa" />
                </div>
                <div className="checkout-page__payment-methods-item">
                  <img src="https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_master_card-512.png" alt="Mastercard" />
                </div>
                <div className="checkout-page__payment-methods-item">
                  <img src="https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_american_express_card-256.png" alt="American Express" />
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <div className="checkout-page__sidebar">
          <div className="checkout-page__order-summary">
            <div className="checkout-page__summary-header">
              <h3 className="checkout-page__summary-header-title">Order Summary</h3>
              <div className="checkout-page__summary-header-count">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </div>
            </div>
            
            <div className="checkout-page__summary-content">
              {cartItems.map(item => (
                <div key={item.id} className="checkout-page__summary-item">
                  <div className="checkout-page__summary-item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiShoppingCart size={24} color="#aaaaaa" />
                      </div>
                    )}
                  </div>
                  <div className="checkout-page__summary-item-details">
                    <div className="checkout-page__summary-item-name">{item.name}</div>
                    <div className="checkout-page__summary-item-meta">Qty: {item.quantity}</div>
                  </div>
                  <div className="checkout-page__summary-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="checkout-page__summary-totals">
              <div className="checkout-page__summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="checkout-page__summary-row">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="checkout-page__summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="checkout-page__summary-row checkout-page__summary-row--total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <Button 
                type="submit"
                className="checkout-page__place-order"
                onClick={handleSubmit}
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </Button>
              
              <div className="checkout-page__terms">
                By placing your order, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
              </div>
              
              <div className="checkout-page__secure-checkout">
                <FiShield className="checkout-page__secure-checkout-icon" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;