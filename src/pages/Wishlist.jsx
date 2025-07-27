import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

// Slugify seller name for store page route
const slugify = (str) =>
  str?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

const getDisplayPrice = (item) => {
  const rawPrice = item.price?.replace(/[^\d.]/g, '') || '0';
  const price = parseFloat(rawPrice);
  const discount = item.discount ? parseFloat(item.discount) : 0;

  if (!isNaN(discount) && discount > 0) {
    const discounted = price - (price * discount) / 100;
    return (
      <>
        <span className="text-danger fw-semibold">₱{discounted.toFixed(2)}</span>{' '}
        <span className="text-muted text-decoration-line-through small">
          ₱{price.toFixed(2)}
        </span>
      </>
    );
  }

  return <span className="text-secondary">₱{price.toFixed(2)}</span>;
};

function Wishlist({ wishlistItems, onToggleLike, likedProductIds = [] }) {
  return (
    <main className="container pt-2 pb-5" style={{ position: 'relative', paddingBottom: '60px' }}>
      <style>
        {`
          .visit-store-btn {
            background-color: #f5efe6;
            color: #5b4636;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          .visit-store-btn:hover {
            background-color: #e0d4c4;
            color: #3d2e23;
            transform: translateY(-2px);
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
          }

          .wishlist-heart-icon {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 2;
            font-size: 1.25rem;
            cursor: pointer;
          }
          .wishlist-heart-icon:hover {
            transform: scale(1.1);
            transition: transform 0.2s ease;
          }
        `}
      </style>

      <div className="mb-1" style={{ marginTop: '0rem' }}>
        <BackButton className="mb-1" />
      </div>

      <h2
        className="fw-bold text-center mb-4"
        style={{ fontSize: '1.9rem', color: '#888', marginTop: '-0.3rem' }}
      >
        My Wishlist
      </h2>

      <div className="row g-3">
        {Array.isArray(wishlistItems) && wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div key={item.id} className="col-6 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 p-3 shadow-sm position-relative d-flex flex-column justify-content-between">

                {/* ✅ Consistent heart icon behavior */}
                <i
                  className={`bi ${
                    likedProductIds.includes(item.id)
                      ? 'bi-heart-fill text-danger'
                      : 'bi-heart'
                  } wishlist-heart-icon`}
                  onClick={() => onToggleLike(item.id)}
                  role="button"
                  aria-label={likedProductIds.includes(item.id) ? 'Unlike' : 'Like'}
                  title={likedProductIds.includes(item.id) ? 'Unlike' : 'Like'}
                />

                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid mb-3 mx-auto d-block"
                    style={{ height: '150px', objectFit: 'contain' }}
                  />
                  <h6 className="text-muted fw-medium">{item.name}</h6>
                  <p className="mb-2">{getDisplayPrice(item)}</p>
                </div>

                {item.seller && (
                  <Link
                    to={`/store/${slugify(item.seller)}`}
                    className="btn btn-sm mt-auto visit-store-btn"
                  >
                    Visit Store
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted fs-5">Your wishlist is empty.</p>
        )}
      </div>
    </main>
  );
}

export default Wishlist;
