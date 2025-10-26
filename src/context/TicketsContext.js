// src/context/TicketsContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from './ToastContext';

const TicketsContext = createContext();

export const useTickets = () => {
  const context = useContext(TicketsContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketsProvider');
  }
  return context;
};

export const TicketsProvider = ({ children }) => {
  const toast = useToast();
  const [tickets, setTickets] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Load tickets and activities from localStorage on component mount
  useEffect(() => {
    const savedTickets = localStorage.getItem('ticketapp_tickets');
    const savedActivities = localStorage.getItem('ticketapp_activities');
    
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    } else {
      // Add demo tickets if none exist
      const demoData = createDemoData();
      setTickets(demoData.tickets);
      setActivities(demoData.activities);
    }
    
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
    
    setLoading(false);
  }, []);

  // Save tickets and activities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('ticketapp_activities', JSON.stringify(activities));
  }, [activities]);

  const addActivity = (action, ticket, user = 'You') => {
    const newActivity = {
      id: Date.now().toString(),
      action,
      ticket: ticket.title,
      ticketId: ticket.id,
      user,
      time: new Date().toISOString(),
      icon: getActivityIcon(action)
    };
    
    setActivities(prev => [newActivity, ...prev.slice(0, 9)]); // Keep only last 10 activities
  };

  const getActivityIcon = (action) => {
    switch (action) {
      case 'created': return '➕';
      case 'updated': return '✏️';
      case 'deleted': return '🗑️';
      case 'resolved': return '✅';
      case 'commented': return '💬';
      default: return '📝';
    }
  };

  const createTicket = (ticketData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const newTicket = {
            id: Date.now().toString(),
            title: ticketData.title,
            description: ticketData.description || '',
            status: ticketData.status,
            priority: ticketData.priority || 'medium',
            assignee: ticketData.assignee || 'Unassigned',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: 'current-user'
          };
          
          setTickets(prev => [newTicket, ...prev]);
          addActivity('created', newTicket);
          toast.success('Ticket created successfully!');
          resolve(newTicket);
        } catch (error) {
          toast.error('Failed to create ticket. Please try again.');
          reject(error);
        }
      }, 500);
    });
  };

  const updateTicket = (id, ticketData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          setTickets(prev => prev.map(ticket => {
            if (ticket.id === id) {
              const updatedTicket = { 
                ...ticket, 
                ...ticketData, 
                updatedAt: new Date().toISOString() 
              };
              addActivity('updated', updatedTicket);
              return updatedTicket;
            }
            return ticket;
          }));
          toast.success('Ticket updated successfully!');
          resolve();
        } catch (error) {
          toast.error('Failed to update ticket. Please try again.');
          reject(error);
        }
      }, 500);
    });
  };

  const deleteTicket = (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const ticketToDelete = tickets.find(ticket => ticket.id === id);
          setTickets(prev => prev.filter(ticket => ticket.id !== id));
          if (ticketToDelete) {
            addActivity('deleted', ticketToDelete);
          }
          toast.success('Ticket deleted successfully!');
          resolve();
        } catch (error) {
          toast.error('Failed to delete ticket. Please try again.');
          reject(error);
        }
      }, 500);
    });
  };

  const getTicketById = (id) => {
    return tickets.find(ticket => ticket.id === id);
  };

  const getFilteredTickets = () => {
    switch (filter) {
      case 'open':
        return tickets.filter(ticket => ticket.status === 'open');
      case 'in_progress':
        return tickets.filter(ticket => ticket.status === 'in_progress');
      case 'closed':
        return tickets.filter(ticket => ticket.status === 'closed');
      case 'high':
        return tickets.filter(ticket => ticket.priority === 'high');
      case 'medium':
        return tickets.filter(ticket => ticket.priority === 'medium');
      case 'low':
        return tickets.filter(ticket => ticket.priority === 'low');
      default:
        return tickets;
    }
  };

  // Calculate statistics based on actual tickets
  const getStats = () => {
    return {
      total: tickets.length,
      open: tickets.filter(ticket => ticket.status === 'open').length,
      inProgress: tickets.filter(ticket => ticket.status === 'in_progress').length,
      closed: tickets.filter(ticket => ticket.status === 'closed').length,
      high: tickets.filter(ticket => ticket.priority === 'high').length,
      medium: tickets.filter(ticket => ticket.priority === 'medium').length,
      low: tickets.filter(ticket => ticket.priority === 'low').length,
    };
  };

  const createDemoData = () => {
    const demoTickets = [
      {
        id: '1',
        title: 'Login Issue - Unable to access account',
        description: 'Users are reporting they cannot login to their accounts. Getting authentication errors.',
        status: 'open',
        priority: 'high',
        assignee: 'Sarah Chen',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        createdBy: 'system'
      },
      {
        id: '2',
        title: 'Payment Gateway Integration',
        description: 'Integrate new payment gateway for international transactions.',
        status: 'in_progress',
        priority: 'high',
        assignee: 'Mike Ross',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        createdBy: 'system'
      },
      {
        id: '3',
        title: 'Mobile App Crash on iOS',
        description: 'App crashes when navigating to profile section on iOS devices.',
        status: 'open',
        priority: 'medium',
        assignee: 'Alex Johnson',
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        createdBy: 'system'
      },
      {
        id: '4',
        title: 'Update Documentation',
        description: 'Update API documentation with new endpoints and examples.',
        status: 'closed',
        priority: 'low',
        assignee: 'You',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        createdBy: 'system'
      },
      {
        id: '5',
        title: 'Email Notification Delay',
        description: 'Users are experiencing delays in receiving email notifications.',
        status: 'in_progress',
        priority: 'medium',
        assignee: 'Sarah Chen',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        updatedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
        createdBy: 'system'
      },
      {
        id: '6',
        title: 'Database Optimization',
        description: 'Optimize database queries for better performance.',
        status: 'closed',
        priority: 'high',
        assignee: 'Mike Ross',
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        createdBy: 'system'
      }
    ];

    const demoActivities = [
      {
        id: '1',
        action: 'created',
        ticket: 'Login Issue - Unable to access account',
        ticketId: '1',
        user: 'Sarah Chen',
        time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        icon: '➕'
      },
      {
        id: '2',
        action: 'updated',
        ticket: 'Payment Gateway Integration',
        ticketId: '2',
        user: 'Mike Ross',
        time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        icon: '✏️'
      },
      {
        id: '3',
        action: 'resolved',
        ticket: 'Database Optimization',
        ticketId: '6',
        user: 'Mike Ross',
        time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        icon: '✅'
      },
      {
        id: '4',
        action: 'commented',
        ticket: 'Mobile App Crash on iOS',
        ticketId: '3',
        user: 'You',
        time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        icon: '💬'
      }
    ];

    return { tickets: demoTickets, activities: demoActivities };
  };

  const value = {
    tickets: getFilteredTickets(),
    allTickets: tickets,
    activities,
    loading,
    filter,
    setFilter,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
    getStats
  };

  return (
    <TicketsContext.Provider value={value}>
      {children}
    </TicketsContext.Provider>
  );
};