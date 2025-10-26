// src/components/Tickets/TicketCard.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTickets } from '../../context/TicketsContext';
import ConfirmDialog from '../UI/ConfirmDialog';
import './TicketCard.css';

const TicketCard = ({ ticket, onEdit, index }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { deleteTicket } = useTickets();

  const handleDelete = async () => {
    try {
      await deleteTicket(ticket.id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Failed to delete ticket:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return '#2ecc71';
      case 'in_progress': return '#f39c12';
      case 'closed': return '#95a5a6';
      default: return '#bdc3c7';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <motion.div
        className="ticket-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        layout
      >
        {/* Header */}
        <div className="ticket-header">
          <div className="ticket-title-section">
            <h3 className="ticket-title">{ticket.title}</h3>
            <div className="ticket-meta">
              <span className="ticket-id">#{ticket.id.slice(-6)}</span>
              <span className="ticket-date">{formatDate(ticket.createdAt)}</span>
            </div>
          </div>
          <div className="ticket-actions">
            <motion.button
              onClick={() => onEdit(ticket)}
              className="action-btn edit-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Edit ticket"
            >
              ✏️
            </motion.button>
            <motion.button
              onClick={() => setShowDeleteDialog(true)}
              className="action-btn delete-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Delete ticket"
            >
              🗑️
            </motion.button>
          </div>
        </div>

        {/* Description */}
        {ticket.description && (
          <p className="ticket-description">
            {ticket.description.length > 120 
              ? `${ticket.description.substring(0, 120)}...`
              : ticket.description
            }
          </p>
        )}

        {/* Status and Priority */}
        <div className="ticket-tags">
          <span 
            className="status-tag"
            style={{ 
              backgroundColor: `${getStatusColor(ticket.status)}20`,
              color: getStatusColor(ticket.status),
              border: `1px solid ${getStatusColor(ticket.status)}40`
            }}
          >
            {ticket.status.replace('_', ' ')}
          </span>
          <span 
            className="priority-tag"
            style={{ 
              backgroundColor: `${getPriorityColor(ticket.priority)}20`,
              color: getPriorityColor(ticket.priority),
              border: `1px solid ${getPriorityColor(ticket.priority)}40`
            }}
          >
            {ticket.priority} priority
          </span>
        </div>

        {/* Footer */}
        <div className="ticket-footer">
          <div className="assignee">
            <span className="assignee-label">Assigned to:</span>
            <span className="assignee-name">{ticket.assignee}</span>
          </div>
          <div className="ticket-updated">
            Updated {formatDate(ticket.updatedAt)}
          </div>
        </div>

        {/* Status Indicator */}
        <div 
          className="status-indicator"
          style={{ backgroundColor: getStatusColor(ticket.status) }}
        />
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Ticket"
        message={`Are you sure you want to delete "${ticket.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default TicketCard;