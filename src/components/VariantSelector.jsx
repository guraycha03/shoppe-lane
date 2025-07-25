// src/components/VariantSelector.jsx

import React from 'react';

function VariantSelector({ product, selectedVariant, setSelectedVariant, setMainImage }) {
  if (!product.variants || product.variants.length === 0) return null;

  return (
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
              style={{ width: '100%', height: '90px', objectFit: 'cover' }}


            />
            <small className="d-block text-center mt-1" style={{ fontSize: '0.75rem' }}>
              {variant.name}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VariantSelector;
