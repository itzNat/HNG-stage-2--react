// src/components/Tickets/TicketFilters.js
import React from 'react';
import { motion } from 'framer-motion';
import { useTickets } from '../../context/TicketsContext';
import './TicketFilters.css';

const TicketFilters = ({ searchTerm, onSearchChange, currentFilter }) => {
  const { setFilter, allTickets } = useTickets();

  const filters = [
    { key: 'all', label: 'All Tickets', count: allTickets.length },
    { key: 'open', label: 'Open', count: allTickets.filter(t => t.status === 'open').length },
    { key: 'in_progress', label: 'In Progress', count: allTickets.filter(t => t.status === 'in_progress').length },
    { key: 'closed', label: 'Closed', count: allTickets.filter(t => t.status === 'closed').length },
    { key: 'high', label: 'High Priority', count: allTickets.filter(t => t.priority === 'high').length },
    { key: 'medium', label: 'Medium Priority', count: allTickets.filter(t => t.priority === 'medium').length },
    { key: 'low', label: 'Low Priority', count: allTickets.filter(t => t.priority === 'low').length },
  ];

  return (
    <motion.div 
      className="tickets-filters"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="clear-search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {filters.map((filter) => (
          <motion.button
            key={filter.key}
            onClick={() => setFilter(filter.key)}
            className={`filter-tab ${currentFilter === filter.key ? 'active' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="filter-label">{filter.label}</span>
            <span className="filter-count">{filter.count}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default TicketFilters;