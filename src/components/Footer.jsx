import React from 'react';
import '../App.css';

function Footer() {
  return (
    <footer className="footer-wrapper mt-5 pt-5">
      <div className="footer-inner text-light">
        <div className="container-fluid px-0 py-4">
          <div className="row gx-4 gy-4 mx-0 px-4">
            {/* Shoppe Lane */}
            <div className="col-sm-6 col-lg-3">
              <h6 className="fw-bold mb-3">Shoppe Lane</h6>
              <ul className="list-unstyled small">
                <li><a href="#" className="footer-link">About Us</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
                <li><a href="#" className="footer-link">Shipping Info</a></li>
                <li><a href="#" className="footer-link">Returns & Refunds</a></li>
              </ul>
            </div>

            {/* Help */}
            <div className="col-sm-6 col-lg-3">
              <h6 className="fw-bold mb-3">Help</h6>
              <ul className="list-unstyled small">
                <li><a href="#" className="footer-link">FAQ</a></li>
                <li><a href="#" className="footer-link">Support Center</a></li>
                <li><a href="#" className="footer-link">Track Order</a></li>
                <li><a href="#" className="footer-link">Purchase Protection</a></li>
              </ul>
            </div>

            {/* Perks */}
            <div className="col-sm-6 col-lg-3">
              <h6 className="fw-bold mb-3">Perks</h6>
              <ul className="list-unstyled small">
                <li><a href="#" className="footer-link">Exclusive Offers</a></li>
                <li><a href="#" className="footer-link">Coupons & Alerts</a></li>
                <li><a href="#" className="footer-link">Affiliate Program</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div className="col-sm-6 col-lg-3">
              <h6 className="fw-bold mb-3">Connect</h6>
              <div className="d-flex gap-3 mb-3">
                <a href="#" className="footer-icon"><i className="bi bi-instagram"></i></a>
                <a href="#" className="footer-icon"><i className="bi bi-facebook"></i></a>
                <a href="#" className="footer-icon"><i className="bi bi-twitter-x"></i></a>
                <a href="#" className="footer-icon"><i className="bi bi-tiktok"></i></a>
              </div>
              <h6 className="fw-bold mb-2">Subscribe</h6>
              <form className="footer-form">
                <div className="row gx-2">
                  <div className="col-12 col-sm-8 mb-2 mb-sm-0">
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="col-12 col-sm-4">
                    <button className="btn btn-sm btn-outline-light w-100">Join</button>
                  </div>
                </div>
              </form>

            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="border-top border-secondary mt-5 pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center small text-light opacity-75 px-4">
            <div className="mb-2 mb-md-0">
              &copy; 2025 Shoppe Lane · All rights reserved ·
              <a href="#" className="footer-link ms-1">Terms</a> ·
              <a href="#" className="footer-link ms-1">Privacy</a>
            </div>
            <div className="payment-icons">
              <i className="bi bi-credit-card me-2"></i>
              <i className="bi bi-paypal me-2"></i>
              <i className="bi bi-apple me-2"></i>
              <i className="bi bi-google me-2"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
