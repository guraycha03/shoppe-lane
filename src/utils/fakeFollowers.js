// src/utils/fakeFollowers.js
export function getFakeFollowers(sellerId) {
  // Use sellerId as string key (if missing, use a safe placeholder)
  if (sellerId === undefined || sellerId === null || sellerId === '') {
    // Use a default plausible number so UI doesn't show 0
    return 5000;
  }

  const key = String(sellerId);

  // Build a deterministic hash from the string
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0; // keep in 32-bit range
  }

  const min = 1000;      // minimum followers
  const max = 200_000;   // maximum followers
  const range = max - min;

  // Ensure positive and inside range
  const normalized = (Math.abs(hash) % range) + min;

  // Snap to nearest 1k for clean display (e.g., 5k, 12k)
  const snapped = Math.max(1000, Math.round(normalized / 1000) * 1000);

  return snapped;
}
