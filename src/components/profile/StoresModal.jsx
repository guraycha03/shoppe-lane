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

  const getAvatarColor = (name) => {
    if (!name || typeof name !== 'string') return '#ccc';
    const hue = (name.charCodeAt(0) * 45) % 360;
    return `hsl(${hue}, 60%, 75%)`;
  };  

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
        <div className="list-group">
          {followedStores.map((store) => (
            <div
              key={store.sellerId}
              className="list-group-item list-group-item-action d-flex align-items-center gap-3 px-3 py-2 mb-2 rounded shadow-sm"
              onClick={() => {
                navigate(`/store/${store.seller.toLowerCase().replace(/\s+/g, '-')}`);
                onClose();
              }}
              style={{
                cursor: 'pointer',
                border: '1px solid #eee',
                backgroundColor: '#fafafa',
              }}
            >
              <div
                className="rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: getAvatarColor(store.seller),
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  flexShrink: 0,
                  textShadow: '0 1px 2px rgba(0,0,0,0.15)',
                }}
              >
                {store.seller
                  ?.split(' ')
                  .map((word) => word[0]?.toUpperCase())
                  .join('')
                  .slice(0, 2) || '?'}
              </div>


              <div className="flex-grow-1">
                <div className="fw-semibold text-dark">{store.seller}</div>
              </div>
              <i className="bi bi-chevron-right text-muted"></i>
            </div>
          ))}
        </div>


      </div>
    </div>,
    document.body
  );
}

export default StoresModal;
