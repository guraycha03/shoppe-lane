// src/components/SpecificationsBox.jsx

import React from 'react';

function SpecificationsBox({ specs, isMobile, showSpecs, setShowSpecs }) {
  return (
    <div className="card shadow-sm p-3 product-details-box">
      <h5 className="mb-3 text-accent d-none d-md-block">Specifications</h5>

      {isMobile && (
        <button
          className="btn btn-outline-secondary d-block d-md-none mb-3"
          type="button"
          onClick={() => setShowSpecs((prev) => !prev)}
        >
          {showSpecs ? 'Hide Specifications' : 'View Specifications'}
        </button>
      )}

      {(!isMobile || showSpecs) && (
        <ul className="mb-0 ps-3 product-info-list text-muted" style={{ listStyleType: 'disc' }}>
          {Object.entries(specs || {}).map(([key, value]) => (
            <li key={key} style={{ listStyleType: 'disc', marginBottom: '0.5rem' }}>
              <strong className="me-1">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:
              </strong>
              {Array.isArray(value) ? value.join(', ') : value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SpecificationsBox;
