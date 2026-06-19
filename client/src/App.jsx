import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Catch all / fallback redirection */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Toaster 
            position="top-right" 
            toastOptions={{
              style: {
                background: '#FFFAF2',
                color: '#1C1917',
                border: '1px solid #DED4C5',
                borderRadius: '12px',
                boxShadow: '0 18px 45px rgba(28, 25, 23, 0.16)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
              },
            }} 
          />
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
