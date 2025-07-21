

import React, { useEffect, useState } from 'react';
// import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import axios from 'axios';


function Recommendations({
  // products,
  selectedProduct,
  setSelectedProduct,
  likedProducts,
  toggleLike,
  handleAddToCart, 
  renderStars,
  addingToCartId,
  triggerFlyToCartAnimation,
  isLoggedIn, 
  showNotification,
}) {



  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://687c9936918b6422432ebfe8.mockapi.io/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching recommended products:', error));
  }, []);


  return (
    <>
      {/* Divider with ribbon icon */}
      <div className="my-5 text-center position-relative">
  <hr
    style={{
      border: 'none',
      height: '2px',
      backgroundColor: '#C1BDB3',
      opacity: 0.8,
    }}
  />
  <span
    style={{
      position: 'absolute',
      top: '55%', // slightly lower than center
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    <img
        src="/images/gift-bow.svg"
        alt="Ribbon"
        className="gift-divider-icon"
        style={{
            width: '45px',
            height: '45px',
            objectFit: 'contain',
            background: 'transparent',
        }}
        />

  </span>
</div>

<h4 className="mb-4 text-center" style={{ color: '#3D3B3C' }}>
  You might also like
</h4>




      <div className="container">

        <div className="row gx-4 gy-4">
        {products
            .filter((p) => p.id !== selectedProduct.id)
            .slice(0, 4)
            .map((product) => (
                <div className="col-6 col-md-4 col-lg-3" key={product.id}>
                    <div
                        className="card h-100 border-0 shadow-sm mx-auto"
                        role="button"
                        onClick={() => navigate(`/product/${product.id}`)}


                        style={{
                        backgroundColor: '#FBF7F4',
                        borderRadius: '0.75rem',
                        transition: 'transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.015)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                    <div
                        style={{
                            width: '100%',
                            aspectRatio: '1 / 1',
                            backgroundColor: '#EDEBE4',
                            borderTopLeftRadius: '0.75rem',
                            borderTopRightRadius: '0.75rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '1rem', // Equal spacing on all sides
                            boxSizing: 'border-box',
                        }}
                        >

                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        }}
                    />
                    </div>

                <div className="card-body d-flex flex-column px-2 pt-3 pb-3">
                <h6
                  className="fw-bold mb-2 text-truncate"
                  style={{ color: '#3D3B3C', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}
                >
                  {product.name}
                </h6>


                  <div
                    className="d-flex align-items-center mb-2 gap-1"
                    style={{ fontSize: '0.85rem' }}
                  >
                    {renderStars(product.rating)}
                    <small style={{ color: '#797979' }}>
                      {product.rating} ({product.reviews})
                    </small>
                  </div>

                  <small className="text-muted mb-2">{product.sold}</small>

                  <div className="mt-auto d-flex justify-content-between align-items-center flex-wrap gap-2">

                  <span className="fw-medium" style={{ color: '#8B6F52', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' }}>
                    {product.price}
                  </span>


                    <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end" style={{ rowGap: '0.5rem' }}>

                      <i
                        role="button"
                        aria-label={likedProducts.has(product.id) ? 'Unlike' : 'Like'}
                        className={`bi ${
                          likedProducts.has(product.id)
                            ? 'bi-heart-fill text-danger'
                            : 'bi-heart'
                        }`}
                        style={{
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isLoggedIn) {
                            showNotification('Please log in to like this product.', 'error');
                            return;
                          }
                          toggleLike(product.id);
                        }}
                        
                      ></i>

                      <AddToCartButton
                        onClick={(e) => {
                          e.stopPropagation();

                          if (!isLoggedIn) {
                            showNotification('Please log in to add items to your cart.');
                            return;
                          }

                          if (triggerFlyToCartAnimation) {
                            triggerFlyToCartAnimation(e);
                          }

                          handleAddToCart(product, e);
                        }}
                        loading={addingToCartId === product.id}
                      />



                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          ))}
        </div>
   
      </div>
    </>
  );
}

export default Recommendations;
