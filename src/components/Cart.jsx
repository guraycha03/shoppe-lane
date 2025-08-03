import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton'; 
import CartItem from '../components/cart/CartItem';
import CheckoutBar from '../components/cart/CheckoutBar';

const Cart = ({ cartItems, updateCartQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const checkoutStopRef = useRef(null);
  const [isFloating, setIsFloating] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((entry) => entry.isIntersecting);
        setIsFloating(!anyVisible); // stop floating if any is visible
      },
      {
        root: null,
        threshold: 0.01,
        rootMargin: '0px 0px -100px 0px',
      }
    );
  
    const stopEl = checkoutStopRef.current;
    const footerEl = document.querySelector('#page-footer');
  
    if (stopEl) observer.observe(stopEl);
    if (footerEl) observer.observe(footerEl);
  
    return () => {
      if (stopEl) observer.unobserve(stopEl);
      if (footerEl) observer.unobserve(footerEl);
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
    <>
      <main className="container pt-2" style={{ paddingBottom: selectedItems.length > 0 ? '80px' : '0' }}>

        {/* Back Button */}
        <div className="mb-1">
          <BackButton />
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
            {[...cartItems].reverse().map((item) => (
              <CartItem
                key={item.id}
                item={item}
                selectedItems={selectedItems}
                onCheckboxChange={handleCheckboxChange}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>
        )}

        {/* Stop point for floating checkout bar */}
        {selectedItems.length > 0 && (
          <div ref={checkoutStopRef} style={{ height: '1px', marginTop: '0.5rem' }} />
        )}

      </main>

      {/* Checkout Bar */}
      {selectedItems.length > 0 && (
        <CheckoutBar
          isFloating={isFloating}
          selectedTotal={selectedTotal}
          selectedItems={cartItems.filter((item) => selectedItems.includes(item.id))}
        />
      )}

    </>
  );
};

export default Cart;
