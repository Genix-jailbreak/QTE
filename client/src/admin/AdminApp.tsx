import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './context/AdminAuthContext';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';
import AdminLogin from './pages/AdminLogin';
import ForgotPasswordPage from '../pages/auth/forgot-password/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/reset-password/ResetPasswordPage';
import AdminDashboard from './components/Dashboard/Dashboard';
import ProductManagement from './pages/ProductManagement';
import BookingManagement from './pages/BookingManagement';
import AdminSettings from './pages/AdminSettings';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export default function AdminApp() {
  const { user, loading } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/admin-sw.js')
          .then(registration => {
            console.log('SW registered:', registration);
          })
          .catch(error => {
            console.log('SW registration failed:', error);
          });
      });
    }

    // Redirect logged-in users to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/products" element={<ProductManagement />} />
        <Route path="/bookings" element={<BookingManagement />} />
        <Route path="/settings" element={<AdminSettings />} />
      </Route>

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}