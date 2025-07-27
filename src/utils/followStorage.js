export const userFollowMapKey = 'user_follow_map';

// Get follow state of a seller for a specific user
export function getFollowState(username, sellerName) {
  const map = JSON.parse(localStorage.getItem(userFollowMapKey) || '{}');
  return map?.[username]?.includes(sellerName);
}

// Set follow state (true = follow, false = unfollow)
export function setFollowState(username, sellerName, shouldFollow) {
  let map = {};
  try {
    const raw = localStorage.getItem(userFollowMapKey);
    map = JSON.parse(raw || '{}');
    if (typeof map !== 'object' || map === null || Array.isArray(map)) {
      throw new Error('Invalid follow map');
    }
  } catch {
    console.warn('Corrupted follow map, resetting...');
    map = {};
  }

  if (!Array.isArray(map[username])) {
    map[username] = [];
  }

  if (shouldFollow) {
    if (!map[username].includes(sellerName)) {
      map[username].push(sellerName);
    }
  } else {
    map[username] = map[username].filter(name => name !== sellerName);
  }

  localStorage.setItem(userFollowMapKey, JSON.stringify(map));
}


const followersCountKey = 'followers_count_map';

// Get the number of followers for a seller
export function getFollowersCount(sellerName) {
  const map = JSON.parse(localStorage.getItem(followersCountKey) || '{}');
  return map[sellerName] || 0;
}

// Set the number of followers for a seller
export function setFollowersCount(sellerName, count) {
  const map = JSON.parse(localStorage.getItem(followersCountKey) || '{}');
  map[sellerName] = count;
  localStorage.setItem(followersCountKey, JSON.stringify(map));
}

