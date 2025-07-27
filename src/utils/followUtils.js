const FOLLOW_MAP_DATA_KEY = 'user_follow_map_data'; // 💡 distinct key for follow data

export const getFollowState = (user, sellerId) => {
  try {
    const data = JSON.parse(localStorage.getItem(FOLLOW_MAP_DATA_KEY) || '{}');
    return Array.isArray(data[user]) && data[user].includes(sellerId);
  } catch (err) {
    console.error("getFollowState failed:", err);
    return false;
  }
};

export const setFollowState = (user, sellerId, followed) => {
  try {
    const raw = localStorage.getItem(FOLLOW_MAP_DATA_KEY);
    const data = JSON.parse(raw || '{}');

    if (!Array.isArray(data[user])) {
      data[user] = [];
    }

    if (followed) {
      if (!data[user].includes(sellerId)) {
        data[user].push(sellerId);
      }
    } else {
      data[user] = data[user].filter((id) => id !== sellerId);
    }

    localStorage.setItem(FOLLOW_MAP_DATA_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("setFollowState failed:", err);
  }
};
