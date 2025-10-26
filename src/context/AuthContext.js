// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('ticketapp_session');
    if (token) {
      try {
        const userData = JSON.parse(token);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing auth token:', error);
        localStorage.removeItem('ticketapp_session');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user exists in localStorage
        const existingUsers = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
        const userExists = existingUsers.find(user => user.email === email && user.password === password);
        
        if (userExists) {
          const userData = { email, id: userExists.id };
          const token = JSON.stringify(userData);
          localStorage.setItem('ticketapp_session', token);
          setUser(userData);
          toast.success('Welcome back! Login successful.');
          resolve(userData);
        } else {
          const error = new Error('Invalid email or password. Please sign up first.');
          toast.error(error.message);
          reject(error);
        }
      }, 1500);
    });
  };

  const signup = async (email, password, confirmPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validate passwords match
        if (password !== confirmPassword) {
          const error = new Error('Passwords do not match');
          toast.error(error.message);
          reject(error);
          return;
        }

        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
        const userExists = existingUsers.find(user => user.email === email);
        
        if (userExists) {
          const error = new Error('User already exists. Please login instead.');
          toast.error(error.message);
          reject(error);
          return;
        }

        // Validate email and password
        if (!email || !password) {
          const error = new Error('Please fill all fields');
          toast.error(error.message);
          reject(error);
          return;
        }

        if (password.length < 6) {
          const error = new Error('Password must be at least 6 characters');
          toast.error(error.message);
          reject(error);
          return;
        }

        // Create new user
        const newUser = { 
          email, 
          password, // In real app, this would be hashed
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };

        // Save user to users list
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem('ticketapp_users', JSON.stringify(updatedUsers));

        // Auto-login the new user
        const userData = { email, id: newUser.id };
        const token = JSON.stringify(userData);
        localStorage.setItem('ticketapp_session', token);
        setUser(userData);
        
        toast.success('Account created successfully! Welcome to TicketFlow.');
        resolve(userData);
      }, 1500);
    });
  };

  const logout = () => {
    localStorage.removeItem('ticketapp_session');
    setUser(null);
    toast.info('You have been logged out successfully.');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};