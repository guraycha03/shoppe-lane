// src/utils/localCart.js
export const getCartFromLocalStorage = (username) => {
    if (!username) return [];
    const data = localStorage.getItem(`cart-${username}`);
    return data ? JSON.parse(data) : [];
  };
  
  export const saveCartToLocalStorage = (username, cartItems) => {
    if (!username) return;
    localStorage.setItem(`cart_${currentUser}`, JSON.stringify(cartItems));

  };
  