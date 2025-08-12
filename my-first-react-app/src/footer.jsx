import React from 'react';
import './Footer.css';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaShieldAlt,
  FaFileAlt,
  FaCookieBite,
} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        {/* Left Column - Company Info */}
        <div className="footer-column">
          <h3 className="footer-title">Rentix</h3>
          <div className="underline" />
          <p>
            Your premium destination for car and bike rentals. Experience freedom and
            adventure with our meticulously maintained fleet of vehicles.
          </p>
        </div>

        {/* Center Column - Legal */}
        <div className="footer-column">
          <h3 className="footer-title">Legal</h3>
          <div className="underline" />
          <ul className="footer-list">
            <li>
              <FaShieldAlt /> <a href="#">Privacy Policy</a>
            </li>
            <li>
              <FaFileAlt /> <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <FaCookieBite /> <a href="#">Cookie Policy</a>
            </li>
          </ul>
        </div>

        {/* Right Column - Contact */}
        <div className="footer-column">
          <h3 className="footer-title">Contact Us</h3>
          <div className="underline" />
          <ul className="footer-contact-list">
            <li><FaMapMarkerAlt /> 123 Adventure Lane, Urban City</li>
            <li><FaPhoneAlt /> +1 (555) 123-4567</li>
            <li><FaEnvelope /> info@rentix.com</li>
            <li><FaClock /> Mon–Sun: 8AM – 8PM</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
