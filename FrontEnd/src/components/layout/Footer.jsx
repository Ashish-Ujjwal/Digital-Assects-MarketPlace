import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import "../../assets/styles/components/layout/_footer.scss";

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribing email:', email);
    // You would typically send this to your API
    setEmail('');
    // Show success message to user
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <img 
            src="logo.svg" 
            alt="Digital Asset Marketplace" 
            className="footer__brand-logo" 
          />
          <div className="footer__brand-text">Digital Asset Marketplace</div>
        </div>

        <div className="footer__grid">
          <div className="footer__column">
            <h4 className="footer__column-title">About Us</h4>
            <ul className="footer__links">
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Customer Service</h4>
            <ul className="footer__links">
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Legal</h4>
            <ul className="footer__links">
              <li><Link to="/legal/terms">Terms of Service</Link></li>
              <li><Link to="/legal/privacy">Privacy Policy</Link></li>
              <li><Link to="/legal/cookies">Cookies Policy</Link></li>
              <li><Link to="/legal/compliance">Compliance</Link></li>
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Stay Connected</h4>
            <p>Get the latest updates, deals and more.</p>
            
            <div className="footer__newsletter">
              <form onSubmit={handleSubmit} className="footer__newsletter-form">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  required
                  aria-label="Email for newsletter"
                />
                <button type="submit" aria-label="Subscribe">
                  <FaArrowRight />
                </button>
              </form>
            </div>
            
            <div className="footer__social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            &copy; {new Date().getFullYear()} Digital Asset Marketplace. All rights reserved.
          </div>
          <div className="footer__policy-links">
            <Link to="/legal/terms">Terms</Link>
            <Link to="/legal/privacy">Privacy</Link>
            <Link to="/legal/cookies">Cookies</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;