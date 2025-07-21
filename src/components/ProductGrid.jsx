import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

function ProductGrid({
  products = [],
  searchTerm = '',
  likedProducts,
  toggleLike,
  handleAddToCart,
  renderStars,
  addingToCartId,
  triggerFlyToCartAnimation, 
  isLoggedIn,           
  showNotification   

}) {

  const navigate = useNavigate();

  const filtered = products.filter((product) =>
    product.name?.toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  return (
    <main className="container pb-5 mt-4">
      <div className="row gx-4 gy-4">
        {filtered.map((product) => {
          const onAddToCart = (e) => {
            e.stopPropagation();
          
            if (!isLoggedIn) {
              showNotification('Please log in to add items to your cart.');
              return;
            }
          
            if (addingToCartId === product.id) return;
          
            if (triggerFlyToCartAnimation) {
              triggerFlyToCartAnimation(e);
            }
          
            handleAddToCart(product, e);
          };
          
          
          
          return (
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
                    padding: '1rem',
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
                    <span style={{ fontSize: '0.65rem', marginRight: '0.25rem' }}>
                      {renderStars(product.rating)}
                    </span>

                    <small style={{ color: '#797979' }}>
                      {product.rating} ({product.reviews})
                    </small>
                  </div>

                  <small className="text-muted mb-2">{product.sold}</small>

                  <div className="mt-auto d-flex justify-content-between align-items-center flex-wrap gap-2">

                  <span className="fw-medium" style={{ color: '#8B6F52', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' }}>
                    {product.price}
                  </span>


                    <div
                      className="d-flex align-items-center justify-content-between gap-2 flex-wrap"
                      style={{ rowGap: '0.5rem' }} // helps stack nicely on small screens
                    >
                      <i
                        className={`bi ${
                          likedProducts?.has(product.id) ? 'bi-heart-fill text-danger' : 'bi-heart'
                        }`}
                        role="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isLoggedIn) {
                            showNotification('Please log in to like this product.');
                            return;
                          }
                          toggleLike(product.id);
                        }}
                        
                        style={{
                          fontSize: '1.2rem',
                          cursor: 'pointer',
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
          );
        })}
      </div>
    </main>
  );
}

export default ProductGrid;
