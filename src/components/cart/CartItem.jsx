// components/cart/CartItem.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item, selectedItems, onCheckboxChange, updateCartQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;

  return (
    <div
      className="col-12 p-3 rounded-4 shadow-sm position-relative"
      style={{
        background: '#fff',
        border: '1px solid #eee',
        fontFamily: 'inherit',
      }}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        className="custom-checkbox position-absolute top-0 end-0 m-3"
        checked={selectedItems.includes(item.id)}
        onChange={() => onCheckboxChange(item.id)}
      />

      <div
        className="d-flex flex-column flex-md-row gap-3 flex-grow-1"
        style={{ alignItems: 'flex-start' }}
      >

        {/* Image */}
        <div className="d-flex flex-column justify-content-between" style={{ marginBottom: '1rem' }}>
          <div onClick={() => navigate(`/product/${item.id}`, { state: { from: '/cart' } })} style={{ cursor: 'pointer' }}>
            <img
              src={item.image}
              alt={item.name}
              className="img-fluid rounded"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'contain',
                borderRadius: '0.75rem',
                background: '#f8f8f8',
                padding: '0.5rem',
              }}
            />
          </div>
          <div className="fw-semibold text-muted mt-3" style={{ fontSize: '1rem', minHeight: '24px', width: '120px' }}>
            Total: ₱{(itemPrice * item.quantity).toFixed(2)}
          </div>
        </div>

        {/* Details */}
        <div className="d-flex flex-column justify-content-between w-100" style={{ minHeight: '100px' }}>
          <div>
            <div style={{ paddingRight: '2.5rem' }}>
            <h5
              className="mb-1 cart-product-title"
              style={{ color: '#555', fontWeight: '600', fontSize: '1.1rem' }}  // lighter, clean typography
            >
              {item.name}
            </h5>

              {item.variant && (
                <p className="text-muted small mt-1">
                  Variant: <strong>{item.variant}</strong>
                </p>
              )}

              <p className="mb-2 text-muted">{item.price}</p>
            </div>

            {/* Quantity Controls */}
            <div className="d-flex align-items-center gap-2 mb-2">
              <button
                className="btn btn-outline-secondary btn-sm rounded"
                style={{ width: '32px', height: '32px', padding: 0 }}
                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span className="px-2">{item.quantity}</span>
              <button
                className="btn btn-outline-secondary btn-sm rounded"
                style={{ width: '32px', height: '32px', padding: 0 }}
                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="cart-action-buttons">
          <button
            className="btn btn-sm rounded-pill px-3 me-2"
            style={{
              backgroundColor: '#ffefef',
              color: '#b30000',
              border: '1px solid #f5c2c2',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              minWidth: '90px',
            }}
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>

          <button
            className="btn btn-sm rounded-pill px-3"
            style={{
                backgroundColor: '#e3f7e3',
                color: '#2e7d32',
                border: '1px solid #c5e1c5',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                minWidth: '90px',
            }}
            onClick={() => navigate('/order', { state: { items: [item] } })}
            >
            Order
            </button>

        </div>
      </div>
    </div>
  );
};

export default CartItem;
