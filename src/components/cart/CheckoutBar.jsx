// ✅ CheckoutBar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutBar = ({ isFloating, selectedTotal, selectedItems }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/order', { state: { items: selectedItems } });
  };

  return (
    <div
      className={`checkout-bar d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 px-4 py-3 ${
        isFloating ? 'floating-bar position-fixed bottom-0 start-0' : 'static-bar container'
      }`}
      style={{
        width: '100%',
        zIndex: 1050,
        left: 0,
        right: 0,
        backgroundColor: 'var(--theme-light)',
        boxShadow: isFloating ? '0 -2px 10px rgba(0, 0, 0, 0.05)' : 'none',
        borderTop: isFloating ? '1px solid var(--theme-border)' : 'none',
      }}
    >
      <div
        className="d-flex flex-wrap justify-content-between align-items-center w-100"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        <div style={{ fontFamily: 'Poppins, sans-serif' }}>
          <span className="d-block text-muted">Total Selected:</span>
          <span className="fw-bold fs-5 text-secondary">
            ₱{selectedTotal.toFixed(2)}
          </span>
        </div>

        <button
          className="btn rounded-pill px-4 py-2 mt-3 mt-md-0"
          style={{
            backgroundColor: 'var(--theme-accent)',
            color: 'white',
            border: 'none',
            fontWeight: 500,
            fontFamily: 'Poppins, sans-serif',
          }}
          onClick={handleCheckout}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = 'var(--theme-accent-hover)')}
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = 'var(--theme-accent)')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutBar;
