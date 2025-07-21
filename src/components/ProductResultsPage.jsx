import { useParams, useLocation } from 'react-router-dom';
import Footer from './Footer';
import ProductGrid from './ProductGrid'; // use the same grid layout as homepage
import React from 'react';

function ProductResultsPage({
  products,
  handleAddToCart,
  likedProducts,
  toggleLike,
  renderStars,
  addingToCartId,
  triggerFlyToCartAnimation,
  isLoggedIn,             
  showNotification,    
}) {



  const { name } = useParams(); 
  const location = useLocation(); 

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('q');

  let filteredProducts = [];

  if (name) {
    filteredProducts = products.filter((product) =>
      product.categories?.some((cat) => cat.toLowerCase() === name.toLowerCase())
    );
  } else if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );
  }

  const label = name
    ? `Category: ${name}`
    : searchTerm
    ? `Search: "${searchTerm}"`
    : 'Results';

  return (
    <div className="container mt-4">
      {filteredProducts.length > 0 ? (
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

        
      ) : (
        <div className="text-center mt-5">
          <p className="text-muted">
            No products found for: <strong>{name || searchTerm || 'your query'}</strong>
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductResultsPage;
