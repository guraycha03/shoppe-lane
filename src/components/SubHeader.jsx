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
  const mobileDropdownRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showOnScroll, setShowOnScroll] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      if (showMobileDropdown) return;
      const currentScrollY = window.scrollY;
      setShowOnScroll(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, lastScrollY, showMobileDropdown]);

  const hideSubHeader =
    pathname.startsWith('/product/') ||
    pathname.startsWith('/store/') ||
    pathname === '/wishlist' ||
    pathname === '/cart' ||
    pathname === '/profile' ||
    pathname === '/search' ||
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/order' ||
    pathname.includes('/reviews');

  if (hideSubHeader) return null;

  return (
    <div
      ref={subHeaderRef}
      className={`sub-header shadow-sm ${showOnScroll ? 'show' : 'hide'}`}
    >
      <div className="container py-2 d-flex flex-column gap-3">
        {/* Search */}
        <div
          className="position-relative w-100 mx-auto mt-3"
          style={{ maxWidth: '600px' }}
        >
          <input
            type="text"
            className="form-control pe-0 ps-5 rounded-pill"
            placeholder="Search cozy things..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchTerm.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
              }
            }}
            style={{
              height: '45px',
              border: '2px solid #e2d5c3',
              backgroundColor: '#fdfaf7',
              color: '#5d5043',
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
            className="search-btn-neu position-absolute"
            style={{
              top: '0',
              bottom: '0',
              right: '0',
              height: '100%',
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0',
            }}
            onClick={() => {
              if (searchTerm.trim()) {
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
            style={{ padding: '0.5rem 0' }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                className="btn btn-link text-decoration-none"
                style={{
                  color: '#8B6F52',
                  fontWeight: 500,
                  fontSize: '1rem',
                }}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowMobileDropdown(false);
                  navigate(`/category/${cat.toLowerCase()}`);
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Categories (Mobile) */}
        <div
          ref={mobileDropdownRef}
          className="custom-select d-md-none w-100 position-relative"
        >

          <div
            className="selected d-flex justify-content-between align-items-center"
            onClick={() => setShowMobileDropdown((prev) => !prev)}
          >
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
            <div
              className="options border rounded bg-white shadow-sm"
              style={{
                maxHeight: '50vh',
                overflowY: 'auto',
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 1000,
              }}
            >
              {categories.map((cat) => (
                <div
                  key={cat}
                  className="py-2"
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
