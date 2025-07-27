import { useState, useEffect } from 'react';
import {
  getFollowState,
  getFollowersCount,
  toggleFollow as toggleFollowUtil
} from '../utils/followStorage';

function useFollowState(currentUser, sellerId) {
  const [hasFollowed, setHasFollowed] = useState(false);
  const [followers, setFollowers] = useState(0);

  const sync = () => {
    const followState = getFollowState(currentUser, sellerId);
    const followerCount = getFollowersCount(sellerId);
    setHasFollowed(followState);
    setFollowers(followerCount);
  };

  useEffect(() => {
    if (!currentUser || !sellerId) return;
    sync();

    const handleFollowUpdated = (e) => {
      const { sellerId: updatedId } = e.detail;
      if (updatedId === sellerId) sync();
    };

    const handleStorageEvent = (e) => {
      if (
        e.key === 'user_follow_map' ||
        e.key === 'followers_count_map'
      ) {
        sync();
      }
    };

    window.addEventListener('followUpdated', handleFollowUpdated);
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('followUpdated', handleFollowUpdated);
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [currentUser, sellerId]);

  const toggleFollow = () => {
    toggleFollowUtil(currentUser, sellerId);
    sync(); // Immediate state update
  };

  return { hasFollowed, followers, toggleFollow };
}

export default useFollowState;
