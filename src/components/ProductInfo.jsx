import React from "react";
import VariantSelector from "./VariantSelector";
import QuantitySelector from "./QuantitySelector";
import AddToCartButton from "./AddToCartButton";

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
      <h2 style={{ color: "var(--theme-soft-dark)" }}>{product.name}</h2>
      <p className="text-muted mb-1">
        <i className="bi bi-bag-fill me-2 text-soft-sold"></i>
        <span className="fw-semibold" style={{ color: "var(--theme-accent)" }}>
          {product.sold}
        </span>
      </p>
      <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end">
        {product.renderStars?.(product.rating)}
        <small className="rating-text">({product.reviews} reviews)</small>
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

      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      <div className="d-flex gap-3 mb-4">
        <i
          role="button"
          aria-label={likedProducts.has(product.id) ? "Unlike" : "Like"}
          className={`bi ${
            likedProducts.has(product.id)
              ? "bi-heart-fill text-danger"
              : "bi-heart"
          }`}
          onClick={() => toggleLike(product.id)}
          style={{
            cursor: "pointer",
            fontSize: "1.4rem",
          }}
        ></i>

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

            handleAddToCart(product, e, quantity);
          }}
          loading={addingToCartId === product.id}
          disabled={product.variants?.length > 0 && !selectedVariant}
        />
      </div>
    </>
  );
}

export default ProductInfo;
