// src/components/Sidebar.jsx

import { useEffect, useRef } from 'react';

function Sidebar({
  isLoggedIn,
  sidebarOpen,
  setSidebarOpen,
  navigate,
  expandedSection,
  toggleSection
}) {
  const sidebarRef = useRef(null);

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

  const closeSidebar = () => setSidebarOpen(false);

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
      <div className="sidebar-overlay" onClick={closeSidebar}></div>
      <aside className="sidebar-panel" ref={sidebarRef}>
        <div className="sidebar-header">
          <span>Menu</span>
          <i className="bi bi-x" onClick={closeSidebar}></i>
        </div>

        {renderDropdown('Account & Support', 'bi-person-circle', 'account', [
          {
            label: isLoggedIn ? 'My Account' : 'Login',
            path: isLoggedIn ? '/account' : '/login',
          },
          ...(isLoggedIn
            ? [
                { label: 'Wishlist', path: '/wishlist' },
                { label: 'My Orders', path: '/orders' },
              ]
            : []),
          { label: 'Help Center', path: '/help' },
          { label: 'Contact Us', path: '/contact' },
        ])}

        {renderDropdown('Shop', 'bi-bag', 'shop', [
          { label: 'Shop All Products', path: '/shop' },
          { label: 'Beauty', path: '/category/beauty' },
          { label: 'Women', path: '/category/women' },
          { label: 'Men', path: '/category/men' },
          { label: 'Kids', path: '/category/kids' },
          { label: 'Accessories', path: '/category/accessories' },
          { label: 'Home', path: '/category/home' },
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
  );
}

export default Sidebar;
