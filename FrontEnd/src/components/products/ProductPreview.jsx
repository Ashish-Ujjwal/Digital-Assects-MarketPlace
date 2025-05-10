import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FaTimes, FaEye, FaMobileAlt, FaTabletAlt, FaDesktop } from 'react-icons/fa';
import '../../assets/styles/components/products/_product-preview.scss';

const ProductPreview = ({ product }) => {
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  const [deviceView, setDeviceView] = useState('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0); // Add key to force iframe refresh
  
  useEffect(() => {
    // Reset loading state whenever product changes
    if (isPreview && product) {
      setIsLoading(true);
    }
  }, [product, isPreview]);
  
  // Handle device view change
  const handleDeviceChange = (newDevice) => {
    setDeviceView(newDevice);
    setIsLoading(true);
    
    // Use a short timeout to ensure loading indicator appears
    setTimeout(() => {
      // Increment key to force iframe refresh
      setIframeKey(prev => prev + 1);
    }, 50);
  };
  
  if (!product || !isPreview) {
    return null;
  }
  
  // Get the template URL from the product
  const previewUrl = product.previewUrl || `https://ashishujjwal.github.io/Health-Plus/`;
  
  // Define device dimensions
  const deviceDimensions = {
    mobile: { width: '375px', height: '100%', maxWidth: '100%', maxHeight: '100%' },
    tablet: { width: '768px', height: '100%', maxWidth: '100%', maxHeight: '100%' },
    desktop: { width: '100%', height: '100%' }
  };
  
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  
  return (
    <div className="product-preview-overlay">
      <div className="product-preview-header">
        <h2>Previewing: {product.name}</h2>
        <Link to={`/products/${product.id}`} className="close-preview">
          <FaTimes /> Close Preview
        </Link>
      </div>
      
      <div className="preview-device-selector">
        <button 
          className={deviceView === 'mobile' ? 'active' : ''} 
          onClick={() => handleDeviceChange('mobile')}
          aria-label="Mobile view"
        >
          <FaMobileAlt /> <span className="device-label">Mobile</span>
        </button>
        <button 
          className={deviceView === 'tablet' ? 'active' : ''} 
          onClick={() => handleDeviceChange('tablet')}
          aria-label="Tablet view"
        >
          <FaTabletAlt /> <span className="device-label">Tablet</span>
        </button>
        <button 
          className={deviceView === 'desktop' ? 'active' : ''} 
          onClick={() => handleDeviceChange('desktop')}
          aria-label="Desktop view"
        >
          <FaDesktop /> <span className="device-label">Desktop</span>
        </button>
      </div>
      
      <div className="product-preview-content">
        {isLoading && (
          <div className="preview-loading">
            <div className="spinner"></div>
            <p>Loading preview...</p>
          </div>
        )}
        
        <iframe
          key={iframeKey} // Add key prop to force re-render
          src={previewUrl}
          title={`Preview of ${product.name}`}
          className={`product-preview-iframe ${isLoading ? 'loading' : ''}`}
          style={deviceDimensions[deviceView]}
          sandbox="allow-same-origin allow-scripts"
          onLoad={handleIframeLoad}
        />
      </div>
    </div>
  );
};

// Component for the preview button that can be used in product cards or detail pages
export const ProductPreviewButton = ({ product, className }) => {
  return (
    <Link 
      to={`/products/${product.id}?preview=true`} 
      className={`product-card__preview ${className || ''}`}
    >
      <FaEye /> Preview Template
    </Link>
  );
};

export default ProductPreview;