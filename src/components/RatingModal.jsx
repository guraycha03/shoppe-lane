// src/components/RatingModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function RatingModal({ show, handleClose, ratings }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ backgroundColor: '#fefefe' }}>
        <Modal.Title style={{ fontWeight: '600', fontSize: '1.25rem' }}>
          Product Ratings & Comments
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#fffdf9', maxHeight: '400px', overflowY: 'auto' }}>
        {ratings.length === 0 ? (
          <p className="text-muted text-center">No reviews yet.</p>
        ) : (
          ratings.map((review, idx) => (
            <div
              key={idx}
              className="mb-3 p-3 rounded"
              style={{ backgroundColor: '#fff', border: '1px solid #eee' }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <strong>{review.user}</strong>
                <span className="text-warning">
                  {'★'.repeat(review.stars)}
                  {'☆'.repeat(5 - review.stars)}
                </span>
              </div>
              <p className="mb-0 mt-2 text-muted" style={{ fontSize: '0.95rem' }}>{review.comment}</p>
            </div>
          ))
        )}
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: '#fefefe' }}>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RatingModal;
