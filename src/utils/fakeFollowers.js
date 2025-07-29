// src/utils/fakeFollowers.js

// Returns a consistent pseudo-random number based on sellerId
export function getFakeFollowers(sellerId) {
    if (!sellerId) return 0;
  
    // Basic hash from string
    let hash = 0;
    for (let i = 0; i < sellerId.length; i++) {
      hash = sellerId.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    // Normalize to a range
    const min = 250;
    const max = 200_000;
    const normalized = Math.abs(hash % (max - min)) + min;
  
    return normalized;
  }
  