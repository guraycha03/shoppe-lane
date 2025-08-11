import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductGrid from './ProductGrid'; 
import { slugify } from '../utils/slugify';
import axios from 'axios';

function ProductResultsPage({
  handleAddToCart,
  likedProducts,
  toggleLike,
  renderStars,
  addingToCartId,
  triggerFlyToCartAnimation,
  isLoggedIn,             
  showNotification,    
}) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products internally
  useEffect(() => {
    setLoading(true);
    axios.get('https://687c9936918b6422432ebfe8.mockapi.io/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products.');
        setLoading(false);
      });
  }, []);

  // helper to get nicer category name from slug
  function getCategoryNameFromSlug(slug, categories) {
    if (!categories) return slug;
    const found = categories.find(cat => slugify(cat) === slug);
    return found || slug;
  }

  const { name } = useParams(); 
  const location = useLocation(); 
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q');

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

  // filter products based on URL param or search term
  let filteredProducts = [];

  if (Array.isArray(products)) {
    if (name) {
      filteredProducts = products.filter(product => 
        product.categories?.some(cat => slugify(cat) === name)
      );
    } else if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredProducts = products.filter(
        product =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      );
    } else {
      filteredProducts = products; // show all if no filter
    }
  }

  const label = name
    ? `Category: ${getCategoryNameFromSlug(name, products?.flatMap(p => p.categories) || [])}`
    : searchTerm
    ? `Search: "${searchTerm}"`
    : 'Results';

  return (
    <div className="container" style={{ paddingTop: '30px' }}>

      <h3 className="mb-4">{label}</h3>

      {filteredProducts.length > 0 ? (
        <ProductGrid
          products={filteredProducts}
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
      ) : (
        <div className="text-center mt-5">
          <p className="text-muted">
            No products found for <strong>{name || searchTerm || 'your query'}</strong>
          </p>
          {name && (
            <p>
              Try exploring other categories or use the search box above.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductResultsPage;
