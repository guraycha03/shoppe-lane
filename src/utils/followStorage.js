// src/utils/followStorage.js
const followersCountKey = 'followersCount';

export const getFollowersCount = (sellerId) => {
  const data = JSON.parse(localStorage.getItem(followersCountKey) || '{}');
  return data?.[sellerId] || 0;
};

export const setFollowersCount = (sellerId, count) => {
  const data = JSON.parse(localStorage.getItem(followersCountKey) || '{}');
  data[sellerId] = count;
  localStorage.setItem(followersCountKey, JSON.stringify(data));
};
