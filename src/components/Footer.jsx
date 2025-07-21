// Footer.jsx
import React from 'react';
import '../App.css';

function Footer() {
  return (
    <footer className="bg-footer text-light pt-5 pb-4 mt-5">
      <div className="container-fluid px-4">

        <div className="row gy-4">
          <div className="col-sm-6 col-lg-3">
            <h6 className="fw-bold mb-3">Shoppe Lane</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Shipping Info</a></li>
              <li><a href="#" className="footer-link">Returns & Refunds</a></li>
            </ul>
          </div>
          <div className="col-sm-6 col-lg-3">
            <h6 className="fw-bold mb-3">Help</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="footer-link">FAQ</a></li>
              <li><a href="#" className="footer-link">Support Center</a></li>
              <li><a href="#" className="footer-link">Track Order</a></li>
              <li><a href="#" className="footer-link">Purchase Protection</a></li>
            </ul>
          </div>
          <div className="col-sm-6 col-lg-3">
            <h6 className="fw-bold mb-3">Perks</h6>
            <ul className="list-unstyled small">
              <li><a href="#" className="footer-link">Exclusive Offers</a></li>
              <li><a href="#" className="footer-link">Coupons & Alerts</a></li>
              <li><a href="#" className="footer-link">Affiliate Program</a></li>
            </ul>
          </div>
          <div className="col-sm-6 col-lg-3">
            <h6 className="fw-bold mb-3">Connect</h6>
            <div className="d-flex gap-3">
              <a href="#" className="footer-icon"><i className="bi bi-instagram"></i></a>
              <a href="#" className="footer-icon"><i className="bi bi-facebook"></i></a>
              <a href="#" className="footer-icon"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="footer-icon"><i className="bi bi-tiktok"></i></a>
            </div>
          </div>
        </div>

        <div className="text-center mt-5 small text-light opacity-75">
          &copy; 2025 Shoppe Lane · All rights reserved · 
          <a href="#" className="footer-link ms-1">Terms</a> · 
          <a href="#" className="footer-link ms-1">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
