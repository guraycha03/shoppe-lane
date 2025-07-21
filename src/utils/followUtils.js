const userFollowMapKey = 'user_follow_map'; // global

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
    data[user] = data[user].filter((id) => id !== sellerId);
  }
  localStorage.setItem(userFollowMapKey, JSON.stringify(data));
};
