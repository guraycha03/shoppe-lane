// hooks/useFollowState.js
import { useEffect, useState } from 'react';
import { getFollowState, setFollowState } from '../utils/followStorage';

export default function useFollowState(currentUser, sellerId) {
  const [isFollowing, setIsFollowing] = useState(() => getFollowState(currentUser, sellerId));

  useEffect(() => {
    const onStorageChange = (e) => {
      if (e.key === 'user_follow_map') {
        const latest = getFollowState(currentUser, sellerId);
        setIsFollowing(latest);
      }
    };

    const manualSync = () => {
      const latest = getFollowState(currentUser, sellerId);
      setIsFollowing(latest);
    };

    window.addEventListener('storage', onStorageChange);
    window.addEventListener('user_follow_map', manualSync);

    return () => {
      window.removeEventListener('storage', onStorageChange);
      window.removeEventListener('user_follow_map', manualSync);
    };
  }, [currentUser, sellerId]);

  const toggleFollow = () => {
    const newState = !isFollowing;
    setFollowState(currentUser, sellerId, newState);
    setIsFollowing(newState);
    window.dispatchEvent(new Event('user_follow_map')); // sync in same tab
  };

  return [isFollowing, toggleFollow];
}
