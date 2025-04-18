import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { JSX } from 'react';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
