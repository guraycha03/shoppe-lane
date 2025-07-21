import { useParams, useNavigate } from 'react-router-dom';
import Recommendations from './Recommendations';
import { useEffect, useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import RatingSection from './RatingSection';
import productReviews from '../data/productReviews';
import AddToCartButton from './AddToCartButton';
import SellerInfoBox from './SellerInfoBox';
import { toast } from 'react-toastify';

import sellers from '../data/sellers';
import axios from 'axios';


function ProductPage({
  // products,
  likedProducts,
  toggleLike,
  handleAddToCart,
  renderStars,
  setQuantity,
  quantity,
  addingToCartId,
  triggerFlyToCartAnimation,
  isLoggedIn,
}) {

  const showNotification = (message, type = 'error') => {
    if (type === 'error') toast.error(message);
    else toast.success(message);
  };

  const navigate = useNavigate();
  const { id } = useParams();

  // All Hooks first
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const thumbnailWrapperRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const nodeRef = useRef(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [inProp, setInProp] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSpecs, setShowSpecs] = useState(false);
  const [notification, setNotification] = useState('');

  const product = products.find((p) => String(p.id) === id);
  const username = localStorage.getItem('username') || 'guest';

  
  useEffect(() => {
    axios.get('https://687c9936918b6422432ebfe8.mockapi.io/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Failed to fetch products:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setInProp(false);
    window.scrollTo(0, 0); 
    const timer = setTimeout(() => setInProp(true), 20);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (product) {
      setMainImage(product.variants?.[0]?.image || product.image);
      setSelectedVariant(null);
    }
  }, [product]);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  // Only AFTER all hooks
  if (loading) {
    return <p className="text-center mt-5">Loading product details…</p>;
  }

  if (!product) {
    return <p className="text-center mt-5">Product not found</p>;
  }

  const THUMBNAILS_TO_SHOW = 4;
  
  const reviews = productReviews[product?.id] || [];
  const allImages = [product.image, ...(product.images || [])];
  const visibleImages = allImages.slice(scrollIndex, scrollIndex + THUMBNAILS_TO_SHOW);

  


  const scrollThumbnails = (direction) => {
    const newIndex = scrollIndex + direction;
    const total = (product.images?.length || 0) + 1;
    if (newIndex >= 0 && newIndex <= total - THUMBNAILS_TO_SHOW) {
      setScrollIndex(newIndex);
    }
  };



  // useEffect(() => {
  //   setInProp(false);
  //   window.scrollTo(0, 0); 
  
  //   const timer = setTimeout(() => {
  //     setInProp(true); 
  //   }, 20);
  
  //   return () => clearTimeout(timer);
  // }, [id]);



  return (
      <main className="page-fade">
        <div className="container py-4">
        <button
          className="btn btn-outline-secondary d-inline-flex align-items-center gap-2 mb-4 px-3 py-2"
          style={{ fontWeight: '500', fontSize: '1rem', borderRadius: '0.5rem' }}
          onClick={() => {
            if (document.referrer.includes(window.location.host)) {
              navigate(-1);
            } else {
              navigate('/');
            }
          }}
        >
          <i className="bi bi-arrow-left-short" style={{ fontSize: '1.2rem' }}></i>
          Back to Shop
        </button>

        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">

              <div className="d-flex flex-column align-items-center order-2 order-md-1 mt-3 mt-md-0">
                <div className="d-flex flex-row flex-md-column gap-2 align-items-center" ref={thumbnailWrapperRef}>
                  {visibleImages.map((img, idx) => (
                    <img
                      key={idx + scrollIndex}
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      onClick={() => setMainImage(img)}
                      style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                        border: img === mainImage ? '2px solid #8B6F52' : '1px solid #ccc',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>             

                {allImages.length > THUMBNAILS_TO_SHOW && (
                  <div className="d-flex gap-2 mt-2 flex-row">
                    <button className="btn btn-sm btn-light" onClick={() => scrollThumbnails(-1)} disabled={scrollIndex === 0}>
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button className="btn btn-sm btn-light" onClick={() => scrollThumbnails(1)} disabled={scrollIndex + THUMBNAILS_TO_SHOW >= allImages.length}>
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                )}
              </div>
              <div className="text-center flex-grow-1 order-1 order-md-2 px-2 px-md-4">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={product?.name || 'Product Image'}
                    className="img-fluid rounded"
                    style={{
                      height: '420px',
                      width: '100%',
                      objectFit: 'contain',
                      background: '#F3F1ED',
                      padding: '1.5rem',
                      borderRadius: '1rem',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: '420px',
                      width: '100%',
                      background: '#F3F1ED',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '1rem',
                    }}
                  >
                    <span className="text-muted">Image not available</span>
                  </div>
                )}
              </div>

            </div>

            {/* Rating Section for large screens */}
            <div className="d-none d-md-block mt-4 mb-4">
            <RatingSection 
              ratings={reviews} 
              productId={id} 
              isLoggedIn={isLoggedIn}
              showNotification={(message, type) => {
                if (type === "error") {
                  toast.error(message);
                } else {
                  toast.success(message);
                }
              }} 
            />




            </div>
          </div>

          <div className="col-12 col-md-6">
            <h2 style={{ color: 'var(--theme-soft-dark)' }}>{product.name}</h2>
            <p className="text-muted mb-1">
              <i className="bi bi-bag-fill me-2 text-soft-sold"></i>
              <span className="fw-semibold" style={{ color: 'var(--theme-accent)' }}>{product.sold}</span>
            </p>
            <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end" style={{ rowGap: '0.5rem' }}>

              {renderStars(product.rating)}
              <small className="rating-text">({product.reviews} reviews)</small>
            </div>

            <p className="text-muted mt-2">{product.description}</p>
            <h4 style={{ color: 'var(--theme-accent)' }}>{product.price}</h4>

            {product.variants && product.variants.length > 0 && (
                  <div className="mb-3">
                    <p className="mb-2" style={{ color: '#999' }}>Select Design:</p>
                    <div className="d-flex gap-2 flex-wrap">
                    {product.variants.map((variant, index) => (
                      <div
                        key={index}
                        role="button"
                        className={`variant-thumb ${selectedVariant?.name === variant.name ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedVariant(variant);
                          setMainImage(variant.image);
                        }}
                      >
                        <img
                          src={variant.image}
                          alt={variant.name}
                          className="img-fluid rounded"
                          style={{ width: '100%', height: '60px', objectFit: 'cover' }}
                        />
                        <small className="d-block text-center mt-1" style={{ fontSize: '0.75rem' }}>
                          {variant.name}
                        </small>
                      </div>
                    ))}

                    </div>
                  </div>
                )}

            {notification && (
              <div className="alert alert-warning d-flex align-items-center gap-2 px-3 py-2" role="alert">
                <i className="bi bi-exclamation-triangle-fill text-warning"></i>
                <span>{notification}</span>
              </div>
            )}

            <div className="d-flex align-items-center gap-3 my-3">
              <button className="btn btn-outline-secondary" onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}>−</button>
              <span>{quantity}</span>
              <button className="btn btn-outline-secondary" onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>

            <div className="d-flex gap-3 mb-4">
            <i
              role="button"
              aria-label={likedProducts.has(product.id) ? 'Unlike' : 'Like'}
              className={`bi ${likedProducts.has(product.id) ? 'bi-heart-fill text-danger' : 'bi-heart'}`}
              onClick={() => toggleLike(product.id)}
              style={{
                cursor: 'pointer',
                fontSize: '1.4rem',
              }}
            ></i>
  
              <AddToCartButton
              onClick={(e) => {
                e.stopPropagation();

                if (!isLoggedIn) {
                  setNotification('Please log in to add items to your cart.');
                  setTimeout(() => setNotification(''), 3000);
                  return;
                }

                if (product.variants && product.variants.length > 0 && !selectedVariant) {
                  setNotification('Please select a color before adding to cart.');
                  setTimeout(() => setNotification(''), 3000);
                  return;
                }

                if (triggerFlyToCartAnimation) {
                  triggerFlyToCartAnimation(e);
                }

                handleAddToCart(product, e, quantity);
              }}
              loading={addingToCartId === product.id}
              disabled={product.variants?.length > 0 && !selectedVariant}
            />

            </div>

            {/* Rating Section for mobile */}
            <div className="d-block d-md-none mb-4">
            <RatingSection 
              ratings={reviews} 
              productId={id} 
              isLoggedIn={isLoggedIn}
              showNotification={(message, type) => {
                if (type === "error") {
                  toast.error(message);
                } else {
                  toast.success(message);
                }
              }} 
            />



            </div>

            <div className="row g-3">
            <SellerInfoBox
              seller={sellers[product.seller] || { name: product.seller, followers: 1000 }}
              isLoggedIn={isLoggedIn}
              currentUser={username}
            />


              <div className="col-12">
                <div className="card shadow-sm p-3 product-details-box">
                
                  <p className="mb-1">
                    <i className="bi bi-truck me-2 text-accent"></i>
                    <span className="label">Delivery:</span> {product.delivery}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-box2-heart me-2 text-accent"></i>
                    <span className="label">Shipping:</span> {product.shipping}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-send-check me-2 text-accent"></i>
                    <span className="label">Courier:</span> {product.courier}
                  </p>
                  <p className="mb-0">
                    <i className="bi bi-shield-check me-2 text-accent"></i>
                    <span className="label">Guarantees:</span> {product.guarantee?.join(', ')}
                  </p>
                </div>
              </div>

              <div className="col-12">
                <div className="card shadow-sm p-3 product-details-box">
                  {/* Desktop Title */}
                  <h5 className="mb-3 text-accent d-none d-md-block">Specifications</h5>

                  {/* Mobile Toggle Button */}

                    {isMobile && (
                      <button
                        className="btn btn-outline-secondary d-block d-md-none mb-3"
                        type="button"
                        onClick={() => setShowSpecs((prev) => !prev)}
                      >
                        {showSpecs ? 'Hide Specifications' : 'View Specifications'}
                      </button>
                    )}

                    {/* Always visible on desktop, toggled on mobile */}
                    {(!isMobile || showSpecs) && (
                      <ul className="mb-0 ps-3 product-info-list text-muted" style={{ listStyleType: 'disc' }}>
                        {Object.entries(product.specs || {}).map(([key, value]) => (
                            <li key={key} style={{ listStyleType: 'disc', marginBottom: '0.5rem' }}>
                              <strong className="me-1">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:
                              </strong>
                              {Array.isArray(value) ? value.join(', ') : value}
                            </li>
                          ))}

                      </ul>

                    )}



                </div>
              </div>



            </div>
          </div>
        </div>

        <Recommendations
          products={products}
          selectedProduct={product}
          setSelectedProduct={() => {}}
          toggleLike={toggleLike}
          likedProducts={likedProducts}
          handleAddToCart={handleAddToCart}
          renderStars={renderStars}
          addingToCartId={addingToCartId}
          triggerFlyToCartAnimation={triggerFlyToCartAnimation}
          isLoggedIn={isLoggedIn}
          showNotification={showNotification}
        />


      </div>
    </main>

  );
}

export default ProductPage;
