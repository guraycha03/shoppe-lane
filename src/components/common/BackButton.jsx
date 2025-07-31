// src/components/common/BackButton.jsx

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './BackButton.css';

function BackButton({ label = "Back", className = "", scrollTop = true }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (scrollTop) window.scrollTo(0, 0);

    const lastProductPage = localStorage.getItem('lastProductPage');
    const currentPath = location.pathname;
    
    const shouldRedirect =
        ["/cart", "/profile", "/wishlist"].includes(currentPath) &&
        lastProductPage &&
        lastProductPage !== currentPath &&
        !lastProductPage.includes("/cart") &&
        !lastProductPage.includes("/profile") &&
        !lastProductPage.includes("/wishlist");

    if (shouldRedirect) {
      navigate(lastProductPage);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`btn btn-outline-secondary d-inline-flex align-items-center gap-2 mb-4 px-3 py-2 rounded back-button ${className}`}
      style={{ fontWeight: "500", fontSize: "1rem", borderWidth: '2px' }}
    >
      <ArrowLeft size={18} className="arrow-icon" />
      {label}
    </button>
  );
}

export default BackButton;
