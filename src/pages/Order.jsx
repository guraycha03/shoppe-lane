import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderItems = location.state?.items || [];

  console.log("🧾 ORDER ITEMS", orderItems);


  const handlePlaceOrder = () => {
    alert('Order placed!');
    navigate('/');
  };

  const getItemPrice = (item) =>
    parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;

  // Group items by seller
  const groupedBySeller = orderItems.reduce((groups, item) => {
    const sellerId = item?.sellerId?.toString().trim() || 'unknown';
    const sellerName = item?.seller?.trim() || 'Unknown Seller';
  
    if (!groups[sellerId]) {
      groups[sellerId] = {
        sellerId,
        sellerName,
        items: [],
      };
    }
  
    groups[sellerId].items.push(item);
    return groups;
  }, {});
  
  
  

  // Total per seller
  const getSellerTotal = (items) =>
    items.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0);

  // Grand total
  const total = orderItems.reduce(
    (sum, item) => sum + getItemPrice(item) * item.quantity,
    0
  );

  return (
    <div className="container py-4">
      <BackButton />
      <h2
        className="fw-bold text-center mb-4"
        style={{ fontSize: '1.9rem', color: '#444' }}
      >
        Review Your Order
      </h2>

      {orderItems.length === 0 ? (
        <p className="text-center text-muted">No items to order.</p>
      ) : (
        <>
          {Object.values(groupedBySeller).map(({ sellerId, sellerName, items }) => (
            <div key={sellerName}>
              <h5 className="mb-3" style={{ color: '#666' }}>
                🤍 <span className="fw-semibold">{sellerName}</span>
              </h5>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="d-flex align-items-start gap-3 p-3 mb-3 rounded-4 shadow-sm"
                  style={{
                    backgroundColor: '#fcfcfc',
                    border: '1px solid #eee',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      borderRadius: '0.75rem',
                      background: '#f6f6f6',
                      padding: '0.5rem',
                    }}
                  />

                  <div className="flex-grow-1">
                    <h6 className="mb-1 fw-semibold" style={{ color: '#444' }}>
                      {item.name}
                    </h6>
                    {item.variant && (
                      <div
                        className="text-muted small mb-1"
                        style={{ fontSize: '0.9rem' }}
                      >
                        Variant: {item.variant}
                      </div>
                    )}
                    <div
                      className="text-muted small mb-1"
                      style={{ fontSize: '0.9rem' }}
                    >
                      Qty: {item.quantity}
                    </div>
                    <div
                      className="px-3 py-1 rounded-pill bg-light d-inline-block mt-1"
                      style={{ fontSize: '0.85rem', color: '#777' }}
                    >
                      ₱{getItemPrice(item).toFixed(2)} each
                    </div>
                  </div>

                  <div
                    className="text-end fw-bold"
                    style={{ minWidth: '100px', color: '#555' }}
                  >
                    ₱{(getItemPrice(item) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}

          <div className="text-end mt-2 mb-4">
                <h6 className="fw-bold" style={{ color: '#555', fontSize: '1rem' }}>
                  Subtotal from {sellerName}:{' '}
                  <span className="ms-2">
                    ₱{getSellerTotal(items).toFixed(2)}
                  </span>
                </h6>
              </div>
              <hr />
            </div>
          ))}

          <div className="text-end mb-4">
            <h5 className="fw-bold" style={{ color: '#333' }}>
              Grand Total: <span className="ms-2">₱{total.toFixed(2)}</span>
            </h5>
          </div>

          <div className="text-center">
            <button
              className="btn btn-success px-4 py-2 rounded-pill"
              onClick={handlePlaceOrder}
              style={{ fontWeight: 500, fontFamily: 'Poppins, sans-serif' }}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
