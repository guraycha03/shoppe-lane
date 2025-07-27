import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SubHeader from './SubHeader';
import Sidebar from './Sidebar';

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
  const lastScrollY = useRef(window.scrollY);

  const cartIconRefMobile = useRef(null);
  const cartIconRefDesktop = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 576);

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
    'Beauty', 'Women', 'Men', 'Kids', 'Accessories', 'Home', 'Lifestyle', 'Essentials', 'Sale', 'Bestsellers',
  ];

  // === Effects ===

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
                <i
                  className="bi bi-bag logo-bag-icon"
                  style={{ fontSize: '1.8rem', cursor: 'pointer' }}
                  onClick={() => navigate('/')}
                />
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
        />
      )}
    </>
  );
}

export default Header;