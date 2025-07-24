// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import CategorySection from '../components/CategorySection';
import axios from 'axios';

function Home({
  searchTerm,
  likedProducts,
  toggleLike,
  handleAddToCart,
  renderStars,
  addingToCartId,
  triggerFlyToCartAnimation,
  isLoggedIn,           
  showNotification   
}) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://687c9936918b6422432ebfe8.mockapi.io/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section text-white d-flex align-items-center justify-content-center text-center">
        <div className="hero-content">
          <h1 className="display-4 fw-bold">Welcome to Shoppe Lane</h1>
          <p className="lead">Discover timeless pieces curated for cozy, elegant living.</p>
        </div>
      </section>

      {/* Product Section */}
      <section className="container mt-0 mb-5">
        <h2 className="text-center mb-4">Featured Products</h2>

        <ProductGrid
          products={products}
          searchTerm={searchTerm}
          likedProducts={likedProducts}
          toggleLike={toggleLike}
          handleAddToCart={handleAddToCart}
          renderStars={renderStars}
          addingToCartId={addingToCartId}
          triggerFlyToCartAnimation={triggerFlyToCartAnimation}
          isLoggedIn={isLoggedIn}                
          showNotification={showNotification} 
        />
      </section>

      {/* Category Section */}
      <CategorySection />
    
    </>
  );
}

export default Home;
