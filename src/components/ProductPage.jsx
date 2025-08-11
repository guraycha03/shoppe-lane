import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Recommendations from './Recommendations';
import { useEffect, useState, useRef } from 'react';
import ProductImages from "../components/ProductImages";
import ProductInfo from "../components/ProductInfo";
import productReviews from '../data/productReviews';
import ProductDetailsBox from './ProductDetailsBox';
import SpecificationsBox from './SpecificationsBox';
import RatingSection from './RatingSection';
import SellerInfoBox from './SellerInfoBox';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import AddToCartButton from './AddToCartButton';
import VariantSelector from './VariantSelector';
import QuantitySelector from './QuantitySelector';
import slugify from 'slugify';

function ProductPage({
  likedProducts,
  toggleLike,
  handleAddToCart,
  renderStars,
  setQuantity,
  quantity,
  addingToCartId,
  triggerFlyToCartAnimation,
  isLoggedIn,
  currentUser,
}) {

  const showNotification = (message, type = 'error') => {
    if (type === 'error') toast.error(message);
    else toast.success(message);
  };
  const navigate = useNavigate();
  const { id } = useParams();
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
  const username = localStorage.getItem('username') || 'guest';
  const product = products.find((p) => String(p.id) === id);
  const location = useLocation();
  const previousPage = location.state?.from;

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

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5">
        <i
          className="bi bi-bag-heart-fill mb-3"
          style={{
            fontSize: '3rem',
            color: '#8B6F52',
            animation: 'pulse 1.2s infinite ease-in-out',
          }}
        ></i>
        <div className="fw-semibold" style={{ color: '#8B6F52', fontSize: '1.1rem' }}>
          Loading product details…
        </div>
        <style>
          {`
            @keyframes pulse {
              0% { transform: scale(1); opacity: 0.7; }
              50% { transform: scale(1.2); opacity: 1; }
              100% { transform: scale(1); opacity: 0.7; }
            }
          `}
        </style>
      </div>
    );
  }
  

  if (!product) {
    return <p className="text-center mt-5">Product not found</p>;
  }

  const THUMBNAILS_TO_SHOW = 4;
  const reviews = productReviews[product?.id] || [];
  const allImages = [product.image, ...(product.images || [])].filter(
    (img, index, self) => self.indexOf(img) === index
  );
  
  const visibleImages = allImages.slice(scrollIndex, scrollIndex + THUMBNAILS_TO_SHOW);
  const scrollThumbnails = (direction) => {
    const newIndex = scrollIndex + direction;
    const total = (product.images?.length || 0) + 1;
    if (newIndex >= 0 && newIndex <= total - THUMBNAILS_TO_SHOW) {
      setScrollIndex(newIndex);
    }
  };

  return (
    <main id="main-content" className="container-fluid">
        <div className="container pt-4 pb-4">
        <button
          className="btn btn-outline-secondary d-inline-flex align-items-center gap-2 mb-4 px-3 py-2"
          style={{ fontWeight: '500', fontSize: '1rem', borderRadius: '0.5rem' }}
          onClick={() => {
            if (previousPage) {
              navigate(previousPage);
            } else {
              navigate('/');
            }
          }}
        >
          <i className="bi bi-arrow-left-short" style={{ fontSize: '1.2rem' }}></i>
          Back
        </button>

        <div className="row g-4">
          <div className="col-12 col-md-6">
            <ProductImages
              product={product}
              selectedImage={mainImage}
              setSelectedImage={setMainImage}
            />

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
            <ProductInfo
              product={product}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
              mainImageSetter={setMainImage}
              notification={notification}
              quantity={quantity}
              setQuantity={setQuantity}
              toggleLike={toggleLike}
              likedProducts={likedProducts}
              handleAddToCart={handleAddToCart}
              isLoggedIn={isLoggedIn}
              setNotification={setNotification}
              triggerFlyToCartAnimation={triggerFlyToCartAnimation}
              addingToCartId={addingToCartId}
            />

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
              seller={{
                sellerId: product.sellerId, 
                name: product.seller
              }}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser?.username}
            />


                <div className="col-12">
                <ProductDetailsBox
                  delivery={product.delivery}
                  shipping={product.shipping}
                  courier={product.courier}
                  guarantee={product.guarantee}
                />
            </div>

              <div className="col-12">
              <SpecificationsBox
                specs={product.specs}
                isMobile={isMobile}
                showSpecs={showSpecs}
                setShowSpecs={setShowSpecs}
              />

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
