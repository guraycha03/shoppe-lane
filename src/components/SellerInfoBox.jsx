import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useFollowState from '../hooks/useFollowState';
import '../App.css';
import {
  getFollowState,
  setFollowState,
  getFollowersCount,
  setFollowersCount,
} from '../utils/followStorage';

function SellerInfoBox({ seller, isLoggedIn, currentUser }) {
  // const storageKey = `follow_seller_${seller?.id}_${currentUser || 'guest'}`;
  // const storageFollowersKey = `followers_seller_${seller?.id}`;
  
  const isFollowing = useFollowState(currentUser, seller.id);
  const navigate = useNavigate();
  const slugify = (str) =>
    str?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  const formatFollowers = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace('.0', '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace('.0', '') + 'k';
    return num.toString();
  };

  // const getInitialFollowState = () => {
  //   return localStorage.getItem(storageKey) === 'true';
  // };

  // const getInitialFollowers = () => {
  //   const saved = localStorage.getItem(storageFollowersKey);
  //   return saved ? parseInt(saved) : seller?.followers ?? 0;
  // };

  const getInitialFollowState = () => {
    return getFollowState(currentUser, seller?.id);
  };
  
  const getInitialFollowers = () => {
    return getFollowersCount(seller?.id) || seller?.followers || 0;
  };

  // const [hasFollowed, setHasFollowed] = useState(false);

  const [hasFollowed, setHasFollowed] = useState(getInitialFollowState());

  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    if (!currentUser || !seller?.id) return;
  
    const updateFollowState = () => {
      const followed = getFollowState(currentUser, seller.id);
      const count = getFollowersCount(seller.id) || seller.followers || 0;
  
      setHasFollowed(followed);
      setFollowers(count);
    };
  
    updateFollowState();
  
    const onStorageChange = (e) => {
      if (
        e.key === "user_follow_map_sync" ||
        e.key === "followers_count_map_sync"
      ) {
        updateFollowState();
      }
    };
    
  
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, [currentUser, seller?.id]);

  const toggleFollow = () => {
    const updatedFollowState = !hasFollowed;
  
    setFollowState(currentUser, seller.id, updatedFollowState);
  
    const newCount = updatedFollowState ? followers + 1 : followers - 1;
    setFollowersCount(seller.id, newCount);

    setHasFollowed(updatedFollowState);
    setFollowers(newCount);
  
    localStorage.setItem("user_follow_map_sync", Date.now().toString());
    localStorage.setItem('followers_count_map_sync', Date.now().toString());
    window.dispatchEvent(new Event('follow-state-changed'));
  };
  
  

  const handleFollow = (e) => {
    e.stopPropagation(); 
    e.preventDefault();  
  
    if (!isLoggedIn) {
      toast.warning("Please log in to follow sellers.");
      return;
    }
  
    const updatedFollowState = !hasFollowed;
    setFollowState(currentUser, seller.id, updatedFollowState);
  
    const newCount = updatedFollowState ? followers + 1 : followers - 1;
    setFollowersCount(seller.id, newCount);
  
    setHasFollowed(updatedFollowState);
    setFollowers(newCount);
  
    // Sync across tabs
    localStorage.setItem("user_follow_map_sync", Date.now().toString());

    localStorage.setItem("followers_count_map_sync", Date.now().toString());

    window.dispatchEvent(new Event("follow-state-changed"));
  };
  

  return (
    <div
      className="card seller-box shadow-sm p-4 rounded-4 border-0"
      style={{ background: "#FFF8F3" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        {/* LEFT SIDE: Avatar + Info */}
        <div
          onClick={() => navigate(`/store/${slugify(seller?.name)}`)}
          style={{ cursor: "pointer" }}
          className="d-flex align-items-center gap-3 flex-grow-1"
        >
          <div
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: "56px",
              height: "56px",
              backgroundColor: "#D8C3B1",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.25rem",
              flexShrink: 0,
            }}
          >
            {getInitials(seller?.name)}
          </div>

          <div>
            <h6 className="mb-1 text-accent d-flex align-items-center gap-2">
              <i className="bi bi-shop-window"></i>
              {seller?.name || "Unknown Seller"}
            </h6>
            <p className="mb-0 text-muted">
              <i className="bi bi-people-fill me-1 text-accent"></i>
              {formatFollowers(followers)} followers
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Follow Button */}
        <div className="text-end">
          <button
            onClick={handleFollow}
            type="button"
            className={`btn btn-sm px-3 ${
              hasFollowed ? "btn-secondary" : "btn-outline-secondary"
            }`}
            style={{
              whiteSpace: "nowrap",
              cursor: isLoggedIn ? "pointer" : "not-allowed",
              opacity: isLoggedIn ? 1 : 0.6,
            }}
          >
            {isLoggedIn ? (hasFollowed ? "Following" : "Follow") : "Log in to Follow"}
          </button>
        </div>
      </div>
    </div>


  );
}

export default SellerInfoBox;