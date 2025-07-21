import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';


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
  const sidebarRef = useRef(null);
  const categoryScrollRef = useRef(null);
  const lastScrollY = useRef(window.scrollY);

  const cartIconRefMobile = useRef(null);
  const cartIconRefDesktop = useRef(null);
  // const cartIconRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 576);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  // Navigate when clicking the profile icon
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
    'Beauty', 'Women', 'Men', 'Kids', 'Accessories', 'Home', 'Lifestyle', 'Essentials', 'Sale', 'Bestsellers',
  ];

  // === Effects ===

  // ESC key to close sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hide subheader on scroll down
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setHideSubHeader(currentY > lastScrollY.current && currentY > 80);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile dropdown when clicking outside
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

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  // Disable body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [sidebarOpen]);

  // === Handlers ===
  const closeSidebar = () => setSidebarOpen(false);

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
          fontFamily: "'Cormorant Garamond', serif",
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
                fontFamily: "'Cormorant Garamond', serif",
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


  return (
    <>
      <header ref={headerRef} className="bg-white shadow-sm">
        <nav className="container-fluid d-flex align-items-center justify-content-between py-3 flex-nowrap">
  
          {/* Left: Logo */}
          <div className="d-flex align-items-center gap-5 me-auto">
            <Link to="/" className="text-decoration-none">
              <h1
                className="m-0 fw-bold d-flex align-items-center gap-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: '#8B6F52',
                  fontSize: '1.4rem',
                  letterSpacing: '0.5px',
                }}
              >
                <i className="bi bi-bag logo-bag-icon" style={{ fontSize: '1.8rem' }}></i>
                <span className="d-none d-sm-inline">Shoppe Lane</span>
              </h1>
            </Link>
          </div>

  
          {/* Center: Mobile Icons */}
          <div className="d-flex w-100 justify-content-center d-sm-none">
            <div className="d-flex justify-content-center gap-5 py-2">
              {/* Home */}
              <i className="bi bi-house icon-hover-global" onClick={() => navigate('/')} />
  
              {/* Heart */}
              <div className="position-relative">
                <i ref={heartIconRef} className="bi bi-heart icon-hover-global" onClick={() => navigate('/wishlist')} />
                {likedProducts.size > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary" style={{ fontSize: '0.6rem' }}>
                    {likedProducts.size}
                  </span>
                )}
              </div>
  
              {/* Cart */}
              <div className="position-relative">
              <i
                ref={isMobile ? cartIconRef : null}
                className="bi bi-cart2 icon-hover-global"
                onClick={() => navigate('/cart')}
                style={{ cursor: 'pointer' }}
              />

                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary" style={{ fontSize: '0.6rem' }}>
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </div>
            </div>
          </div>
  
          {/* Right: Desktop Icons + Avatar + Burger */}
          <div className="d-none d-sm-flex align-items-center gap-4 ms-auto pe-3">

  
            {/* Home Icon */}
            <i
              className="bi bi-house icon-hover-global"
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            />
  
            {/* Heart */}
            <div className="position-relative">
              <i
                ref={heartIconRef}
                className="bi bi-heart icon-hover-global"
                onClick={() => navigate('/wishlist')}
              />
              {likedProducts.size > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary" style={{ fontSize: '0.6rem' }}>
                  {likedProducts.size}
                </span>
              )}
            </div>
  
            {/* Cart */}
            <div className="position-relative">
            <i
              ref={!isMobile ? cartIconRef : null}
              className="bi bi-cart2 icon-hover-global"
              onClick={() => navigate('/cart')}
              style={{ cursor: 'pointer' }}
            />

              {cartItems.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary" style={{ fontSize: '0.6rem' }}>
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
  
          {/* Profile Icon (always visible) */}
          <div
            className="profile-icon ms-3"
            onClick={handleProfileClick}
            style={{ cursor: 'pointer' }}
          >
            {isLoggedIn ? (
              <div className="avatar-circle">
                {username?.charAt(0).toUpperCase()}
              </div>
            ) : (
              <i className="bi bi-person-circle fs-4"></i>
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
  
        </nav>
      </header>
    

      {/* Subheader */}
      <div
        ref={subHeaderRef}
        className={`sub-header shadow-sm ${hideSubHeader ? 'hide-subheader' : ''}`}
      >
        <div className="container py-2 d-flex flex-column gap-3">
          {/* Search Bar */}
          <div className="position-relative w-100 mx-auto mt-3" style={{ maxWidth: '600px' }}>
            <input
              type="text"
              className="form-control pe-5 ps-5 rounded-pill"
              placeholder="Search cozy things..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchTerm.trim() !== '') {
                  navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                }
              }}
              style={{
                height: '45px',
                border: '2px solid #e2d5c3',
                outline: 'none',
                boxShadow: 'none',
                backgroundColor: '#fdfaf7',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                color: '#5d5043',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#bfa994';
                e.target.style.boxShadow = '0 0 0 3px rgba(191, 169, 148, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2d5c3';
                e.target.style.boxShadow = 'none';
              }}
            />
            <i className="bi bi-search position-absolute" style={{
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#bda993',
            }}></i>
            <button
              type="button"
              className="position-absolute end-0 top-0 rounded-pill border-0"
              style={{
                height: '100%',
                backgroundColor: '#8B6F52',
                color: 'white',
                padding: '0 16px',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.8px',
                cursor: 'pointer',
                borderTopRightRadius: '999px',
                borderBottomRightRadius: '999px',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a07f64')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#8B6F52')}
              onClick={() => {
                if (searchTerm.trim() !== '') {
                  navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                }
              }}
            >
              Search
            </button>
          </div>

          {/* Categories (Desktop) */}
          <div className="d-none d-md-flex justify-content-center">
            <div className="d-flex flex-wrap justify-content-center gap-4 w-100" style={{ maxWidth: '100%', padding: '0.5rem 0' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="btn btn-link text-decoration-none"
                  style={{
                    color: '#8B6F52',
                    fontWeight: 500,
                    fontSize: '1rem',
                    transition: 'color 0.2s ease',
                  }}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowMobileDropdown(false);
                    navigate(`/category/${cat.toLowerCase()}`);
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#a07f64')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#8B6F52')}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Categories (Mobile) */}
          <div
            ref={mobileDropdownRef}
            className="custom-select d-md-none w-100"
            onClick={() => setShowMobileDropdown(prev => !prev)}
          >
            <div className="selected d-flex justify-content-between align-items-center">
              {selectedCategory}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className={`arrow ${showMobileDropdown ? 'rotate' : ''}`}
              >
                <path
                  fill="#8B6F52"
                  d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                />
              </svg>
            </div>

            {showMobileDropdown && (
              <div className="options mt-2 border rounded p-2 bg-white shadow-sm">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    className="py-1"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowMobileDropdown(false);
                      navigate(`/category/${cat.toLowerCase()}`);
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Sidebar Overlay & Panel */}
      {sidebarOpen && (
        <>
          <div className="sidebar-overlay" onClick={closeSidebar}></div>
          <aside className="sidebar-panel" ref={sidebarRef}>
          <div className="sidebar-header">
            <span>Menu</span>
            <i
              className="bi bi-x"
              onClick={() => setSidebarOpen(false)}
            ></i>
          </div>
              {/* Dropdowns */}
              {renderDropdown('Account & Support', 'bi-person-circle', 'account', [
                {
                  label: isLoggedIn ? 'My Account' : 'Login',
                  path: isLoggedIn ? '/account' : '/login',
                },
                ...(isLoggedIn ? [
                  { label: 'Wishlist', path: '/wishlist' },
                  { label: 'My Orders', path: '/orders' },
                ] : []),
                { label: 'Help Center', path: '/help' },
                { label: 'Contact Us', path: '/contact' },
              ])}


              {renderDropdown('Shop', 'bi-bag', 'shop', [
                { label: 'Shop All Products', path: '/shop' },
                { label: 'Beauty', path: '/category/beauty' },
                { label: 'Women', path: '/category/women' },
                { label: 'Men', path: '/category/men' },
                { label: 'Kids', path: '/category/kids' },
                {label: 'Accessories', path: '/category/accessories' },
                {label: 'Home', path: '/category/home' },
                { label: 'Lifestyle', path: '/category/lifestyle' },
                { label: 'Essentials', path: '/essentials' },
                { label: 'On Sale', path: '/sale' },
                { label: 'Bestsellers', path: '/bestsellers' },
              ])}

              {renderDropdown('Customer Resources', 'bi-receipt', 'resources', [
                { label: 'FAQs', path: '/faq' },
                { label: 'Shipping & Delivery Info', path: '/shipping' },
                { label: 'Return & Refund Policy', path: '/returns' },
                { label: 'Order Tracking', path: '/track-order' },
                { label: 'Size Guide', path: '/size-guide' },
                { label: 'Gift Cards', path: '/gift-cards' },
              ])}

              

              {renderDropdown('About & Branding', 'bi-info-circle', 'about', [
                { label: 'About Us', path: '/about' },
                { label: 'Our Story / Mission', path: '/mission' },
                { label: 'Sustainability', path: '/sustainability' },
                { label: 'Testimonials', path: '/testimonials' },
                { label: 'Store Locations', path: '/locations' },
              ])}

              {renderDropdown('Extras & Community', 'bi-stars', 'extras', [
                { label: 'Newsletter Signup', path: '/newsletter' },
                { label: 'Refer a Friend', path: '/referral' },
                { label: 'Blog / Inspiration', path: '/blog' },
                { label: 'Instagram / TikTok Gallery', path: '/social-gallery' },
                { label: 'Join Creator Program', path: '/creator-program' },
              ])}           
            
            </aside>        
        </>      
      )}

    </>
  );
}

export default Header;
