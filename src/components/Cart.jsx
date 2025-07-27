import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton'; 

const Cart = ({ cartItems, updateCartQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  const checkoutRef = useRef(null);
  const checkoutStopRef = useRef(null);
  const [isFloating, setIsFloating] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFloating(!entry.isIntersecting); 
      },
      {
        root: null,
        threshold: 0.01,
        rootMargin: '0px 0px -100px 0px', 
      }
    );

    const stopEl = checkoutStopRef.current;
    if (stopEl) observer.observe(stopEl);

    return () => {
      if (stopEl) observer.unobserve(stopEl);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFloating(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    const stopElement = checkoutStopRef.current;
    if (stopElement) observer.observe(stopElement);

    return () => {
      if (stopElement) observer.unobserve(stopElement);
    };
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const selectedTotal = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => {
      const itemPrice = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
      return sum + itemPrice * item.quantity;
    }, 0);

  return (
    <main className="container pt-2 pb-5" style={{ position: 'relative', paddingBottom: '120px' }}>

      {/* Back Button */}
      <div className="mb-1" style={{ marginTop: '0rem' }}>
        <BackButton className="mb-1" />
      </div>

      <h2
        className="fw-bold text-center mb-3"
        style={{ fontSize: '1.9rem', color: '#888', marginTop: '-0.3rem' }}
      >
        My Cart
      </h2>



      {cartItems.length === 0 ? (
        <p className="text-center text-muted fs-5">Your cart is empty.</p>
      ) : (
        <div className="row g-4">
          {cartItems.map((item, idx) => (
            <div
              key={item.id}
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
                onChange={() => handleCheckboxChange(item.id)}
              />

              <div className="d-flex gap-3 flex-grow-1" style={{ alignItems: 'flex-start' }}>

                {/* Image */}
                <div
                  className="d-flex flex-column justify-content-between"
                  style={{ marginBottom: '1rem' }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain',
                      borderRadius: '0.75rem',
                      background: '#f8f8f8',
                      padding: '0.5rem',
                    }}
                  />

                  <div
                    className="fw-semibold text-muted mt-3"
                    style={{
                      fontSize: '1rem',
                      whiteSpace: 'nowrap',
                      minHeight: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      width: '120px',
                      justifyContent: 'flex-start',
                    }}
                  >
                    Total: ₱
                    {(
                      parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity
                    ).toFixed(2)}
                  </div>
                </div>

                {/* Details */}
                <div
                  className="d-flex flex-column justify-content-between w-100"
                  style={{ minHeight: '100px' }}
                >
                  <div>
                  <div style={{ paddingRight: '2.5rem' }}>
                    <h5 className="mb-1 cart-product-title">{item.name}</h5>
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
                {/* Action Buttons in bottom-right corner */}
                <div
                  className="cart-action-buttons"
                >
                  <button
                    className="btn btn-sm rounded-pill px-3 me-2"
                    style={{
                      backgroundColor: '#ffefef',
                      color: '#b30000',
                      border: '1px solid #f5c2c2',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                      minWidth: '90px',
                    }}
                    onClick={() => removeFromCart(item.id)}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = '#ffd6d6')
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = '#ffefef')
                    }
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
                      transition: 'all 0.2s',
                      whiteSpace: 'nowrap',
                      minWidth: '90px',
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = '#c8e6c9')
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = '#e3f7e3')
                    }
                  >
                    Place Order
                  </button>
                </div>



              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Checkout */}
     
      {selectedItems.length > 0 && (
        <div
          ref={checkoutStopRef}
          style={{
            height: '1px',
            marginTop: '4rem',
          }}
        ></div>
      )}


      <div ref={checkoutStopRef} style={{ height: '1px' }} />

      {/* Checkout Bar */}
      {selectedItems.length > 0 && (
        <div
          className={`bg-white shadow-sm px-4 py-3 rounded-4 d-flex justify-content-between align-items-center ${
            isFloating ? 'position-fixed bottom-0 start-0 end-0' : ''
          }`}
          style={{
            zIndex: 1050,
            maxWidth: '960px',
            margin: isFloating ? '0 auto' : '2rem auto 5rem',
            left: 0,
            right: 0,
            position: isFloating ? 'fixed' : 'relative',
          }}
        >
          <div className="d-flex flex-column">
            <span>Total Selected:</span>
            <span className="fw-bold fs-5">₱{selectedTotal.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-dark rounded-pill px-4 py-2"
            onClick={() => navigate('/order')}
          >
            Checkout
          </button>
        </div>
      )}


      {/* Stop point after last product */}
      {selectedItems.length > 0 && (
        <div ref={checkoutStopRef} style={{ height: '40px', marginTop: '4rem' }}></div>
      )}
    </main>
  );
};

export default Cart;
