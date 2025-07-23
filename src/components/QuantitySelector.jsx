// src/components/QuantitySelector.jsx

import React from 'react';

function QuantitySelector({ quantity, setQuantity }) {
  return (
    <div className="d-flex align-items-center gap-3 my-3">
      <button
        className="btn btn-outline-secondary"
        onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
      >
        −
      </button>
      <span>{quantity}</span>
      <button
        className="btn btn-outline-secondary"
        onClick={() => setQuantity((q) => q + 1)}
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
