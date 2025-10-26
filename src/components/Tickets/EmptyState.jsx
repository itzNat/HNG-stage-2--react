// src/components/Tickets/EmptyState.js
import React from 'react';
import { motion } from 'framer-motion';
import './EmptyState.css';

const EmptyState = ({ filter, searchTerm, onCreateTicket }) => {
  const getEmptyMessage = () => {
    if (searchTerm) {
      return `No tickets found for "${searchTerm}"`;
    }
    
    switch (filter) {
      case 'open':
        return 'No open tickets';
      case 'in_progress':
        return 'No tickets in progress';
      case 'closed':
        return 'No closed tickets';
      case 'high':
        return 'No high priority tickets';
      case 'medium':
        return 'No medium priority tickets';
      case 'low':
        return 'No low priority tickets';
      default:
        return 'No tickets created yet';
    }
  };

  const getSubMessage = () => {
    if (searchTerm) {
      return 'Try adjusting your search terms or clear the search';
    }
    return filter === 'all' 
      ? 'Get started by creating your first ticket'
      : 'All tickets are filtered out or none match the current filter';
  };

  return (
    <motion.div 
      className="empty-state"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="empty-icon">🎫</div>
      <h3 className="empty-title">{getEmptyMessage()}</h3>
      <p className="empty-subtitle">{getSubMessage()}</p>
      {filter === 'all' && (
        <motion.button
          onClick={onCreateTicket}
          className="empty-action-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Your First Ticket
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;