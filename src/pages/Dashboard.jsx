// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTickets } from '../context/TicketsContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { getStats, activities } = useTickets();
  
  const stats = getStats();

  const statCards = [
    {
      title: 'Total Tickets',
      value: stats.total,
      icon: '📋',
      color: 'var(--primary-color)',
      description: 'All tickets in the system'
    },
    {
      title: 'Open Tickets',
      value: stats.open,
      icon: '🟢',
      color: 'var(--success-color)',
      description: 'Requires attention'
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: '🟡',
      color: 'var(--warning-color)',
      description: 'Currently being worked on'
    },
    {
      title: 'Resolved',
      value: stats.closed,
      icon: '🔵',
      color: 'var(--text-secondary)',
      description: 'Successfully closed'
    }
  ];

  const recentActivities = activities.slice(0, 4); // Show only 4 most recent activities

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
          <h1 className="dashboard-title">
            Welcome back, {user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="dashboard-subtitle">
            Here's what's happening with your {stats.total} tickets today.
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/tickets" className="cta-button">
            <span>Manage Tickets</span>
            <span className="cta-icon">🎫</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Statistics Grid */}
      <motion.div 
        className="stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            className="stat-card glass-card"
            variants={itemVariants}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <div className="stat-header">
              <div 
                className="stat-icon"
                style={{ backgroundColor: `${card.color}20` }}
              >
                <span style={{ color: card.color }}>{card.icon}</span>
              </div>
              <motion.div 
                className="stat-value"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  delay: 0.5 + index * 0.1 
                }}
              >
                {card.value}
              </motion.div>
            </div>
            <h3 className="stat-title">{card.title}</h3>
            <p className="stat-description">{card.description}</p>
            <motion.div 
              className="stat-progress"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 1 + index * 0.1 }}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="dashboard-content">
        {/* Recent Activity */}
        <motion.div 
          className="activity-section"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="section-header">
            <h2 className="section-title">Recent Activity</h2>
            <span className="section-badge">{activities.length}</span>
          </div>
          <div className="activity-list">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="activity-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <p className="activity-text">
                      <strong>{activity.user}</strong> {activity.action} ticket 
                      <strong> "{activity.ticket}"</strong>
                    </p>
                    <span className="activity-time">
                      {formatTimeAgo(activity.time)}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="empty-activities">
                <p>No recent activities</p>
                <small>Activities will appear here when you create or update tickets</small>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="quick-actions-section"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="section-header">
            <h2 className="section-title">Quick Actions</h2>
          </div>
          <div className="quick-actions-grid">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/tickets?create=new" className="quick-action-card">
                <div className="action-icon">➕</div>
                <h3>Create Ticket</h3>
                <p>Create a new support ticket</p>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/tickets?filter=open" className="quick-action-card">
                <div className="action-icon">🟢</div>
                <h3>View Open</h3>
                <p>See all open tickets ({stats.open})</p>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/tickets?filter=in_progress" className="quick-action-card">
                <div className="action-icon">🟡</div>
                <h3>In Progress</h3>
                <p>Tickets being worked on ({stats.inProgress})</p>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/tickets?filter=closed" className="quick-action-card">
                <div className="action-icon">🔵</div>
                <h3>Resolved</h3>
                <p>Completed tickets ({stats.closed})</p>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;