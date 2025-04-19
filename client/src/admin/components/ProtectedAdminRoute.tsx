import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

const ALLOWED_EMAILS = [
  'mum@queenztreats.com',
  'admin@queenztreats.com',
  'socialmedia@queenztreats.com'
];

export function ProtectedAdminRoute() {
  const { user, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Check if user is authenticated and has admin access
  const isAuthorized = user && ALLOWED_EMAILS.includes(user.email || '');

  if (!isAuthorized) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render child routes if authorized
  return <Outlet />;
}