import React, { useState, useEffect } from 'react';
import { FaStar, FaCheck, FaTag, FaHeart, FaCheckCircle, FaChevronRight, FaChevronLeft, FaShoppingCart, FaEye, FaRegHeart } from 'react-icons/fa';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import '../../assets/styles/components/products/_product-details.scss';
// import ProductCard from '../../components/products/ProductCard';

const ProductDetail = ({ product, loading, relatedProducts = [] }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset states when product changes
    setActiveImage(0);
    setQuantity(1);
    setActiveTab('description');
  }, [product?._id]);

  if (loading) {
    return (
      <div className="product-details__loading">
        <div className="product-details__loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details__error">
        <h2>Product not found</h2>
        <p>We couldn't find the product you're looking for.</p>
        <Button className="product-details__error-button" href="/products">
          Back to Products
        </Button>
      </div>
    );
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value > 0 ? value : 1);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleImageChange = (index) => {
    setActiveImage(index);
  };

  const handlePrevImage = () => {
    setActiveImage(prev => 
      prev === 0 ? (product.images?.length - 1 || 0) : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImage(prev => 
      prev === (product.images?.length - 1 || 0) ? 0 : prev + 1
    );
  };

  const toggleWishlist = () => {
    setIsWishlisted(prev => !prev);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    navigate(`/products/${product.id}?preview=true`);
  };

  const calculateDiscountPercentage = () => {
    if (!product.originalPrice) return null;
    return Math.round((1 - product.price / product.originalPrice) * 100);
  };

  const discountPercentage = calculateDiscountPercentage();
  const images = product.images || [product.imageUrl || ''];

  return (
    <div className="product-details">
      <div className="product-details__container">

        <div className="product-details__content">
          <div className="product-details__gallery">
            <div 
              className="product-details__gallery-main">
              <img 
                src={images[activeImage]} 
                alt={product.name}
              />

              {images.length > 1 && (
                <>
                  <button 
                    className="product-details__gallery-nav product-details__gallery-nav--prev"
                    onClick={handlePrevImage}
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    className="product-details__gallery-nav product-details__gallery-nav--next"
                    onClick={handleNextImage}
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
              
              {/* Fixed: Class name needs to match the SCSS or the SCSS needs to be updated */}
              <button 
                className="product-details__gallery-main--preview"
                onClick={handlePreview}
              >
                <FaEye />
              </button>
              
              {discountPercentage && (
                <div className="product-details__gallery-badge">
                  -{discountPercentage}%
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="product-details__gallery-previews">
                {images.map((image, index) => (
                  <div 
                    key={index}
                    className={`product-details__gallery-previews-item ${index === activeImage ? 'product-details__gallery-previews-item--active' : ''}`}
                    onClick={() => handleImageChange(index)}
                  >
                    <img src={image} alt={`${product.name} - view ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="product-details__info">
            <div className="product-details__info-sticky">
              <h1 className="product-details__info-title">{product.name}</h1>
              
              <div className="product-details__info-meta">
                <div className="product-details__info-meta-item">
                  <FaStar /> {product.rating || 0} ({product.reviewCount || 0} reviews)
                </div>
                <div className="product-details__info-meta-item">
                  <FaCheck /> {product.inStock ? 'In stock' : 'Out of stock'}
                </div>
                <div className="product-details__info-meta-item">
                  <FaTag /> SKU: {product.sku || 'N/A'}
                </div>
              </div>

              <div className="product-details__info-price">
                <div className="product-details__info-price-current">${(product.price || 0).toFixed(2)}</div>
                {product.originalPrice && (
                  <div className="product-details__info-price-original">${product.originalPrice.toFixed(2)}</div>
                )}
                {discountPercentage && (
                  <div className="product-details__info-price-discount">-{discountPercentage}%</div>
                )}
              </div>
              
              {product.description && (
                <div className="product-details__info-brief">
                  <p>{product.description.substring(0, 150)}...</p>
                </div>
              )}
              
              {product.author && (
                <div className="product-details__info-seller">
                  <img 
                    src={product.author.avatar || '/placeholder-avatar.jpg'} 
                    alt={product.author.name} 
                    className="product-details__info-seller-avatar"
                  />
                  <div className="product-details__info-seller-info">
                    <div className="product-details__info-seller-info-name">{product.author.name}</div>
                    <div className="product-details__info-seller-info-meta">
                      <span>{product.author.totalProducts || product.author.followers} followers</span>
                      <span>•</span>
                      <span>Member since {product.author.memberSince}</span>
                    </div>
                  </div>
                  <Button className="product-details__info-seller-follow">Follow</Button>
                </div>
              )}
              
              <div className="product-details__info-purchase">
                <div className="product-details__info-purchase-quantity">
                  <button 
                    className="product-details__info-purchase-quantity-btn" 
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={handleQuantityChange}
                    className="product-details__info-purchase-quantity-input"
                  />
                  <button 
                    className="product-details__info-purchase-quantity-btn" 
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>

                <div className="product-details__info-actions">
                  <Button className="product-details__info-actions-cart" onClick={handleAddToCart}>
                    <FaShoppingCart /> Add to Cart
                  </Button>
                  <button 
                    className={`product-details__info-actions-wishlist ${isWishlisted ? 'product-details__info-actions-wishlist--active' : ''}`} 
                    onClick={toggleWishlist}
                  >
                    {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="product-details__info-features">
                  <h3 className="product-details__info-features-title">Key Features</h3>
                  <div className="product-details__info-features-list">
                    {product.features.map((feature, index) => (
                      <div key={index} className="product-details__info-features-list-item">
                        <FaCheckCircle className="product-details__info-features-icon" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="product-details__info-stats">
                <div className="product-details__info-stats-item">
                  <div className="product-details__info-stats-item-value">{product.soldCount || 0}</div>
                  <div className="product-details__info-stats-item-label">Sold</div>
                </div>
                <div className="product-details__info-stats-item">
                  <div className="product-details__info-stats-item-value">{product.viewCount || 0}</div>
                  <div className="product-details__info-stats-item-label">Views</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details__tabs">
          <div className="product-details__tabs-nav">
            <button 
              className={`product-details__tabs-nav-item ${activeTab === 'description' ? 'product-details__tabs-nav-item--active' : ''}`}
              onClick={() => handleTabChange('description')}
            >
              Description
            </button>
            <button 
              className={`product-details__tabs-nav-item ${activeTab === 'specifications' ? 'product-details__tabs-nav-item--active' : ''}`}
              onClick={() => handleTabChange('specifications')}
            >
              Specifications
            </button>
            <button 
              className={`product-details__tabs-nav-item ${activeTab === 'reviews' ? 'product-details__tabs-nav-item--active' : ''}`}
              onClick={() => handleTabChange('reviews')}
            >
              Reviews ({product.reviewCount || 0})
            </button>
          </div>
          <div className="product-details__tabs-content">
            {/* Description Tab */}
            <div className={`product-details__tabs-content-item ${activeTab === 'description' ? 'product-details__tabs-content-item--active' : ''}`}>
              {product.description ? (
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              ) : (
                <p>No description available for this product.</p>
              )}
            </div>
            
            {/* Specifications Tab */}
            <div className={`product-details__tabs-content-item ${activeTab === 'specifications' ? 'product-details__tabs-content-item--active' : ''}`}>
              {product.specifications && Object.keys(product.specifications).length > 0 ? (
                <div className="product-details__specifications">
                  <h3>Product Specifications</h3>
                  <table className="product-details__specifications-table">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key}>
                          <th>{key}</th>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No specifications available for this product.</p>
              )}
            </div>
            
            {/* Reviews Tab */}
            <div className={`product-details__tabs-content-item ${activeTab === 'reviews' ? 'product-details__tabs-content-item--active' : ''}`}>
              {product.reviews && product.reviews.length > 0 ? (
                <div className="product-details__reviews">
                  {product.reviews.map((review, index) => (
                    <div key={index} className="product-details__review">
                      <div className="product-details__review-header">
                        <div className="product-details__review-user">
                          <img 
                            src={review.userAvatar || '/placeholder-avatar.jpg'} 
                            alt={review.userName || 'User'} 
                            className="product-details__review-avatar"
                          />
                          <span className="product-details__review-name">{review.userName || 'Anonymous'}</span>
                        </div>
                        <div className="product-details__review-rating">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < (review.rating || 0) ? "star-filled" : "star-empty"} 
                            />
                          ))}
                        </div>
                        <div className="product-details__review-date">{review.date || 'N/A'}</div>
                      </div>
                      <div className="product-details__review-content">{review.content || 'No comment provided.'}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No reviews available yet. Be the first to review this product!</p>
              )}
            </div>
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div className="product-details__related">
            <h2 className="product-details__related-title">Related Products</h2>
            <div className="product-details__related-grid">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="product-details__related-item">
                  {/* You can insert a simplified ProductCard component here */}
                  {/* Example placeholder */}
                  <div style={{padding: '20px', border: '1px solid #eee', borderRadius: '8px'}}>
                  <img src={relatedProduct.images?.[0] || '/placeholder-image.jpg'} alt={relatedProduct.name} style={{width: '100%', height: '160px', objectFit: 'cover'}} />
                    <h4>{relatedProduct.name}</h4>
                    <p>${relatedProduct.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;