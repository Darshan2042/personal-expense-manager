import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../Images/logo-animated-alt.svg";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="modern-footer">
      {/* Animated Background */}
      <div className="footer-background"></div>
      
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <div className="footer-logo">
              <img src={logo} alt="Logo" className="footer-logo-img" />
              <span className="footer-logo-text">Expense Manager</span>
            </div>
            <p className="footer-description">
              Take control of your finances with our powerful and intuitive expense tracking platform. Track, analyze, and optimize your spending effortlessly.
            </p>
            <div className="footer-social">
              <a href="https://portfolio-website-delta-sand-29.vercel.app/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Portfolio">
                <span className="social-icon">🌐</span>
              </a>
              <a href="mailto:pawardarshan1204@gmail.com" className="social-btn" aria-label="Email">
                <span className="social-icon">📧</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Access</h4>
            <ul className="footer-links">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Get Started</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-section">
            <h4 className="footer-title">Support</h4>
            <ul className="footer-links">
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Get in Touch</h4>
            <div className="footer-contact">
              <a href="mailto:pawardarshan1204@gmail.com" className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>pawardarshan1204@gmail.com</span>
              </a>
              <a href="https://portfolio-website-delta-sand-29.vercel.app/" target="_blank" rel="noopener noreferrer" className="contact-item">
                <span className="contact-icon">🔗</span>
                <span>Portfolio Website</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} Expense Manager. All rights reserved.
            </p>
            <p className="creator">
              Crafted with <span className="heart">❤️</span> by <a href="https://portfolio-website-delta-sand-29.vercel.app/" target="_blank" rel="noopener noreferrer">Darshan Pawar</a>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
        <span>↑</span>
      </button>
    </footer>
  );
};

export default Footer;
