// pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/products/ProductGrid';
import "../assets/styles/pages/_home.scss";
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { FaDownload, FaUsers, FaBox, FaStar, FaQuoteRight, FaArrowRight, FaBrush, FaLayerGroup, FaFont, FaMusic } from 'react-icons/fa';


const HomePage = () => {
  const { getFilteredProducts, loading } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isVisible, setIsVisible] = useState({
    categories: false,
    featured: false,
    trending: false,
    authors: false,
    testimonials: false,
    newsletter: false
  });

  // Load products and initialize animation states
  useEffect(() => {
    setFeaturedProducts(getFilteredProducts().slice(0, 4));
    
    // Setup intersection observer for animation
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.dataset.section]: true
          }));
        }
      });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('[data-section]').forEach(section => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, [getFilteredProducts]);
  
  // Filter products based on active tab
  const getTrendingProducts = () => {
    if (activeTab === 'all') {
      return getFilteredProducts().slice(0, 3);
    }
    return getFilteredProducts()
      .filter(product => product.category.toLowerCase() === activeTab)
      .slice(0, 3);
  };
  
  // Testimonials data
  const testimonials = [
    {
      content: "The quality of the digital assets on this platform is exceptional. I've found everything I need for my projects.",
      author: {
        name: "Sarah Johnson",
        title: "Graphic Designer",
        avatar: "https://picsum.photos/id/236/200/300" 
      }
    },
    {
      content: "I love how easy it is to find what I'm looking for. The categories are well organized and the search is powerful.",
      author: {
        name: "Michael Chang",
        title: "Web Developer",
        avatar: "https://picsum.photos/id/237/200/300"
      }
    },
    {
      content: "The templates I purchased saved me hours of work. Definitely worth the investment for any creative professional.",
      author: {
        name: "Emma Rodriguez",
        title: "Marketing Specialist",
        avatar: "https://picsum.photos/id/238/200/300"
      }
    }
  ];
  
  // Authors data
  const authors = [
    { name: "John Doe", items: "156 items", avatar: "https://picsum.photos/id/1/200" },
    { name: "Jane Smith", items: "98 items", avatar: "https://picsum.photos/id/21/200" },
    { name: "David Wilson", items: "74 items", avatar: "https://picsum.photos/id/23/200" },
    { name: "Lisa Brown", items: "125 items", avatar: "https://picsum.photos/id/43/200" },
    { name: "Mark Johnson", items: "63 items", avatar: "https://picsum.photos/id/51/200" },
    { name: "Amy Chen", items: "87 items", avatar: "https://picsum.photos/id/64/200" }
  ];
  
  const categoryIcons = {
    Graphics: FaBrush,
    Templates: FaLayerGroup,
    Fonts: FaFont,
    Audio: FaMusic
  };

  const categories = [
    { title: "Graphics", count: "256 items", image: "https://picsum.photos/id/190/400?grayscale" }, // Abstract/artistic image
    { title: "Templates", count: "142 items", image: "https://picsum.photos/id/38/400?grayscale" }, // Structured template-like image
    { title: "Fonts", count: "89 items", image: "https://picsum.photos/id/350/400?grayscale" }, // Text-heavy or typography-related image
    { title: "Audio", count: "64 items", image: "https://picsum.photos/id/60/400?grayscale" } // Music-related or soundwave-like image
  ];
 

  return (
    <div className="home">
      {/* Hero Section - Full screen with parallax effect */}
      <section className="home__hero">
        <div className="home__hero-background"></div>
        <div className="home__hero-overlay"></div>
        <div className="home__hero-content">
          <h1 className="home__hero-title">Discover Premium Digital Assets</h1>
          <p className="home__hero-subtitle">High-quality assets for all your creative projects</p>
          <div className="home__hero-buttons">
            <Link to="/products" className="home__hero-cta home__hero-cta--primary">Browse All Products</Link>
            <Link to="/about" className="home__hero-cta home__hero-cta--secondary">Learn More</Link>
          </div>
          
          <div className="home__hero-search">
            <input type="text" placeholder="Search for assets..." className="home__hero-search-input" />
            <button className="home__hero-search-button">
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="home__hero-scroll">
          <span>Scroll Down</span>
          <FaChevronDown />
        </div>
      </section>
      
      {/* Stats Banner */}
      <section className="home__stats">
        <div className="home__stats-container">
          <div className="home__stats-item">
            <div className="home__stats-icon">
              <FaDownload />
            </div>
            <div className="home__stats-info">
              <div className="home__stats-number">10K+</div>
              <div className="home__stats-text">Downloads</div>
            </div>
          </div>
          
          <div className="home__stats-item">
            <div className="home__stats-icon">
              <FaUsers />
            </div>
            <div className="home__stats-info">
              <div className="home__stats-number">5K+</div>
              <div className="home__stats-text">Happy Customers</div>
            </div>
          </div>
          
          <div className="home__stats-item">
            <div className="home__stats-icon">
              <FaBox/>
            </div>
            <div className="home__stats-info">
              <div className="home__stats-number">2K+</div>
              <div className="home__stats-text">Premium Assets</div>
            </div>
          </div>
          
          <div className="home__stats-item">
            <div className="home__stats-icon">
              <FaStar/>
            </div>
            <div className="home__stats-info">
              <div className="home__stats-number">4.9</div>
              <div className="home__stats-text">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section - with animation */}
<section 
  className={`home__categories ${isVisible.categories ? 'home__categories--visible' : ''}`}
  data-section="categories"
>
  <h2 className="home__section-title">
    <span className="home__section-title-line"></span>
    Browse Categories
    <span className="home__section-title-line"></span>
  </h2>
  <div className="home__categories-grid">
    {categories.map((category, index) => {
      const IconComponent = categoryIcons[category.title];
      return (
        <Link 
          key={index}
          to={`/products?category=${category.title.toLowerCase()}`} 
          className="home__categories-item"
          style={{animationDelay: `${index * 0.1}s`}}
        >
          <div className="home__categories-item-icon">
            <IconComponent />
          </div>
          <img 
            src={category.image} 
            alt={category.title} 
            className="home__categories-item-img" 
          />
          <div className="home__categories-item-overlay">
            <div className="home__categories-item-title">{category.title}</div>
            <div className="home__categories-item-count">{category.count}</div>
          </div>
        </Link>
      );
    })}
  </div>
</section>
      
      {/* Featured Products */}
      <section 
        className={`home__featured ${isVisible.featured ? 'home__featured--visible' : ''}`}
        data-section="featured"
      >
        <div className="home__featured-container">
          <div className="home__featured-header">
            <h2 className="home__section-title">
              <span className="home__section-title-line"></span>
              Featured Products
              <span className="home__section-title-line"></span>
            </h2>
            <Link to="/products" className="home__featured-link">
              View All Products 
              <FaArrowRight />
            </Link>
          </div>
          <div className="home__featured-grid">
            <ProductGrid 
              products={featuredProducts} 
              loading={loading} 
            />
          </div>
        </div>
      </section>
      
      {/* Trending Section */}
      <section 
        className={`home__trending ${isVisible.trending ? 'home__trending--visible' : ''}`}
        data-section="trending"
      >
        <div className="home__trending-header">
          <h2 className="home__section-title">
            <span className="home__section-title-line"></span>
            Trending Now
            <span className="home__section-title-line"></span>
          </h2>
          <div className="home__trending-tabs">
            <div 
              className={`home__trending-tabs-item ${activeTab === 'all' ? 'home__trending-tabs-item--active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </div>
            <div 
              className={`home__trending-tabs-item ${activeTab === 'graphics' ? 'home__trending-tabs-item--active' : ''}`}
              onClick={() => setActiveTab('graphics')}
            >
              Graphics
            </div>
            <div 
              className={`home__trending-tabs-item ${activeTab === 'templates' ? 'home__trending-tabs-item--active' : ''}`}
              onClick={() => setActiveTab('templates')}
            >
              Templates
            </div>
            <div 
              className={`home__trending-tabs-item ${activeTab === 'fonts' ? 'home__trending-tabs-item--active' : ''}`}
              onClick={() => setActiveTab('fonts')}
            >
              Fonts
            </div>
          </div>
        </div>
        <div className="home__trending-grid">
          <ProductGrid 
            products={getTrendingProducts()} 
            loading={loading}
            variant="featured" 
          />
        </div>
        <div className="home__trending-action">
          <Link to={`/products?category=${activeTab}`} className="home__trending-action-button">
            See More {activeTab !== 'all' ? activeTab : 'Products'}
            <FaArrowRight />
          </Link>
        </div>
      </section>
      
      {/* Premium Banner */}
      <section className="home__premium">
        <div className="home__premium-overlay"></div>
        <div className="home__premium-content">
          <h2 className="home__premium-title">Get Premium Access</h2>
          <p className="home__premium-description">
            Unlock unlimited downloads and exclusive assets with our premium subscription
          </p>
          <Link to="/premium" className="home__premium-button">
            View Premium Plans
          </Link>
        </div>
      </section>
      
      {/* Authors Section */}
      <section 
        className={`home__authors ${isVisible.authors ? 'home__authors--visible' : ''}`}
        data-section="authors"
      >
        <div className="home__authors-container">
          <h2 className="home__section-title">
            <span className="home__section-title-line"></span>
            Top Authors
            <span className="home__section-title-line"></span>
          </h2>
          <div className="home__authors-grid">
            {authors.map((author, index) => (
              <div 
                key={index} 
                className="home__authors-item"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="home__authors-item-avatar-container">
                  <img 
                    src={author.avatar} 
                    alt={author.name} 
                    className="home__authors-item-avatar" 
                  />
                  <div className="home__authors-item-hover">
                    <Link to={`/author/${author.name.toLowerCase().replace(' ', '-')}`} className="home__authors-item-view">
                      View Profile
                    </Link>
                  </div>
                </div>
                <div className="home__authors-item-name">{author.name}</div>
                <div className="home__authors-item-items">{author.items}</div>
              </div>
            ))}
          </div>
          <div className="home__authors-action">
            <Link to="/authors" className="home__authors-action-button">
              View All Authors
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section 
        className={`home__testimonials ${isVisible.testimonials ? 'home__testimonials--visible' : ''}`}
        data-section="testimonials"
      >
        <h2 className="home__section-title">
          <span className="home__section-title-line"></span>
          What Our Customers Say
          <span className="home__section-title-line"></span>
        </h2>
        <div className="home__testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="home__testimonials-item"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="home__testimonials-item-quote">
                <FaQuoteRight />
              </div>
              <p className="home__testimonials-item-content">{testimonial.content}</p>
              <div className="home__testimonials-item-author">
                <img 
                  src={testimonial.author.avatar} 
                  alt={testimonial.author.name} 
                  className="home__testimonials-item-author-avatar" 
                />
                <div>
                  <div className="home__testimonials-item-author-name">{testimonial.author.name}</div>
                  <div className="home__testimonials-item-author-title">{testimonial.author.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section 
        className={`home__newsletter ${isVisible.newsletter ? 'home__newsletter--visible' : ''}`}
        data-section="newsletter"
      >
        <div className="home__newsletter-container">
          <div className="home__newsletter-content">
            <h2 className="home__newsletter-title">Subscribe to Our Newsletter</h2>
            <p className="home__newsletter-description">
              Stay updated with our latest releases and special offers
            </p>
            <form className="home__newsletter-form">
              <div className="home__newsletter-form-group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="home__newsletter-form-input" 
                />
                <button type="submit" className="home__newsletter-form-button">
                  Subscribe
                  <FaArrowRight />
                </button>
              </div>
              <div className="home__newsletter-form-privacy">
                We respect your privacy and won't share your information
              </div>
            </form>
          </div>
          <div className="home__newsletter-graphic">
            <div className="home__newsletter-graphic-element home__newsletter-graphic-element--1"></div>
            <div className="home__newsletter-graphic-element home__newsletter-graphic-element--2"></div>
            <div className="home__newsletter-graphic-element home__newsletter-graphic-element--3"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;