import React, { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user]);

  return <Outlet />;
}

export default PrivateRoute;
