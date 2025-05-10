import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import SearchBar from '../search/SearchBar';
import { useCart } from '../../context/CartContext';
import "../../assets/styles/components/layout/_header.scss";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSearchOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle search overlay (for mobile)
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img src="logo.svg" alt="DigitalAssetMarket" />
        </Link>
        
        {/* Desktop search bar */}
        <div className="header__search-container">
          {!isMobile && <SearchBar variant="compact" />}
        </div>
        
        <Navigation />
        
        <div className="header__actions">
          {/* Mobile search toggle */}
          {isMobile && (
            <button className="header__action-icon header__search-toggle" onClick={toggleSearch}>
              <SearchIcon />
            </button>
          )}
          
          <Link to="/cart" className="header__action-icon header__cart-icon">
            <ShoppingCartIcon />
            {cartItemCount > 0 && (
              <span className="header__badge" aria-label={`${cartItemCount} items in cart`}>
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </Link>
          
          <Link to="/account" className="header__action-icon header__account-icon">
            <AccountCircleIcon />
          </Link>
        </div>
      </div>
      
      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="header__search-overlay">
          <div className="header__search-overlay-content">
            <SearchBar variant="large" />
            <button className="header__search-overlay-close" onClick={toggleSearch}>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;