import React, { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams} from 'react-router-dom';
import ProductDetail from '../components/products/ProductDetail';
import { useProducts } from '../context/ProductContext';
import '../assets/styles/pages/_product-detail.scss';
import ProductPreview from '../components/products/ProductPreview'
const ProductDetailPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  const { getProductById, loading } = useProducts();
  const [product, setProduct] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const foundProduct = await getProductById(id);
        setProduct(foundProduct);
      }
    };
  
    fetchProduct();
  }, [id, getProductById]);

  // Handle back to top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`product-detail ${isPreview ? 'preview-mode' : ''}`}>
      {isPreview ? (
        <ProductPreview product={product} />
      ) : (
      <div className="product-detail__container">
        {/* Breadcrumb navigation using the styles from SCSS */}
        <div className="product-detail__breadcrumb">
          <Link to="/" className="product-detail__breadcrumb-item">Home</Link>
          <Link to="/products" className="product-detail__breadcrumb-item">Products</Link>
          <span className="product-detail__breadcrumb-item product-detail__breadcrumb-item--active">
            {product?.name || 'Product Detail'}
          </span>
        </div>

        {/* Product content with animation */}
        <div className="product-detail__content">
          <ProductDetail product={product} loading={loading} />
        </div>
        
        {/* Back to top button */}
        <button 
          className={`product-detail__back-to-top ${showBackToTop ? 'product-detail__back-to-top--visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
      )}
    </div>
  );
};

export default ProductDetailPage;