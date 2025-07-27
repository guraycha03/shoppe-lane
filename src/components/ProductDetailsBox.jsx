// src/components/ProductDetailsBox.jsx

import React from 'react';

function ProductDetailsBox({ delivery, shipping, courier, guarantee }) {
  const detailRow = (icon, labelText, value, isLast = false) => (
    <div className={`d-flex align-items-start ${isLast ? '' : 'mb-2'}`}>
      <i className={`bi ${icon} me-2 text-soft-sold`} style={{ width: '1.25rem', marginTop: '2px' }}></i>
      <span className="label">{labelText}</span>
      <span className="flex-grow-1">{value}</span>
    </div>
  );

  return (
    <div className="card shadow-sm p-3 product-details-box">
      {detailRow("bi-truck", "Delivery:", delivery)}
      {detailRow("bi-box2-heart", "Shipping:", shipping)}
      {detailRow("bi-send-check", "Courier:", courier)}
      {detailRow("bi-shield-check", "Guarantees:", guarantee?.join(', '), true)}
    </div>
  );
}

export default ProductDetailsBox;

