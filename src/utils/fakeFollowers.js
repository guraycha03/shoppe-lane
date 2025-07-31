// src/utils/fakeFollowers.js

export function getFakeFollowers(sellerId) {
  if (!sellerId) return 0;

    let hash = 0;
    for (let i = 0; i < sellerId.length; i++) {
      hash = sellerId.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    const min = 250;
    const max = 200_000;
    const normalized = Math.abs(hash % (max - min)) + min;
  
    return normalized;
  
}
  