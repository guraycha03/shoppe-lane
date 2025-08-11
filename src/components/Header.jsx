import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SubHeader from './SubHeader';
import Sidebar from './Sidebar';
import { getStoredProfileImage } from '../utils/userHelpers';


function Header({
  isLoggedIn,
  username,
  headerRef,
  cartItems,
  likedProducts,
  cartIconRef,
  heartIconRef,
  navigate,
  searchTerm,
  setSearchTerm,
}) {
  // === State & Refs ===
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Categories');
  const [hideSubHeader, setHideSubHeader] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const subHeaderRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  const categoryScrollRef = useRef(null);
  const profileImage = isLoggedIn ? getStoredProfileImage() : null;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  const lastScrollY = useRef(window.scrollY);

  const [heartPump, setHeartPump] = useState(false);
  const [cartPump, setCartPump] = useState(false);
  useEffect(() => {
    if (likedProducts.size > 0) {
      setHeartPump(true);
      const timer = setTimeout(() => setHeartPump(false), 400); // duration matches CSS animation
      return () => clearTimeout(timer);
    }
  }, [likedProducts]);
  
  useEffect(() => {
    if (cartItems.length > 0) {
      setCartPump(true);
      const timer = setTimeout(() => setCartPump(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cartItems]);
  


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 576);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };


  const getInitial = (name) => {
    if (!name) return '?';
    return name.trim().charAt(0).toUpperCase();
  };

  const categories = [
    'Home', 'Women', 'Men', 'Kids', 'Accessories', 'Beauty', 'Lifestyle', 'Essentials', 'Stationery', 'Office Supplies', 'Gift Ideas',
  ];

  // === Effects ===

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setHideSubHeader(currentY > lastScrollY.current && currentY > 80);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setShowMobileDropdown(false);
      }
    };
    if (showMobileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMobileDropdown]);



  const toggleSection = (sectionKey) => {
    setExpandedSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

  // === Sidebar Dropdown Renderer ===
  const renderDropdown = (title, iconClass, sectionKey, items) => (
    <div className="dropdown-section mb-5">
      <div
        className="fw-semibold mb-3 d-flex justify-content-between align-items-center text-uppercase"
        style={{
          fontSize: '1rem',
          color: '#5a4a3f',
          cursor: 'pointer',
          letterSpacing: '0.8px',
          fontFamily: "'DM Sans', sans-serif",
          borderBottom: '1px solid #eae2da',
          paddingBottom: '0.5rem',
        }}
        onClick={() => toggleSection(sectionKey)}
      >
        <span>
          <i className={`bi ${iconClass} me-2`} />
          {title}
        </span>
        <i
          className={`bi ${expandedSection === sectionKey ? 'bi-chevron-up' : 'bi-chevron-down'}`}
          style={{ fontSize: '1.1rem', color: '#a07f64' }}
        />
      </div>

      {expandedSection === sectionKey && (
        <ul className="list-unstyled ps-2 fade-in" style={{ paddingLeft: '1rem' }}>
          {items.map(({ label, path }) => (
            <li
              key={label}
              className="mb-3"
              style={{
                cursor: 'pointer',
                fontSize: '1rem',
                color: '#6f5846',
                transition: 'color 0.2s ease',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.5px',
              }}
              onClick={() => {
                navigate(path);
                setSidebarOpen(false);
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#a07f64')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6f5846')}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const mainNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Shop', path: '/shop' },
    { label: 'Contact', path: '/contact' },
  ];


  return (
    <>
      <header ref={headerRef} className="bg-white shadow-sm">
        <nav className="container-fluid d-flex align-items-center justify-content-between py-3 flex-nowrap">

          {/* Left: Logo */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/" className="text-decoration-none">
            <h1
              className="m-0 fw-bold"
              style={{
                fontFamily: "'Garamond', serif",
                color: '#8B6F52',
                fontSize: '1.5rem',        // Smaller font size for the text
                fontWeight: '600',         // Slightly lighter weight if desired
              }}
            >
              <i
                className="bi bi-bag logo-bag-icon"
                style={{
                  fontSize: '1.3rem',      // Smaller icon size
                  cursor: 'pointer',
                  verticalAlign: 'middle'  // Align icon better with text
                }}
              />
              <span className="d-none d-sm-inline" style={{ marginLeft: '0.3rem' }}>
                Shoppe Lane
              </span>
            </h1>

            </Link>
          </div>

          {/* Center: Main Navigation - visible only on desktop */}
          <ul className="d-none d-sm-flex list-unstyled gap-4 m-0" style={{ flexGrow: 1, justifyContent: 'center' }}>
            {mainNavLinks.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  className="nav-link-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>


        {/* Right: Heart and Cart grouped with spacing */}
        <div className="d-flex align-items-center gap-4">
          <div className="position-relative">
            <i
              ref={heartIconRef}
              className={`bi bi-heart icon-hover-global ${heartPump ? 'pump' : ''}`}
              onClick={() => navigate('/wishlist')}
              style={{ cursor: 'pointer' }}
            />
            {likedProducts.size > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary" style={{ fontSize: '0.6rem' }}>
                {likedProducts.size}
              </span>
            )}
          </div>

          <div className="position-relative">
            <i
              ref={cartIconRef}
              className={`bi bi-cart2 icon-hover-global ${cartPump ? 'pump' : ''}`}
              onClick={() => navigate('/cart')}
              style={{ cursor: 'pointer' }}
            />
            {cartItems.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary" style={{ fontSize: '0.6rem' }}>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>

          {/* Burger Menu */}
          <div
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle Menu"
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 1000,
              marginLeft: '10px',
            }}
          >
            <i
              className={`bi ${sidebarOpen ? 'bi-x' : 'bi-list'} burger-icon ${sidebarOpen ? 'open' : ''}`}
              style={{
                fontSize: '28px',
                color: '#8B6F52',
              }}
            ></i>
          </div>
        </div>
        </nav>

      </header>

      <SubHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showMobileDropdown={showMobileDropdown}
        setShowMobileDropdown={setShowMobileDropdown}
        subHeaderRef={subHeaderRef}
      />

      {sidebarOpen && (
        <Sidebar
          isLoggedIn={isLoggedIn}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigate={navigate}
          expandedSection={expandedSection}
          toggleSection={toggleSection}
          mainNavLinks={mainNavLinks}
        />
      )}
    </>
  );
}

export default Header;