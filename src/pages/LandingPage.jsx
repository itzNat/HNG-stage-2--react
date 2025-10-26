// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Animated background elements */}
      <div className="floating-elements">
        <motion.div 
          className="floating-circle circle-1"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="floating-circle circle-2"
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -8, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="floating-circle circle-3"
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="landing-nav">
        <motion.div 
          className="nav-logo"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="logo-icon">🎫</span>
          TicketFlow
        </motion.div>
        <motion.div 
          className="nav-links"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/auth/login" className="nav-link">Login</Link>
          <Link to="/auth/signup" className="nav-btn">Get Started</Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Streamline Your
              <span className="gradient-text"> Ticket Management</span>
            </motion.h1>
            
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              The ultimate solution for managing support tickets across multiple teams. 
              Fast, intuitive, and beautifully designed to make your workflow seamless.
            </motion.p>

            <motion.div 
              className="hero-actions"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link to="/auth/signup" className="btn btn-primary">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                </motion.span>
              </Link>
              <Link to="/auth/login" className="btn btn-secondary">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login to Dashboard
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="glass-card">
              <div className="card-header">
                <div className="card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="card-content">
                <div className="ticket-preview">
                  <div className="ticket-item">
                    <div className="ticket-status open"></div>
                    <div className="ticket-info">
                      <h4>Login Issue</h4>
                      <p>High Priority</p>
                    </div>
                  </div>
                  <div className="ticket-item">
                    <div className="ticket-status in-progress"></div>
                    <div className="ticket-info">
                      <h4>Payment Failed</h4>
                      <p>Medium Priority</p>
                    </div>
                  </div>
                  <div className="ticket-item">
                    <div className="ticket-status closed"></div>
                    <div className="ticket-info">
                      <h4>Feature Request</h4>
                      <p>Low Priority</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wavy Background */}
        <div className="wavy-background">
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path 
              fill="var(--primary-color)" 
              fillOpacity="0.1" 
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,192C672,181,768,139,864,138.7C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Why Choose TicketFlow?
          </motion.h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="feature-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <p>&copy; 2024 TicketFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    description: "Built for speed with real-time updates and instant search capabilities."
  },
  {
    icon: "🎨",
    title: "Beautiful UI",
    description: "Carefully crafted interface that's both beautiful and intuitive to use."
  },
  {
    icon: "🔒",
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee."
  },
  {
    icon: "📱",
    title: "Fully Responsive",
    description: "Perfect experience on all devices, from mobile to desktop."
  }
];

export default LandingPage;