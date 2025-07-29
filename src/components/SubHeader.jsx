import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



function SubHeader({
  searchTerm,
  setSearchTerm,
  categories,
  subHeaderRef,
  selectedCategory,
  setSelectedCategory,
  showMobileDropdown,
  setShowMobileDropdown,
}) {
//   const subHeaderRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showOnScroll, setShowOnScroll] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    if (pathname !== '/') return; // Only for homepage
  
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
  
      if (currentScrollY > lastScrollY) {
        setShowOnScroll(false); // scrolling down → hide
      } else {
        setShowOnScroll(true); // scrolling up → show
      }
  
      setLastScrollY(currentScrollY);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, lastScrollY]);
  
  const hideSubHeader =
    pathname.startsWith('/product/') ||
    pathname.startsWith('/store/') ||
    pathname === '/wishlist' ||
    pathname === '/cart' ||
    pathname === '/profile' ||

    pathname === '/search' ||
    pathname === '/login'||
    pathname.includes('/reviews');

  if (hideSubHeader) return null;

  return (
    <div
       ref={subHeaderRef}
       className={`sub-header shadow-sm ${showOnScroll ? 'show' : 'hide'}`}
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
          <i
            className="bi bi-search position-absolute"
            style={{
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#bda993',
            }}
          ></i>
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
          <div
            className="d-flex flex-wrap justify-content-center gap-4 w-100"
            style={{ maxWidth: '100%', padding: '0.5rem 0' }}
          >
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
          onClick={() => setShowMobileDropdown((prev) => !prev)}
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
  );
}

export default SubHeader;
