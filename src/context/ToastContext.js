// src/context/ToastContext.js
import React, { createContext, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success', duration = 4000) => {
    const id = Date.now().toString();
    const newToast = {
      id,
      message,
      type,
      duration
    };

    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const toast = {
    success: (message, duration=4000) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    warning: (message, duration) => showToast(message, 'warning', duration),
    info: (message, duration) => showToast(message, 'info', duration)
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      
      {/* Toast Container */}
      <div className="toast-container">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const Toast = ({ message, type, onClose }) => {
  const getToastConfig = (type) => {
    const configs = {
      success: {
        icon: '✅',
        bgColor: 'var(--success-color)',
        textColor: 'white'
      },
      error: {
        icon: '❌',
        bgColor: 'var(--error-color)',
        textColor: 'white'
      },
      warning: {
        icon: '⚠️',
        bgColor: 'var(--warning-color)',
        textColor: 'white'
      },
      info: {
        icon: 'ℹ️',
        bgColor: 'var(--primary-color)',
        textColor: 'white'
      }
    };
    return configs[type] || configs.info;
  };

  const config = getToastConfig(type);

  return (
    <motion.div
      className="toast"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        backgroundColor: config.bgColor,
        color: config.textColor
      }}
    >
      <div className="toast-content">
        <span className="toast-icon">{config.icon}</span>
        <span className="toast-message">{message}</span>
      </div>
      <button 
        onClick={onClose}
        className="toast-close"
        style={{ color: config.textColor }}
      >
        ×
      </button>
    </motion.div>
  );
};