import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import CategorySection from '../components/CategorySection';

import axios from 'axios';

// Utility to shuffle array
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Home({
  likedProducts,
  toggleLike,
  handleAddToCart,
  renderStars,
  addingToCartId,
  triggerFlyToCartAnimation,
  isLoggedIn,
  showNotification,
}) {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://687c9936918b6422432ebfe8.mockapi.io/api/products')
      .then((response) => {
        setProducts(response.data);
        // shuffle and take 4 for featured
        const shuffled = shuffleArray(response.data);
        setFeaturedProducts(shuffled.slice(0, 4));
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section text-white d-flex align-items-center justify-content-center text-center">
        <div className="hero-content container-sm">
          <h1 className="display-4 fw-bold">Welcome to Shoppe Lane</h1>
          <p className="lead">Discover timeless pieces curated for cozy, elegant living.</p>
        </div>
      </section>

      {/* Featured Products Section - NOT filtered by searchTerm */}
      <section className="container mt-0 mb-5">
        <h2 className="text-center mt-5 mb-4">Featured Products</h2>

        <ProductGrid
          products={featuredProducts}
          likedProducts={likedProducts}
          toggleLike={toggleLike}
          handleAddToCart={handleAddToCart}
          renderStars={renderStars}
          addingToCartId={addingToCartId}
          triggerFlyToCartAnimation={triggerFlyToCartAnimation}
          isLoggedIn={isLoggedIn}
          showNotification={showNotification}
        />

        {/* Show All Products Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-primary px-4 py-2"
            onClick={() => navigate('/products')}
            style={{ fontWeight: '600', fontSize: '1.1rem' }}
            aria-label="Show all products"
          >
            Show All Products
          </button>
        </div>
      </section>

      {/* Category Section */}
      <CategorySection />
    </>
  );
}

export default Home;
