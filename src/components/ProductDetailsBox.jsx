// src/components/ProductDetailsBox.jsx

import React from 'react';

function ProductDetailsBox({ delivery, shipping, courier, guarantee }) {
  return (
    <div className="card shadow-sm p-3 product-details-box">
      <p className="mb-1">
        <i className="bi bi-truck me-2 text-accent"></i>
        <span className="label">Delivery:</span> {delivery}
      </p>
      <p className="mb-1">
        <i className="bi bi-box2-heart me-2 text-accent"></i>
        <span className="label">Shipping:</span> {shipping}
      </p>
      <p className="mb-1">
        <i className="bi bi-send-check me-2 text-accent"></i>
        <span className="label">Courier:</span> {courier}
      </p>
      <p className="mb-0">
        <i className="bi bi-shield-check me-2 text-accent"></i>
        <span className="label">Guarantees:</span> {guarantee?.join(', ')}
      </p>
    </div>
  );
}

export default ProductDetailsBox;
