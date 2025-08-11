import React, { useEffect, useRef, useState } from 'react';

function Sidebar({ 
  isLoggedIn, 
  sidebarOpen, 
  setSidebarOpen, 
  navigate,
  mainNavLinks = [],  // Receive main nav links as prop
  expandedSection,
  toggleSection,
}) {
  const sidebarRef = useRef(null);

  const DEFAULT_AVATAR = 'https://res.cloudinary.com/dyjd4nbrf/image/upload/v1753782519/default-avatar_c38cq7.png';

  function getValidProfileImage(image) {
    if (
      typeof image === 'string' &&
      image.trim() !== '' &&
      (image.startsWith('http') || image.startsWith('data:'))
    ) {
      return image;
    }
    return DEFAULT_AVATAR;
  }

  const initialUser = JSON.parse(localStorage.getItem('currentUser'));
  const [profileImage, setProfileImage] = useState(getValidProfileImage(initialUser?.profileImage));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    const onProfileImageUpdated = (e) => {
      setProfileImage(getValidProfileImage(e.detail));
    };
    
    window.addEventListener('profileImageUpdated', onProfileImageUpdated);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('profileImageUpdated', onProfileImageUpdated);
    };
  }, [sidebarOpen]);

  const closeSidebar = () => setSidebarOpen(false);

  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar();
  };

  // Minimal categories for Shop
  const shopCategories = [
    { label: 'Shop All Products', path: '/shop' },
    { label: 'Women', path: '/category/women' },
    { label: 'Men', path: '/category/men' },
    { label: 'Kids', path: '/category/kids' },
  ];

  return (
    <>
      <div className="sidebar-overlay" onClick={closeSidebar}></div>
      <aside className="sidebar-panel" ref={sidebarRef} style={{ padding: '1rem' }}>
        {/* Profile Section */}
        <div
          className="sidebar-profile d-flex flex-column align-items-start mb-4"
          style={{ cursor: 'pointer', backgroundColor: '#faf3e0', padding: '0.75rem 1rem', borderRadius: '10px' }}
          onClick={() => {
            if (isLoggedIn) {
              navigate('/profile');
            } else {
              navigate('/login');
            }
            closeSidebar();
          }}
        >
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <img
                src={profileImage}
                alt="Profile"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '0.75rem',
                  border: '2px solid #dee2e6',
                }}
              />
            ) : (
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#ddd',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '1.5rem',
                  color: '#8B6F52',
                  marginRight: '0.75rem',
                }}
              >
                <i className="bi bi-person-circle"></i>
              </div>
            )}
            <span style={{ fontWeight: '600', fontSize: '1rem', color: '#5a4a3f' }}>
              {isLoggedIn ? 'My Profile' : 'Guest'}
            </span>
          </div>
          {isLoggedIn && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#7c6a4a' }}>
              <div>{JSON.parse(localStorage.getItem('currentUser'))?.username || ''}</div>
              <div style={{ fontSize: '0.75rem', color: '#a89a7e' }}>
                {JSON.parse(localStorage.getItem('currentUser'))?.email || ''}
              </div>
            </div>
          )}
        </div>
        
        {/* Main Navigation - mobile */}
        <div className="mb-4">
          <h5 style={{ color: '#5a4a3f', fontWeight: '700', marginBottom: '0.75rem' }}>Navigation</h5>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {mainNavLinks.map(({ label, path }) => (
              <li 
                key={label} 
                onClick={() => handleNavigation(path)} 
                style={navItemStyle}
                onMouseEnter={e => (e.currentTarget.style.color = '#a07f64')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6f5846')}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>

      

        {/* Account Section */}
        <div className="mb-4">
          <h5 style={{ color: '#5a4a3f', fontWeight: '700', marginBottom: '0.75rem' }}>Account</h5>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {!isLoggedIn && (
              <li onClick={() => handleNavigation('/login')} style={navItemStyle}>
                Login
              </li>
            )}

            {isLoggedIn && (
              <>
                <li onClick={() => handleNavigation('/cart')} style={navItemStyle}>My Cart</li>
                <li onClick={() => handleNavigation('/wishlist')} style={navItemStyle}>Wishlist</li>
                <li onClick={() => handleNavigation('/orders')} style={navItemStyle}>My Orders</li>
              </>
            )}
          </ul>
        </div>

        {/* Shop Section */}
        <div className="mb-4">
          <h5 style={{ color: '#5a4a3f', fontWeight: '700', marginBottom: '0.75rem' }}>Shop</h5>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {shopCategories.map(({ label, path }) => (
              <li key={label} onClick={() => handleNavigation(path)} style={navItemStyle}>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h5 style={{ color: '#5a4a3f', fontWeight: '700', marginBottom: '0.75rem' }}>Help</h5>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li onClick={() => handleNavigation('/help')} style={navItemStyle}>Help Center</li>
            <li onClick={() => handleNavigation('/contact')} style={navItemStyle}>Contact Us</li>
          </ul>
        </div>
      </aside>
    </>
  );
}

const navItemStyle = {
  cursor: 'pointer',
  padding: '0.4rem 0',
  fontSize: '1rem',
  color: '#6f5846',
  fontFamily: "'DM Sans', sans-serif",
  letterSpacing: '0.5px',
  transition: 'color 0.2s ease',
};

export default Sidebar;
