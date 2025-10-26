// src/components/UI/ConfirmDialog.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ConfirmDialog.css';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  type = "default"
}) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: -20 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="confirm-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <div className="confirm-container">
            <motion.div
              className={`confirm-dialog ${type}`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="confirm-header">
                <h3 className="confirm-title">{title}</h3>
              </div>
              <div className="confirm-body">
                <p className="confirm-message">{message}</p>
              </div>
              <div className="confirm-actions">
                <button
                  onClick={onClose}
                  className="confirm-btn cancel-btn"
                >
                  {cancelText}
                </button>
                <motion.button
                  onClick={onConfirm}
                  className={`confirm-btn ${type}-btn`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {confirmText}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;