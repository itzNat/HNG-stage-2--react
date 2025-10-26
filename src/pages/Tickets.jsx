// src/pages/Tickets.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTickets } from '../context/TicketsContext';
import TicketCard from '../components/Tickets/TicketCard';
import TicketForm from '../components/Tickets/TicketForm';
import TicketFilters from '../components/Tickets/TicketFilters';
import EmptyState from '../components/Tickets/EmptyState';
import './Tickets.css';

const Tickets = () => {
  const { tickets, loading, filter } = useTickets();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTicket = () => {
    setEditingTicket(null);
    setIsFormOpen(true);
  };

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTicket(null);
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

  if (loading) {
    return (
      <div className="tickets-loading">
        <motion.div
          className="loading-spinner large"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p>Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className="tickets-page">
      {/* Header */}
      <motion.div 
        className="tickets-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
          <h1 className="tickets-title">Ticket Management</h1>
          <p className="tickets-subtitle">
            Manage all your support tickets in one place
          </p>
        </div>
        
        <motion.button
          onClick={handleCreateTicket}
          className="create-ticket-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="btn-icon">➕</span>
          Create Ticket
        </motion.button>
      </motion.div>

      {/* Filters and Search */}
      <TicketFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        currentFilter={filter}
      />

      {/* Tickets Grid */}
      <div className="tickets-content">
        {filteredTickets.length === 0 ? (
          <EmptyState 
            filter={filter}
            searchTerm={searchTerm}
            onCreateTicket={handleCreateTicket}
          />
        ) : (
          <motion.div
            className="tickets-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredTickets.map((ticket, index) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onEdit={handleEditTicket}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Ticket Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <TicketForm
            ticket={editingTicket}
            onClose={handleCloseForm}
            isOpen={isFormOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tickets;