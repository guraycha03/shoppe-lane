import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import { buildCartItem } from '../utils/cartUtils';

function ProductCard({
  product,
  handleAddToCart,
  likedProducts,
  toggleLike,
  renderStars,
  compact = false,
  addingToCartId,
  triggerFlyToCartAnimation,
  isLoggedIn,
  size = 'default', 
  showNotification,
  forceShowCartButton = false,
}) {

  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const onAddToCart = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      showNotification('Please log in to add items to your cart.');
      return;
    }

    if (addingToCartId === product.id) return;

    if (triggerFlyToCartAnimation) {
      triggerFlyToCartAnimation(e);
    }

    const cartItem = buildCartItem(product);
    handleAddToCart(cartItem, e);
  };

  const isSmall = size === 'small';

  return (
    <div
      className={`card w-100 h-100 border-0 shadow-sm mx-auto ${isSmall ? 'p-2' : ''}`}
      role="button"
      onClick={() => navigate(`/product/${product.id}`)}
      style={{
        backgroundColor: '#FBF7F4',
        borderRadius: '0.75rem',
        transition: 'transform 0.2s ease',
        maxWidth: isSmall ? '220px' : '100%',
        fontSize: isSmall ? '0.85rem' : '1rem',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.015)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {/* Image section */}
      <div
        style={{
          width: '100%',
          height: isSmall ? '160px' : 'auto',
          aspectRatio: isSmall ? undefined : '1 / 1',
          backgroundColor: '#EDEBE4',
          borderTopLeftRadius: '0.75rem',
          borderTopRightRadius: '0.75rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: isSmall ? '0.5rem' : '0.75rem',
          boxSizing: 'border-box',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column px-2 pt-3 pb-3">
        <h6
          className="fw-bold mb-2 text-truncate"
          style={{ color: '#3D3B3C', fontSize: isSmall ? '0.85rem' : '0.9rem' }}
        >
          {product.name}
        </h6>

        <div
          className="d-flex align-items-center mb-2 gap-1"
          style={{ fontSize: isSmall ? '0.75rem' : compact ? '0.75rem' : '0.85rem' }}
        >
          {renderStars(product.rating)}
          <small style={{ color: '#797979' }}>
            {product.rating} ({product.reviews})
          </small>
        </div>

                {/* Price and Sold Row */}
                <div className="d-flex justify-content-between align-items-center mb-2">
          <small className="text-muted">{product.sold}</small>
          <span className="fw-medium" style={{ color: '#8B6F52', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' }}>
            {product.price}
          </span>


        </div>

        {/* Heart and Add to Cart Buttons */}
        <div className="mt-auto d-flex justify-content-between align-items-center flex-wrap gap-2">

          <i
            role="button"
            aria-label={likedProducts?.has(product.id) ? 'Unlike' : 'Like'}
            className={`bi ${
              likedProducts?.has(product.id)
                ? 'bi-heart-fill text-danger'
                : 'bi-heart'
            }`}
            style={{
              cursor: 'pointer',
              fontSize: isSmall ? '1rem' : compact ? '1.1rem' : '1.2rem',
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (!isLoggedIn) {
                showNotification('Please log in to like this product.', 'error');
                return;
              }
              toggleLike(product.id);
            }}
          ></i>

          {(forceShowCartButton || !isSmall) && (
            <AddToCartButton
              onClick={onAddToCart}
              isLoading={addingToCartId === product.id}
            />
          )}

        </div>
       
      </div>
    </div>
  );
}

export default ProductCard;
