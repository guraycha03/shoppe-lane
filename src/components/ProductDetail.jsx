// src/components/ProductDetail.jsx ---

import { useEffect } from 'react';

function ProductDetail({
    product,
    quantity,
    setQuantity,
    handleAddToCart,
    likedProducts,
    toggleLike,
    renderStars,
    onClose,
    addingToCartId 
  }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <p>Product not found.</p>;

  const selectedProduct = product;

  return (
    <div
        className="product-modal"
        style={{
            backgroundColor: '#FAFAFF',
            paddingBottom: '4rem',
        }}
        >

            <div className="container py-5" style={{ backgroundColor: '#FAFAFF', color: '#3D3B3C' }}>
            <button
            className="btn btn-link text-muted"
            style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                fontSize: '1.25rem',
                zIndex: 10000
            }}
            onClick={onClose}
            >
            <i className="bi bi-arrow-left me-1"></i> Back
            </button>


            <div className="row g-5 align-items-start">
                <div className="col-md-5">
                <div className="rounded shadow-sm p-3" style={{ backgroundColor: '#FBF7F4' }}>
                    <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="img-fluid rounded"
                    style={{ width: '100%', maxHeight: '420px', objectFit: 'contain' }}
                    />
                </div>
                </div>

                <div className="col-md-7">
                <h2 className="fw-bold mb-2">{selectedProduct.name}</h2>
                <div className="d-flex align-items-center gap-2 mb-2">
                    {renderStars(selectedProduct.rating)}
                    <small style={{ color: '#797979' }}>{selectedProduct.rating} ({selectedProduct.reviews})</small>
                </div>
                <small className="d-block mb-2" style={{ color: '#797979' }}>{selectedProduct.sold}</small>
                <h4 className="fw-semibold" style={{ color: '#8B6F52' }}>{selectedProduct.price}</h4>
                <p className="mb-4" style={{ color: '#797979' }}>{selectedProduct.description}</p>

                <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="d-flex align-items-center">
                    <label htmlFor="qty" className="me-2 small">Qty:</label>
                    <div className="quantity-wrapper position-relative">
                        <input
                        type="number"
                        id="qty"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="form-control form-control-sm quantity-input"
                        style={{ width: '70px', backgroundColor: '#EDEBE4', borderColor: '#DADDD8', color: '#3D3B3C' }}
                        />
                        {quantity === 0 && <span className="ghost-zero">0</span>}
                    </div>
                    </div>

                    <button
                    className="btn rounded-pill px-4"
                    disabled={addingToCartId === selectedProduct.id}
                    style={{
                        backgroundColor: addingToCartId === selectedProduct.id ? '#ccc' : '#C1BDB3',
                        color: '#1C1C1C',
                        border: 'none',
                        cursor: addingToCartId === selectedProduct.id ? 'not-allowed' : 'pointer'
                    }}
                    onClick={(e) => handleAddToCart({ ...selectedProduct, quantity }, e)}
                    >
                    {addingToCartId === selectedProduct.id ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : (
                        <i className="bi bi-cart-plus me-2"></i>
                    )}
                    {addingToCartId === selectedProduct.id ? 'Adding...' : 'Add to Cart'}
                    </button>


                    <button className="btn rounded-pill px-4" style={{ backgroundColor: '#8B6F52', color: '#FBF7F4', border: 'none' }}>
                    <i className="bi bi-lightning-fill me-2"></i> Buy Now
                    </button>
                </div>

                <h6 className="fw-semibold mb-3 text-uppercase">Quick Info</h6>
                <ul className="list-unstyled small mb-4">
                    <li><strong>Delivery:</strong> {selectedProduct.delivery}</li>
                    <li><strong>Shipping:</strong> {selectedProduct.shipping}</li>
                    <li><strong>Courier:</strong> {selectedProduct.courier}</li>
                    <li><strong>Guarantee:</strong> {selectedProduct.guarantee.join(', ')}</li>
                </ul>

                <hr className="my-4" style={{ borderColor: '#DADDD8' }} />

                <h6 className="fw-semibold mb-3 text-uppercase">Specifications</h6>
                <ul className="list-unstyled small mb-0">
                {Object.entries(selectedProduct.specs).map(([key, value]) => {
                   
                    const formattedKey = key
                        .replace(/([A-Z])/g, ' $1')               // Insert space before capital letters
                        .replace(/^./, str => str.toUpperCase()); // Capitalize first letter

                    return (
                        <li key={key}>
                        <span className="label fw-medium">{formattedKey}:</span>{' '}
                        {Array.isArray(value) ? value.join(', ') : value}
                        </li>
                    );
                    })}


                </ul>

                <div className="mt-4 d-flex gap-3">
                    
                    <button
                    className={`btn rounded-pill ${likedProducts.has(selectedProduct.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                    onClick={() => toggleLike(selectedProduct.id)}
                    >
                    <i className={`bi ${likedProducts.has(selectedProduct.id) ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                    </button>

                </div>
                </div>
            </div>
            </div>
        </div>
  );
}

export default ProductDetail;
