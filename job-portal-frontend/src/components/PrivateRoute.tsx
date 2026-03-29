import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

interface PrivateRouteProps {
  requiredRole?: 'candidate' | 'employer';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requiredRole }) => {
  const { token, user } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

 

  return <Outlet />;
};

export default PrivateRoute;