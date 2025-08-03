import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';

function StoresModal({ onClose, followedStores }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.25)', 
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        isolation: 'isolate',
        transform: 'translateZ(0)',
        transition: 'opacity 0.3s ease',
        opacity: 1,
      }}
    >
      <div
        ref={modalRef}
        style={{
          width: '90%',
          maxWidth: '500px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          padding: '1.5rem',
          position: 'relative',
          zIndex: 100000,
        }}
      >
        <button
          type="button"
          className="btn-close"
          style={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={onClose}
        ></button>

        <h5 className="modal-title mb-3">Stores You Follow</h5>
        {followedStores.map((store) => (
          <li
            key={store.sellerId}
            onClick={() => {
              navigate(`/store/${store.seller.toLowerCase().replace(/\s+/g, '-')}`);
              onClose();
            }}
            style={{
              cursor: 'pointer',
              padding: '0.5rem 0',
              color: '#0d6efd',
              textDecoration: 'underline',
            }}
          >
            {store.seller}
          </li>
        ))}

      </div>
    </div>,
    document.body
  );
}

export default StoresModal;
