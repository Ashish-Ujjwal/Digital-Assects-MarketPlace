import React, { useState } from 'react';
import "../../assets/styles/components/layout/_navigation.scss";
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX} from 'react-icons/fi';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  //const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="nav">
      {/* Desktop Navigation */}
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
            Home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/products" className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
            Products
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
            Categories
          </NavLink>
        </li>
      </ul>
      
      {/* Mobile Navigation */}
      <button className="nav-mobile__toggle" onClick={() => setMobileMenuOpen(true)}>
        <FiMenu />
      </button>

      <div className={`nav-mobile__overlay ${mobileMenuOpen ? 'nav-mobile__overlay--open' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      
      <div className={`nav-mobile__menu ${mobileMenuOpen ? 'nav-mobile__menu--open' : ''}`}>
        <div className="nav-mobile__header">
          <button className="nav-mobile__close" onClick={() => setMobileMenuOpen(false)}>
            <FiX />
          </button>
        </div>
        <ul className="nav-mobile__list">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-mobile__link nav-mobile__link--active' : 'nav-mobile__link'}>Home</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => isActive ? 'nav-mobile__link nav-mobile__link--active' : 'nav-mobile__link'}>Products</NavLink></li>
          <li><NavLink to="/categories" className={({ isActive }) => isActive ? 'nav-mobile__link nav-mobile__link--active' : 'nav-mobile__link'}>Categories</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
