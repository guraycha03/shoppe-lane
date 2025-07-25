// src/components/AddToCartButton.jsx

import React from 'react';
import classNames from 'classnames';
import './AddToCartButton.css';

function AddToCartButton({ onClick, isLoading = false }) {
  const buttonClass = classNames('shoppe-minimal-btn', {
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
          <span className="ms-1">Adding...</span>
        </>
      ) : (
        <>
          <span className="cart-icon-wrapper">
            <i className="bi bi-cart2"></i>
          </span>
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
}

export default AddToCartButton;