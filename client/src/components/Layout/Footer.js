import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={`modern-footer ${isVisible ? 'fade-in' : ''}`}>
      {/* Scroll to Top Button */}
      <button 
        className="scroll-to-top" 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>

      <div className="footer-content">
        {/* Company Info */}
        <div className="footer-section">
          <h3 className="footer-logo">
            <span className="logo-icon">💰</span>
            Expense Manager
          </h3>
          <p className="footer-description">
            Take control of your finances with our powerful and intuitive expense tracking platform.
          </p>
          <div className="social-links">
            <a href="https://portfolio-website-delta-sand-29.vercel.app/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Portfolio">
              🌐
            </a>
            <a href="mailto:pawardarshan1204@gmail.com" className="social-icon" aria-label="Email">
              📧
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              💼
            </a>
            <a href="#" className="social-icon" aria-label="GitHub">
              🔗
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/contact-us">Contact</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h4 className="footer-title">Resources</h4>
          <ul className="footer-links">
            <li><Link to="/about-us">About</Link></li>
            <li><Link to="/contact-us">Support</Link></li>
            <li><a href="https://portfolio-website-delta-sand-29.vercel.app/" target="_blank" rel="noopener noreferrer">Portfolio</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="footer-title">Contact</h4>
          <ul className="footer-contact">
            <li>
              <span className="contact-icon">�</span>
              Darshan Pawar
            </li>
            <li>
              <span className="contact-icon">📧</span>
              <a href="mailto:pawardarshan1204@gmail.com">pawardarshan1204@gmail.com</a>
            </li>
            <li>
              <span className="contact-icon">💼</span>
              <a href="https://portfolio-website-delta-sand-29.vercel.app/" target="_blank" rel="noopener noreferrer">View Portfolio</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <p className="copyright">
          © {currentYear} Darshan Pawar. All rights reserved.
        </p>
        <p className="made-with">
          Made with <span className="heart">❤️</span> in India
        </p>
      </div>
    </footer>
  );
};

export default Footer;
