import React from "react";
import VariantSelector from "./VariantSelector";
import QuantitySelector from "./QuantitySelector";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import { buildCartItem } from '../utils/cartUtils';


function ProductInfo({
  product,
  selectedVariant,
  setSelectedVariant,
  mainImageSetter,
  notification,
  quantity,
  setQuantity,
  toggleLike,
  likedProducts,
  handleAddToCart,
  isLoggedIn,
  setNotification,
  triggerFlyToCartAnimation,
  addingToCartId,
}) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-start mb-1">
        <h2 style={{ color: "var(--theme-soft-dark)", marginBottom: 0 }}>{product.name}</h2>
        <i
          role="button"
          aria-label={likedProducts.has(product.id) ? "Unlike" : "Like"}
          className={`bi ${
            likedProducts.has(product.id) ? "bi-heart-fill text-danger" : "bi-heart"
          }`}
          onClick={() => toggleLike(product.id)}
          style={{
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        ></i>
      </div>

      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

        {/* Sold Info */}
        <div className="text-muted d-flex align-items-center">
          <i className="bi bi-bag-fill me-2 text-soft-sold"></i>
          <span className="fw-semibold" style={{ color: "var(--theme-accent)" }}>
            {product.sold}
          </span>
        </div>

        {/* Reviews Info */}
        <div className="text-muted d-flex align-items-center gap-2">
          <i className="bi bi-chat-left-text text-secondary"></i>
          {product.renderStars?.(product.rating)}
          <small className="rating-text">({product.reviews} reviews)</small>
        </div>
      </div>

      <p className="text-muted mt-2">{product.description}</p>
      <h4 style={{ color: "var(--theme-accent)" }}>{product.price}</h4>

      <VariantSelector
        product={product}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        setMainImage={mainImageSetter}
      />

      {notification && (
        <div
          className="alert alert-warning d-flex align-items-center gap-2 px-3 py-2"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle-fill text-warning"></i>
          <span>{notification}</span>
        </div>
      )}

      <div className="d-flex align-items-center gap-3 flex-wrap mb-4 mt-3">
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
         {/* Add To Cart Button */}
         <AddToCartButton
            onClick={(e) => {
              e.stopPropagation();

              if (!isLoggedIn) {
                setNotification("Please log in to add items to your cart.");
                setTimeout(() => setNotification(""), 3000);
                return;
              }

              if (product.variants?.length > 0 && !selectedVariant) {
                setNotification("Please select a color before adding to cart.");
                setTimeout(() => setNotification(""), 3000);
                return;
              }

              if (triggerFlyToCartAnimation) {
                triggerFlyToCartAnimation(e);
              }

              const cartItem = buildCartItem(product, quantity, selectedVariant);
              handleAddToCart(cartItem, e);
            }}
            loading={addingToCartId === product.id}
            disabled={product.variants?.length > 0 && !selectedVariant}
          />

        {/* Buy Now Button */}
        <BuyNowButton
          onClick={() => {
            if (!isLoggedIn) {
              setNotification("Please log in to purchase.");
              setTimeout(() => setNotification(""), 3000);
              return;
            }

            if (product.variants?.length > 0 && !selectedVariant) {
              setNotification("Please select a color before purchasing.");
              setTimeout(() => setNotification(""), 3000);
              return;
            }

            // Simulate checkout
            alert("Redirecting to checkout...");
          }}
        />
        
      </div>
    </>
  );
}

export default ProductInfo;
