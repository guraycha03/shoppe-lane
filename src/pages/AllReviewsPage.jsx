import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productReviews from '../data/productReviews';

function AllReviewsPage({ showNotification, isLoggedIn }) {
  const { id } = useParams();
  const reviews = productReviews[id] || [];
  const [likedIndices, setLikedIndices] = useState([]);

  // Sync like states only when logged in
  useEffect(() => {
    if (isLoggedIn) {
      const storedLikes = localStorage.getItem(`likes-${id}`);
      if (storedLikes) {
        setLikedIndices(JSON.parse(storedLikes));
      }
    } else {
      setLikedIndices([]); // Hide all likes when logged out
    }
  }, [id, isLoggedIn]);

  const toggleLike = (index) => {
    if (!isLoggedIn) {
      showNotification("Please log in to like reviews.", "error");
      return;
    }

    setLikedIndices((prev) => {
      let updated;
      if (prev.includes(index)) {
        updated = prev.filter((i) => i !== index);
      } else {
        updated = [...prev, index];
      }
      localStorage.setItem(`likes-${id}`, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">All Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-muted">No reviews available for this product.</p>
      ) : (
        reviews.map((r, i) => {
          const randomBg = `hsl(${(r.user.charCodeAt(0) * 45) % 360}, 60%, 75%)`;
          const initials = r.user?.[0]?.toUpperCase() || 'U';
          const isLiked = likedIndices.includes(i);
          const baseLikes = typeof r.likes === 'number' ? r.likes : 0;
          const totalLikes = isLiked ? baseLikes + 1 : baseLikes;

          return (
            <div key={i} className="card mb-3 position-relative shadow-sm">
              <div className="card-body position-relative" style={{ paddingTop: '2.5rem' }}>

                {/* Like Icon */}
                <div
                  className="position-absolute d-flex align-items-center"
                  style={{
                    top: '10px',
                    right: '10px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    gap: '4px',
                    transition: 'opacity 0.2s ease',
                    opacity: isLiked ? 1 : 0.7,
                  }}
                  onClick={() => toggleLike(i)}
                >
                  <i
                    className={`bi ${isLiked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'}`}
                    style={{
                      fontSize: '1.1rem',
                      color: isLiked ? '#a28f85' : '#ccc',
                      transition: 'color 0.3s ease',
                    }}
                  ></i>
                  <span className="text-muted">{totalLikes}</span>
                </div>

                {/* Profile + Username */}
                <div className="d-flex align-items-center mb-2">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white me-2"
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: randomBg,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    }}
                  >
                    {initials}
                  </div>
                  <span className="fw-semibold text-muted">{r.user}</span>
                </div>

                {/* Stars */}
                <div className="mb-2">
                  {Array(r.stars).fill().map((_, idx) => (
                    <i key={idx} className="bi bi-star-fill text-warning me-1"></i>
                  ))}
                </div>

                {/* Comment */}
                <p className="card-text text-muted">{r.comment}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default AllReviewsPage;
