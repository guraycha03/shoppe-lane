// src/utils/followStorage.js


export const userFollowMapKey = 'user_follow_map';
export const followersCountKey = 'followers_count_map';

// Get whether the user follows this seller
export const getFollowState = (username, sellerId) => {
  try {
    const map = JSON.parse(localStorage.getItem(userFollowMapKey) || '{}');
    return Array.isArray(map[username]) && map[username].includes(sellerId);
  } catch {
    return false;
  }
};

// Set whether the user follows this seller
export const setFollowState = (username, sellerId, shouldFollow) => {
  let map = {};
  try {
    map = JSON.parse(localStorage.getItem(userFollowMapKey) || '{}');
  } catch {
    console.warn('Corrupted follow map, resetting...');
  }

  if (!Array.isArray(map[username])) map[username] = [];

  if (shouldFollow) {
    if (!map[username].includes(sellerId)) {
      map[username].push(sellerId);
    }
  } else {
    map[username] = map[username].filter(id => id !== sellerId);
  }

  localStorage.setItem(userFollowMapKey, JSON.stringify(map));
};

// Get followers count
export const getFollowersCount = (sellerId) => {
  try {
    const map = JSON.parse(localStorage.getItem(followersCountKey) || '{}');
    return Number.isInteger(map[sellerId]) ? map[sellerId] : 0;
  } catch {
    return 0;
  }
};

// Set followers count
export const setFollowersCount = (sellerId, count) => {
  let map = {};
  try {
    map = JSON.parse(localStorage.getItem(followersCountKey) || '{}');
  } catch {
    console.warn('Corrupted followers map, resetting...');
  }

  map[sellerId] = Math.max(0, count);
  localStorage.setItem(followersCountKey, JSON.stringify(map));
};

// Toggle follow state and sync
export const toggleFollow = (username, sellerId) => {
  const isFollowing = getFollowState(username, sellerId);
  const newFollowState = !isFollowing;

  setFollowState(username, sellerId, newFollowState);

  const currentCount = getFollowersCount(sellerId);
  const newCount = Math.max(0, currentCount + (newFollowState ? 1 : -1));
  setFollowersCount(sellerId, newCount);

  // Broadcast update
  window.dispatchEvent(new CustomEvent('followUpdated', {
    detail: {
      sellerId,
      isFollowing: newFollowState,
      followers: newCount,
    }
  }));
};
