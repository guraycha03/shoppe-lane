import React from 'react';

function NotificationBanner({ message }) {
  if (!message) return null;

  return (
    <div
      className="alert alert-warning alert-dismissible fade show text-center"
      role="alert"
      style={{
        position: 'fixed',
        top: '80px', // just below your header
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1050,
        width: '90%',
        maxWidth: '500px',
      }}
    >
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      {message}
    </div>
  );
}

export default NotificationBanner;
