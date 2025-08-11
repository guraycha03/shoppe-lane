// src/hooks/useFollowState.js
import { useState, useEffect } from "react";
import { getFollowersCount, setFollowersCount } from "../utils/followStorage";

export default function useFollowState(currentUser, sellerId) {
  const storageKey = `followedSellers_${currentUser}`;
  const [hasFollowed, setHasFollowed] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const storedFollows = JSON.parse(localStorage.getItem(storageKey)) || [];
    setHasFollowed(storedFollows.includes(sellerId));

    // ✅ Set initial followers count if not already stored
    if (!getFollowersCount(sellerId)) {
      // Random realistic starting count: 1k, 50k, or 100k+
      const randomBase = [1000, 50000, 100000][Math.floor(Math.random() * 3)];
      const variation = Math.floor(Math.random() * 500); // +/- small number
      setFollowersCount(sellerId, randomBase + variation);
    }
  }, [currentUser, sellerId]);

  const toggleFollow = () => {
    if (!currentUser) return;
    const storedFollows = JSON.parse(localStorage.getItem(storageKey)) || [];
    let updated;
    let followingNow;

    if (storedFollows.includes(sellerId)) {
      updated = storedFollows.filter(id => id !== sellerId);
      followingNow = false;
    } else {
      updated = [...storedFollows, sellerId];
      followingNow = true;
    }

    localStorage.setItem(storageKey, JSON.stringify(updated));
    setHasFollowed(followingNow);

    // ✅ Update follower count
    let currentCount = getFollowersCount(sellerId);
    const newCount = Math.max(0, currentCount + (followingNow ? 1 : -1));
    setFollowersCount(sellerId, newCount);

    // ✅ Dispatch consistent event name
    window.dispatchEvent(new CustomEvent("followUpdated", {
      detail: { sellerId, isFollowing: followingNow, followers: newCount }
    }));
  };

  // ✅ Listen for updates from other components
  useEffect(() => {
    const handler = (e) => {
      if (String(e.detail.sellerId) === String(sellerId)) {
        const storedFollows = JSON.parse(localStorage.getItem(storageKey)) || [];
        setHasFollowed(storedFollows.includes(sellerId));
      }
    };
    window.addEventListener("followUpdated", handler);
    return () => window.removeEventListener("followUpdated", handler);
  }, [sellerId, storageKey]);

  return { hasFollowed, toggleFollow };
}
