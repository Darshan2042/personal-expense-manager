import React, { useState, useEffect } from "react";
import Header1 from "../../components/Layout/Header1";
import Footer from "../../components/Layout/Footer";
import "./AboutUs.css";

const AboutUs = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(scroll);

      // Intersection observer for fade-in animations
      const elements = document.querySelectorAll('.about-section');
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8;
        setIsVisible(prev => ({ ...prev, [index]: isInView }));
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: "📊", title: "Analytics Dashboard", description: "Visual insights into your spending patterns" },
    { icon: "💰", title: "Transaction Tracking", description: "Easy recording of income and expenses" },
    { icon: "📈", title: "Financial Reports", description: "Detailed reports with export functionality" },
    { icon: "🔒", title: "Secure & Private", description: "Bank-level security for your data" },
    { icon: "📱", title: "Responsive Design", description: "Works seamlessly on all devices" },
    { icon: "⚡", title: "Real-time Updates", description: "Instant balance calculations" }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50K+", label: "Transactions" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <>
      <Header1 />
      <div className="auth-page-wrapper">
        {/* Progress Bar */}
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress * 100}%` }}></div>
        
        <div className="about-us-content">
          <div className="about-us-page">
            {/* Hero Section */}
            <div className="about-hero">
              <h1 className="about-us-title">
                <span className="title-line">Empowering Your</span>
                <span className="title-line gradient-text">Financial Journey</span>
              </h1>
              <p className="hero-subtitle">
                Transforming the way you manage money with innovative technology
              </p>
            </div>

            {/* Stats Section */}
            <div className="stats-container">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h3 className="stat-number">{stat.number}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Main Content Card */}
            <div className="about-us-card">
              <div className={`about-section ${isVisible[0] ? 'fade-in-up' : ''}`}>
                <div className="section-header">
                  <span className="section-icon">👨‍💻</span>
                  <h2 className="section-title">About the Developer</h2>
                </div>
                <p className="section-text">
                  Hi, I'm Darshan Pawar, a passionate full-stack developer dedicated to creating 
                  innovative solutions that simplify financial management for individuals and businesses. 
                  I am committed to delivering high-quality software applications that 
                  empower users to take control of their finances with intuitive and powerful tools.
                </p>
              </div>

              <div className={`about-section ${isVisible[1] ? 'fade-in-up' : ''}`}>
                <div className="section-header">
                  <span className="section-icon">💼</span>
                  <h2 className="section-title">Expense Management System</h2>
                </div>
                <p className="section-text">
                  Our Expense Management System is a comprehensive web application designed 
                  to help you track, manage, and analyze your income and expenses efficiently. 
                  Built with modern technologies like React, Node.js, and MongoDB, the platform 
                  offers intuitive features including transaction management, category-wise analytics, 
                  customizable date ranges, and detailed financial reports. Whether you're managing 
                  personal finances or tracking business expenses, our system provides 
                  the tools you need to make informed financial decisions.
                </p>
              </div>

              {/* Features Grid */}
              <div className={`about-section ${isVisible[2] ? 'fade-in-up' : ''}`}>
                <div className="section-header">
                  <span className="section-icon">✨</span>
                  <h2 className="section-title">Key Features</h2>
                </div>
                <div className="features-grid">
                  {features.map((feature, index) => (
                    <div 
                      key={index} 
                      className={`feature-card ${activeCard === index ? 'active' : ''}`}
                      onMouseEnter={() => setActiveCard(index)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="feature-icon">{feature.icon}</span>
                      <h3 className="feature-title">{feature.title}</h3>
                      <p className="feature-description">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack */}
              <div className={`about-section ${isVisible[3] ? 'fade-in-up' : ''}`}>
                <div className="section-header">
                  <span className="section-icon">🚀</span>
                  <h2 className="section-title">Built With Modern Technology</h2>
                </div>
                <div className="tech-stack">
                  <div className="tech-item">React</div>
                  <div className="tech-item">Node.js</div>
                  <div className="tech-item">Express</div>
                  <div className="tech-item">MongoDB</div>
                  <div className="tech-item">JWT Auth</div>
                  <div className="tech-item">Bootstrap</div>
                </div>
              </div>

              <div className={`about-section ${isVisible[4] ? 'fade-in-up' : ''}`}>
                <div className="section-header">
                  <span className="section-icon">🎯</span>
                  <h2 className="section-title">Our Mission</h2>
                </div>
                <p className="section-text mission-text">
                  Our mission is to make financial management accessible, simple, and 
                  effective for everyone. We believe that with the right tools, anyone 
                  can achieve better financial control and make smarter decisions about 
                  their money. We are continuously working to improve our platform and 
                  add new features based on user feedback.
                </p>
              </div>

              <div className={`about-section ${isVisible[5] ? 'fade-in-up' : ''}`}>
                <div className="section-header">
                  <span className="section-icon">📞</span>
                  <h2 className="section-title">Contact Information</h2>
                </div>
                <div className="contact-info-card">
                  <div className="info-item">
                    <strong>Developer:</strong> Darshan Pawar
                  </div>
                  <div className="info-item">
                    <strong>Email:</strong> <a href="mailto:pawardarshan1204@gmail.com" className="contact-link">pawardarshan1204@gmail.com</a>
                  </div>
                  <div className="info-item">
                    <strong>Portfolio:</strong> <a href="https://portfolio-website-delta-sand-29.vercel.app/" target="_blank" rel="noopener noreferrer" className="contact-link">View My Work</a>
                  </div>
                </div>
              </div>

              <div className={`about-section closing-section ${isVisible[6] ? 'fade-in-up' : ''}`}>
                <p className="closing-text">
                  Thank you for choosing this Expense Management System. I am committed 
                  to providing you with the best possible experience and continuously 
                  improving the application to meet your financial management needs.
                </p>
                <div className="cta-buttons">
                  <a href="/register" className="cta-button primary">Get Started</a>
                  <a href="/contact-us" className="cta-button secondary">Contact Me</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
