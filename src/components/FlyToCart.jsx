// src/components/FlyToCart.jsx
import React, { useEffect, useRef } from 'react';
import './FlyToCart.css';

const FlyToCart = ({ trigger }) => {
  const flyRef = useRef();

  useEffect(() => {
    if (!trigger || !flyRef.current) return;

    const { startX, startY, endX, endY } = trigger;

    const fly = flyRef.current;
    fly.style.display = 'block';
    fly.style.left = `${startX}px`;
    fly.style.top = `${startY}px`;

    // Force reflow
    void fly.offsetWidth;

    fly.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(0.2)`;
    fly.style.opacity = 1;

    const cleanup = () => {
      fly.style.display = 'none';
      fly.style.transform = 'none';
      fly.style.opacity = 0;
    };

    const timer = setTimeout(cleanup, 600);

    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <img
      ref={flyRef}
      className="fly-image"
      src="/images/fly-cart-icon.png" // ← use your cart icon path
      alt="fly"
    />
  );
};

export default FlyToCart;
