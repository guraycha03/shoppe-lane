// utils/userHelpers.js
export function getStoredProfileImage() {
    const stored = localStorage.getItem("currentUser");
    if (!stored) return null;
    try {
      const user = JSON.parse(stored);
      return user.profileImage || null;
    } catch {
      return null;
    }
  }
  