import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppeRoutes from './ShoppeRoutes';
import 'bootstrap-icons/font/bootstrap-icons.css';

// import products from './data/products';
import Header from './components/Header'; 
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCartFromLocalStorage } from './utils/localCart';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AllReviewsPage from './pages/AllReviewsPage';
import ScrollToTop from './components/ScrollToTop';
import NotificationBanner from './components/NotificationBanner';



function App() {
  const navigate = useNavigate();
  const cartIconRef = useRef(null);
  const headerRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);
  const [notification, setNotification] = useState('');
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const cartIconMobileRef = useRef(null);
  const cartIconDesktopRef = useRef(null);




function renderStars(rating) {
  const starStyle = (i) => {
    const percentage = Math.min(Math.max(rating - i, 0), 1) * 100;
    return {
      background: `linear-gradient(90deg, #fadb14 ${percentage}%, #e4e5e9 ${percentage}%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    };
  };

  return (
    <div className="d-flex align-items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <i
          key={i}
          className="bi bi-star-fill"
          style={{ ...starStyle(i), fontSize: '1.1rem' }}
        ></i>
      ))}
    </div>
  );
}

function deduplicateCart(items) {
  const map = new Map();
  items.forEach((item) => {
    if (map.has(item.id)) {
      const existing = map.get(item.id);
      existing.quantity += item.quantity || 1;
      map.set(item.id, existing);
    } else {
      map.set(item.id, { ...item, quantity: item.quantity || 1 });
    }
  });
  return Array.from(map.values());
}



  const [searchTerm, setSearchTerm] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://687c9936918b6422432ebfe8.mockapi.io/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
  
    fetchProducts();
  }, []);

  const [likedProducts, setLikedProducts] = useState(new Set());


  // Save cart and likes to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify([...likedProducts]));
  }, [likedProducts]);



  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [user, setUser] = useState(null);

  const [username, setUsername] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    return storedUser?.username || '';
  });

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn') === 'true';
    

    console.log('isLoggedIn from localStorage:', storedLogin);
    const storedUser = localStorage.getItem('currentUser');
    console.log('user from localStorage:', storedUser);

  
    setIsLoggedIn(storedLogin);
  
    try {
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Failed to parse user JSON from localStorage:', error);
    }
  }, []);


  useEffect(() => {
    const syncLoginState = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };
  
    window.addEventListener('storage', syncLoginState);
    syncLoginState(); // run once on mount
  
    return () => window.removeEventListener('storage', syncLoginState);
  }, []);

  useEffect(() => {
    if (isLoggedIn && username) {
      const key = `likedProducts-${username}`;
      const stored = localStorage.getItem(key);
      setLikedProducts(new Set(JSON.parse(stored || '[]')));
    } else {
      setLikedProducts(new Set()); // Clear likes when logged out
    }
  }, [isLoggedIn, username]);
  

  useEffect(() => {
    if (isLoggedIn && username) {
      const userCart = getCartFromLocalStorage(username);
      setCartItems(userCart);
    } else {
      setCartItems([]); // Reset cart when logged out
    }
  }, [isLoggedIn, username]);


  
  
  


  // Hide header on scroll down
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (headerRef.current) {
        headerRef.current.classList.toggle(
          'header-hidden',
          currentY > lastScrollY.current && currentY > 80
        );
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLike = (id) => {
    if (!isLoggedIn || !username) {
      showNotification('Please log in to like this product.', 'error');
      return;
    }
  
    setLikedProducts((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
  
        if (heartIconRef.current) {
          const el = heartIconRef.current;
          el.classList.remove('pump');
          void el.offsetWidth;
          el.classList.add('pump');
          setTimeout(() => el.classList.remove('pump'), 400);
        }
      }
  
      localStorage.setItem(`likedProducts-${username}`, JSON.stringify([...updated]));
      return updated;
    });
  };
  
  const [addingToCartId, setAddingToCartId] = useState(null);
  const addingLockRef = useRef(false); 
  const handleAddToCart = async (product, event, qty = 1) => {
    if (addingLockRef.current || addingToCartId === product.id) return;

    addingLockRef.current = true;
    setAddingToCartId(product.id);
  
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      } else {
        return [...prev, { ...product, quantity: qty }];
      }
    });

    setQuantity(1);
  
    if (cartIconRef.current) {
      const el = cartIconRef.current;
      el.classList.remove('pump');
      void el.offsetWidth;
      el.classList.add('pump');
      setTimeout(() => el.classList.remove('pump'), 400);
    }
  
    setAddingToCartId(null);
    addingLockRef.current = false;
  };
  
  useEffect(() => {
    if (isLoggedIn && username) {
      const deduped = deduplicateCart(cartItems);
      localStorage.setItem(`cart-${username}`, JSON.stringify(deduped));
    }
  }, [cartItems, isLoggedIn, username]);

  useEffect(() => {
    const main = document.querySelector('main');
    const headerEl = headerRef.current;
  
    if (!main || !headerEl) return;
  
    const subHeaderEl = document.querySelector('.sub-header');
  
    const updatePadding = () => {
      const headerHeight = headerEl.getBoundingClientRect().height || 0;
      const subHeaderHeight = subHeaderEl?.getBoundingClientRect().height || 0;
      const extraOffset = 5; 
      const total = headerHeight + subHeaderHeight + extraOffset;

      main.style.paddingTop = `${total}px`;
    };
  
    const observer = new ResizeObserver(updatePadding);
    observer.observe(headerEl);
    if (subHeaderEl) observer.observe(subHeaderEl);
  
    updatePadding();
  
    window.addEventListener('resize', updatePadding);
  
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePadding);
    };
  }, []);

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        const updated = [...prev];
        updated[index].quantity += qty;
        return updated;
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const heartIconRef = useRef(null);
  const getVisibleCartIcon = () => {
    if (window.innerWidth < 576) {
      return cartIconMobileRef.current;
    } else {
      return cartIconDesktopRef.current;
    }
  };
  
  const triggerFlyToCartAnimation = (e) => {
    const cartIcon = getVisibleCartIcon();
    if (!cartIcon) return;
  
    const startRect = e.currentTarget.getBoundingClientRect();
    const endRect = cartIcon.getBoundingClientRect();
  
    const flyingIcon = document.createElement('i');
    flyingIcon.className = 'bi bi-cart-plus';
    flyingIcon.style.position = 'fixed';
    flyingIcon.style.left = `${startRect.left + startRect.width / 2}px`;
    flyingIcon.style.top = `${startRect.top + startRect.height / 2}px`;
    flyingIcon.style.fontSize = '1.5rem';
    flyingIcon.style.color = '#8B6F52';
    flyingIcon.style.zIndex = 9999;
    flyingIcon.style.transition = 'transform 0.9s ease-in-out, opacity 0.4s ease 0.7s';
    flyingIcon.style.pointerEvents = 'none';
  
    document.body.appendChild(flyingIcon);
  
    const translateX = endRect.left + endRect.width / 2 - (startRect.left + startRect.width / 2);
    const translateY = endRect.top + endRect.height / 2 - (startRect.top + startRect.height / 2);
  
    requestAnimationFrame(() => {
      flyingIcon.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.6)`;
      flyingIcon.style.opacity = '0';
    });
  
    flyingIcon.addEventListener('transitionend', () => {
      flyingIcon.remove();
      cartIcon.classList.add('cart-bounce');
      setTimeout(() => cartIcon.classList.remove('cart-bounce'), 400);
    });
  };
  
  const updateCartQuantity = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(qty, 1) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <ScrollToTop />
      <ToastContainer />
      <NotificationBanner message={notification} />
  
      <Header
        headerRef={headerRef}
        isLoggedIn={isLoggedIn}
        username={username}
        cartItems={cartItems}
        likedProducts={likedProducts}
        cartIconRef={cartIconRef}
        heartIconRef={heartIconRef}
        navigate={navigate}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartIconMobileRef={cartIconMobileRef}
        cartIconDesktopRef={cartIconDesktopRef}     
      />
  
      <main className="container-fluid">
        <ShoppeRoutes
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          showNotification={showNotification}
          user={user}
          quantity={quantity}
          setQuantity={setQuantity}
          cartItems={cartItems}
          addToCart={addToCart}
          handleAddToCart={handleAddToCart}
          likedProducts={likedProducts}
          toggleLike={toggleLike}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          products={products}
          updateCartQuantity={updateCartQuantity}
          removeFromCart={removeFromCart}
          renderStars={renderStars}
          addingToCartId={addingToCartId}
          triggerFlyToCartAnimation={triggerFlyToCartAnimation}  
        />
      </main>
    </div>
  );  
}

export default App;
