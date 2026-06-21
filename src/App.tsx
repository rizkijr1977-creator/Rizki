import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';

export default function App() {
  // Authentication State synchronized on load
  const [activeUser, setActiveUser] = useState<string | null>(() => {
    return localStorage.getItem('health_tracker_active_user') || null;
  });

  const handleLogin = (username: string) => {
    localStorage.setItem('health_tracker_active_user', username);
    setActiveUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('health_tracker_active_user');
    setActiveUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <AnimatePresence mode="wait">
        {activeUser ? (
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Dashboard username={activeUser} onLogout={handleLogout} />
          </motion.div>
        ) : (
          <motion.div
            key="login-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <LoginScreen onLoginSuccess={handleLogin} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
