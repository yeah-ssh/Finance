import React, { useState, useEffect } from 'react';
import { ChevronRight, DollarSign, TrendingUp, PieChart, Shield, Zap, Users } from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ onEnterApp }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: DollarSign,
      title: "Track Expenses",
      description: "Monitor your spending with detailed transaction history"
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Get insights into your spending patterns and trends"
    },
    {
      icon: PieChart,
      title: "Visual Reports",
      description: "Beautiful charts and graphs to visualize your finances"
    }
  ];

  return (
    <div className="landing-page">
      <div className="bg-animation">
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`shape shape-${i + 1}`}></div>
          ))}
        </div>
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>

      <header className="landing-header">
        <div className="container">
          <div className="nav-brand">
            <DollarSign className="brand-icon" />
            <span className="brand-text">Finance Tracker</span>
          </div>
          <button className="cta-button-small" onClick={onEnterApp}>
            Launch App
          </button>
        </div>
      </header>

      <section className={`hero ${isLoaded ? 'loaded' : ''}`}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Take Control of Your
              <span className="gradient-text"> Financial Future</span>
            </h1>
            <p className="hero-subtitle">
              Track expenses, analyze spending patterns, and make smarter financial decisions with our intuitive finance tracker.
            </p>
            <div className="hero-actions">
              <button className="cta-button-primary" onClick={onEnterApp}>
                Get Started Free
                <ChevronRight className="button-icon" />
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="preview-card card-1">
                <div className="card-header">
                  <div className="card-icon">
                    <TrendingUp size={20} />
                  </div>
                  <div className="card-title">Monthly Expenses</div>
                </div>
                <div className="card-value">₹2,000</div>
                <div className="card-trend positive">+12.5%</div>
              </div>
              <div className="preview-card card-2">
                <div className="card-header">
                  <div className="card-icon">
                    <PieChart size={20} />
                  </div>
                  <div className="card-title">Top Category</div>
                </div>
                <div className="card-value">Food & Dining</div>
                <div className="card-trend">₹1,245.80</div>
              </div>
              <div className="preview-card card-3">
                <div className="card-header">
                  <div className="card-icon">
                    <Shield size={20} />
                  </div>
                  <div className="card-title">Budget Status</div>
                </div>
                <div className="card-value">On Track</div>
                <div className="card-trend positive">85% used</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Everything you need to manage your money</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <feature.icon size={32} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to start your financial journey?</h2>
            <p className="cta-subtitle">Join thousands of users who are already taking control of their finances.</p>
            <button className="cta-button-primary large" onClick={onEnterApp}>
              Start Tracking Now
              <ChevronRight className="button-icon" />
            </button>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <DollarSign className="brand-icon" />
              <span className="brand-text">Finance Tracker</span>
            </div>
            <p className="footer-text">Built with ❤️ by Yash Rajput</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;