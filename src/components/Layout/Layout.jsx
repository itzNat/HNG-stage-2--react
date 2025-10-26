// src/components/Layout/Layout.js
import React, { useState } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/tickets', label: 'Tickets', icon: '🎫' },
  ];

  return (
    <div className="layout">
      {/* Sidebar */}
      <motion.aside 
        className="sidebar"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        {/* Logo */}
        <motion.div 
          className="sidebar-logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/dashboard" className="logo-link">
            <span className="logo-icon">🎫</span>
            <span className="logo-text">TicketFlow</span>
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {location.pathname === item.path && (
                  <motion.div 
                    className="active-indicator"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* User Info & Logout */}
        <motion.div 
          className="sidebar-footer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="user-info">
            <div className="user-avatar">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.email}</span>
              <span className="user-role">Admin</span>
            </div>
          </div>
          <motion.button
            onClick={handleLogout}
            className="logout-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="logout-icon">🚪</span>
            Logout
          </motion.button>
        </motion.div>
      </motion.aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Mobile Header */}
        <motion.header 
          className="mobile-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="mobile-logo">
            <span>🎫</span>
            TicketFlow
          </div>
          <div className="user-mobile">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
        </motion.header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                className="mobile-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMobileMenu}
              />
              <motion.div 
                className="mobile-menu"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="mobile-menu-header">
                  <div className="user-info-mobile">
                    <div className="user-avatar">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                      <span className="user-name">{user?.email}</span>
                      <span className="user-role">Admin</span>
                    </div>
                  </div>
                  <button 
                    className="close-menu"
                    onClick={toggleMobileMenu}
                  >
                    ×
                  </button>
                </div>
                <nav className="mobile-nav">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`mobile-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                      onClick={toggleMobileMenu}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span className="nav-label">{item.label}</span>
                    </Link>
                  ))}
                </nav>
                <button 
                  className="mobile-logout-btn"
                  onClick={handleLogout}
                >
                  <span className="logout-icon">🚪</span>
                  Logout
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;