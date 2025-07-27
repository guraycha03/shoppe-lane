const userFollowMapKey = 'user_follow_map';
const followersCountKey = 'followers_count_map';

export const getFollowState = (user, sellerId) => {
  const data = JSON.parse(localStorage.getItem(userFollowMapKey) || '{}');
  return data?.[user]?.includes(sellerId);
};

export const setFollowState = (user, sellerId, followed) => {
  const data = JSON.parse(localStorage.getItem(userFollowMapKey) || '{}');
  if (!data[user]) data[user] = [];

  if (followed) {
    if (!data[user].includes(sellerId)) data[user].push(sellerId);
  } else {
    data[user] = data[user].filter(id => id !== sellerId);
  }

  localStorage.setItem(userFollowMapKey, JSON.stringify(data));
};

export const getFollowersCount = (sellerId) => {
  const data = JSON.parse(localStorage.getItem(followersCountKey) || '{}');
  return data?.[sellerId] || 0;
};

export const updateFollowersCount = (sellerId, count) => {
  const data = JSON.parse(localStorage.getItem(followersCountKey) || '{}');
  data[sellerId] = count;
  localStorage.setItem(followersCountKey, JSON.stringify(data));
};
