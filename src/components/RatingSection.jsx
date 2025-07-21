import React, { useState, useEffect } from 'react'; // Add useEffect
import { useNavigate } from 'react-router-dom';


function RatingSection({ ratings, productId, isLoggedIn, showNotification }) {

  const navigate = useNavigate();
  const [likedIndices, setLikedIndices] = useState([]);

  const handleLike = (index) => {
    if (!isLoggedIn) {
      showNotification('Please log in to like reviews.', 'error');
      return;
    }
  
    // Proceed to like if logged in
    const updatedLikes = [...likedIndices];
    if (updatedLikes.includes(index)) {
      updatedLikes.splice(updatedLikes.indexOf(index), 1); // Unlike
    } else {
      updatedLikes.push(index); // Like
    }
    setLikedIndices(updatedLikes);
    localStorage.setItem(`likes-${productId}`, JSON.stringify(updatedLikes));
  };


  
  // Load likes from localStorage
  useEffect(() => {
    const username = localStorage.getItem('username') || 'guest';
    const key = `likes-${productId}-${username}`;
    const storedLikes = localStorage.getItem(key);
  
    if (storedLikes) {
      setLikedIndices(JSON.parse(storedLikes));
    } else {
      setLikedIndices([]); // If user has no likes, clear list
    }
  }, [productId, isLoggedIn]);
  

  // Toggle and store in localStorage
  const toggleLike = (index) => {
    const username = localStorage.getItem('username') || 'guest';
    const key = `likes-${productId}-${username}`;
  
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
  
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });
  };
  
  
  

  const starCounts = [0, 0, 0, 0, 0];
  ratings.forEach((r) => {
    starCounts[r.stars - 1]++;
  });

  const totalRatings = ratings.length;
  const showMore = totalRatings > 2;

  const getPercentage = (count) =>
    totalRatings === 0 ? 0 : (count / totalRatings) * 100;

  return (
    <div className="rating-section p-3 rounded shadow-sm" style={{ background: '#fdfcfa' }}>
      <h5 className="fw-semibold mb-3">User Ratings & Comments</h5>

      {/* Rating Bars */}
      <div className="mb-4">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = starCounts[star - 1];
          const percent = getPercentage(count);
          return (
            <div key={star} className="d-flex align-items-center mb-2">
              <div style={{ width: '60px' }}>{star} Star</div>
              <div className="flex-grow-1 bg-light rounded" style={{ height: '8px' }}>
                <div
                  className="bg-warning"
                  style={{
                    width: `${percent}%`,
                    height: '100%',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease',
                  }}
                ></div>
              </div>
              <span className="ms-2 text-muted" style={{ fontSize: '0.875rem' }}>{count}</span>
            </div>
          );
        })}
      </div>

      {/* User Comments */}
      <div>
        {ratings.length === 0 ? (
          <p className="text-muted">No ratings yet.</p>
        ) : (
          ratings.slice(0, 2).map((r, i) => {
            const randomBg = `hsl(${(r.user.charCodeAt(0) * 45) % 360}, 60%, 75%)`;
            const initials = r.user?.[0]?.toUpperCase() || 'U';
            const isLiked = likedIndices.includes(i);
            const baseLikes = typeof r.likes === 'number' ? r.likes : 0;
            const totalLikes = isLiked ? baseLikes + 1 : baseLikes;

            return (
              <div key={i} className="card mb-3 position-relative">
                <div className="card-body position-relative" style={{ paddingTop: '2.5rem' }}>
                  
                  {/* Like Icon + Count */}
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
                      color: isLiked ? '#a28f85' : '#ccc', // Liked = taupe, default = light gray
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

                  {/* Star Rating */}
                  <div className="mb-2">
                    {Array(r.stars)
                      .fill()
                      .map((_, idx) => (
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

      {/* Read More button */}
      {showMore && (
        <div className="text-center mt-3">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(`/reviews/${productId}`)}
          >
            Read More Reviews
          </button>
        </div>
      )}
    </div>
  );
}

export default RatingSection;
