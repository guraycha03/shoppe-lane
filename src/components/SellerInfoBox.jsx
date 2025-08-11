// src/components/SellerInfoBox.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useFollowState from '../hooks/useFollowState';
import { getFollowersCount } from '../utils/followStorage'; 
import '../App.css';


function SellerInfoBox({ seller, isLoggedIn, currentUser }) {
  if (!seller) return null;

  // top of SellerInfoBox.jsx (replace current top-of-file logic inside component)
  const navigate = useNavigate();

  // Resolve username robustly: prefer prop, then localStorage 'currentUser' object, then fallback 'username' key
  const resolvedUser = (() => {
    if (currentUser && String(currentUser).trim()) return String(currentUser).trim();
    try {
      const cu = JSON.parse(localStorage.getItem('currentUser') || '{}');
      if (cu && cu.username) return String(cu.username);
    } catch {}
    const simple = localStorage.getItem('username');
    if (simple) return String(simple);
    return ''; // final fallback
  })();

  const rawSellerId = seller.id ?? seller.name ?? '';
  const { hasFollowed, toggleFollow } = useFollowState(resolvedUser, rawSellerId);


  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    // set initial value from storage
    setFollowersCount(getFollowersCount(rawSellerId));

    const handler = (e) => {
      if (String(e.detail?.sellerId) === String(rawSellerId)) {
        setFollowersCount(e.detail.followers);
      }
    };

    window.addEventListener('followUpdated', handler);
    return () => window.removeEventListener('followUpdated', handler);
  }, [rawSellerId]);



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
  
    console.log(
      '[Follow Debug] isLoggedIn=',
      isLoggedIn,
      'prop currentUser=',
      currentUser,
      'resolvedUser=',
      resolvedUser,
      'sellerId=',
      rawSellerId
    );
    
  
    if (!isLoggedIn) {
      toast.warning('Please log in to follow sellers.');
      return;
    }
  
    if (!resolvedUser) {
      console.warn('[Follow Debug] No username resolved — cannot toggle.');
      toast.error('Unexpected login state. Please reload or sign in again.');
      return;
    }
  
    // call toggleFollow with resolvedUser (defensive)
    toggleFollow();

  };
  
  
  

  // Styles
  const getAvatarColor = (name) => {
    if (!name || typeof name !== 'string') return '#ccc';
    const hue = (name.charCodeAt(0) * 45) % 360;
    return `hsl(${hue}, 60%, 75%)`;
  };

  const avatarStyle = {
    width: '56px',
    height: '56px',
    backgroundColor: getAvatarColor(seller.name),
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    flexShrink: 0,
    textShadow: '0 1px 2px rgba(0,0,0,0.15)',
  };

  const followBtnStyle = {
    whiteSpace: 'nowrap',
    cursor: isLoggedIn ? 'pointer' : 'not-allowed',
    opacity: isLoggedIn ? 1 : 0.6,
  };

  return (
    <div
      className="card seller-box shadow-sm p-4 rounded-4 border-0 bg-seller-info"
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
              {formatFollowers(followersCount)} followers
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
