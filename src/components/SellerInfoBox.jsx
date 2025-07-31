import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useFollowState from '../hooks/useFollowState';
import { getFakeFollowers } from '../utils/fakeFollowers'; 
import '../App.css';

function SellerInfoBox({ seller, isLoggedIn, currentUser }) {
  const navigate = useNavigate();
  const { hasFollowed, toggleFollow } = useFollowState(
    currentUser || '',
    seller?.id || ''
  );
  
  const initialFollowers = seller.followers ?? getFakeFollowers(seller.id);


  if (!seller) return null;

  // Utilities
  const slugify = (str) =>
    str?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  const getInitials = (name) =>
    name
      ?.split(' ')
      .map((word) => word[0]?.toUpperCase())
      .join('')
      .slice(0, 2) || '?';

  const formatFollowers = (num) => {
    const n = parseInt(num, 10);
    if (isNaN(n) || n < 1) return '0';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace('.0', '') + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1).replace('.0', '') + 'k';
    return n.toString();
  };

  const handleFollow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      toast.warning('Please log in to follow sellers.');
      return;
    }

    toggleFollow();
  };

  // Styles
  const avatarStyle = {
    width: '56px',
    height: '56px',
    backgroundColor: '#D8C3B1',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    flexShrink: 0,
  };

  const followBtnStyle = {
    whiteSpace: 'nowrap',
    cursor: isLoggedIn ? 'pointer' : 'not-allowed',
    opacity: isLoggedIn ? 1 : 0.6,
  };

  return (
    <div
      className="card seller-box shadow-sm p-4 rounded-4 border-0"
      style={{ background: '#FFF8F3' }}
      role="region"
      aria-label={`Seller Info: ${seller.name}`}
    >
      <div className="d-flex justify-content-between align-items-center">
        {/* LEFT SIDE */}
        <div
          onClick={() => navigate(`/store/${slugify(seller.name)}`)}
          style={{ cursor: 'pointer' }}
          className="d-flex align-items-center gap-3 flex-grow-1"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigate(`/store/${slugify(seller.name)}`)}
          aria-label={`Visit ${seller.name}'s store`}
        >
          <div
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={avatarStyle}
            aria-hidden="true"
          >
            {getInitials(seller.name)}
          </div>

          <div>
            <h6 className="mb-1 text-accent d-flex align-items-center gap-2">
              <i className="bi bi-shop-window"></i>
              {seller.name || 'Unknown Seller'}
            </h6>
            <p className="mb-0 text-muted">
              <i className="bi bi-people-fill me-1 text-accent"></i>
              {formatFollowers(initialFollowers)} followers

            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="text-end">
          <button
            onClick={handleFollow}
            type="button"
            className={`btn btn-sm px-3 ${
              hasFollowed ? 'btn-secondary' : 'btn-outline-secondary'
            }`}
            style={followBtnStyle}
            disabled={!isLoggedIn}
            aria-pressed={hasFollowed}
            aria-label={hasFollowed ? 'Unfollow seller' : 'Follow seller'}
          >
            {hasFollowed ? 'Following' : isLoggedIn ? 'Follow' : 'Log in to Follow'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerInfoBox;
