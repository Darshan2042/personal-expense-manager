import React, { useEffect, useState } from "react";
import Header1 from "./Header1";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Home.css";
import homepageImg from "../../../src/Images/homepage-img.png";

const Home = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "📊",
      title: "Smart Analytics",
      description: "Track spending patterns with beautiful visualizations"
    },
    {
      icon: "💰",
      title: "Budget Management",
      description: "Set and monitor budgets for different categories"
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Bank-level security for your financial data"
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description: "Access your finances anywhere, anytime"
    }
  ];

  const stats = [
    { number: "10K+", label: "Users" },
    { number: "50K+", label: "Transactions" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/user");
    }
  }, [navigate]);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <>
      <Header1 />
      <div className="mt-0">
        <div className="home">
          <section className="hero-section">
            <div className={`hero ${isVisible ? 'fade-in' : ''}`}>
              <h2>Welcome to Expense Management System</h2>
              <p>
                Welcome to the{" "}
                <span className="app-name">Expense Management System</span> App.
                Take control of your finances with our powerful and intuitive expense tracking platform. 
                Track your income and expenses, analyze spending patterns with beautiful visualizations, 
                and make smarter financial decisions. Manage your money efficiently and achieve your financial goals.
              </p>
              <div className="buttons">
                <Link to="/login" className="join">
                  Join Now
                </Link>
                <Link to="/about-us" className="learn">
                  Learn More
                </Link>
              </div>
            </div>
            <div className={`img ${isVisible ? 'fade-in' : ''}`} style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
              <img src={homepageImg} alt="homepage-img" />
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            <div className="stats-container-home">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`stat-card-home ${isVisible ? 'fade-in-up' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="stat-number-home">{stat.number}</h3>
                  <p className="stat-label-home">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="features-section">
            <div className="features-header">
              <h2 className="features-title">Why Choose Us?</h2>
              <p className="features-subtitle">
                Powerful features designed to simplify your financial life
              </p>
            </div>
            <div className="features-grid-home">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`feature-card-home ${currentFeature === index ? 'active' : ''} ${isVisible ? 'fade-in-up' : ''}`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="feature-icon-home">{feature.icon}</div>
                  <h3 className="feature-title-home">{feature.title}</h3>
                  <p className="feature-description-home">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Take Control?</h2>
              <p className="cta-text">
                Join thousands of users who are already managing their finances smarter
              </p>
              <div className="cta-buttons">
                <Link to="/register" className="cta-button primary">
                  Get Started Free
                </Link>
                <Link to="/contact-us" className="cta-button secondary">
                  Contact Sales
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
