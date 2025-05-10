// src/components/layout/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className="app-container">
    <Header />
    <main className="main-content">{children}</main>
    <Footer />
  </div>
);

export default Layout;