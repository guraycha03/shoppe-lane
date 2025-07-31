// src/components/BuyNowButton.jsx
import React from "react";
import classNames from "classnames";
import "./AddToCartButton.css"; 

function BuyNowButton({ onClick, isLoading = false }) {
  const buttonClass = classNames("shoppe-minimal-btn", "shoppe-buy-now-btn", {
    loading: isLoading,
  });

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={onClick}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span className="ms-1">Processing...</span>
        </>
      ) : (
        <>
          <span className="cart-icon-wrapper">
            <i className="bi bi-lightning-charge-fill"></i>
          </span>
          <span>Buy Now</span>
        </>
      )}
    </button>
  );
}

export default BuyNowButton;
