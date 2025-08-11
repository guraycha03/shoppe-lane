import React, { useState, useEffect, useRef } from 'react';
import ProductGrid from '../components/ProductGrid';
import SubHeader from '../components/SubHeader';  // import it
import axios from 'axios';

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function AllProductsPage({
  likedProducts,
  toggleLike,
  handleAddToCart,
  renderStars,
  addingToCartId,
  triggerFlyToCartAnimation,
  isLoggedIn,
  showNotification,
}) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for SubHeader controls (simulate how it is used on Home)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const subHeaderRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://687c9936918b6422432ebfe8.mockapi.io/api/products')
      .then((res) => {
        setProducts(shuffleArray(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products.');
        setLoading(false);
      });
  }, []);

  // Collect categories from products for SubHeader
  const categories = React.useMemo(() => {
    if (!products || products.length === 0) return ['All'];
  
    const uniqueCats = new Set();
  
    products.forEach((p) => {
      let cat = p.category;
      if (!cat || typeof cat !== 'string' || cat.trim() === '') {
        cat = 'Uncategorized';
      } else {
        cat = cat.trim();
      }
      uniqueCats.add(cat);
    });
  
    return ['All', ...uniqueCats];
  }, [products]);
  
  
  

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5 text-danger">
        <p>{error}</p>
      </div>
    );
  }

  console.log('categories:', categories);
  console.log('selectedCategory:', selectedCategory);
  console.log('products:', products?.length);


  return (
    <>
      {/* Show SubHeader here */}
      <SubHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        subHeaderRef={subHeaderRef}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showMobileDropdown={showMobileDropdown}
        setShowMobileDropdown={setShowMobileDropdown}
      />

      <div className="container" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
        <h2 className="text-center mb-4">All Products</h2>
        <ProductGrid
          products={
            selectedCategory === 'All'
              ? products
              : products.filter(p => p.category === selectedCategory)
          }
          likedProducts={likedProducts}
          toggleLike={toggleLike}
          handleAddToCart={handleAddToCart}
          renderStars={renderStars}
          addingToCartId={addingToCartId}
          triggerFlyToCartAnimation={triggerFlyToCartAnimation}
          isLoggedIn={isLoggedIn}
          showNotification={showNotification}
        />
      </div>
    </>
  );
}

export default AllProductsPage;
