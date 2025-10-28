// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TicketsProvider } from './context/TicketsContext';
import { ToastProvider } from './context/ToastContext'; // Add this
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Tickets from './pages/Tickets';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/global.css';

function App() {
  return (
    <ToastProvider> {/* Wrap with ToastProvider */}
      <AuthProvider>
        <TicketsProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/tickets" 
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Tickets />
                      </Layout>
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </Router>
        </TicketsProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;