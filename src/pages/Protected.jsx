import React from 'react';
import { useAuth } from '../utilites/authentication/AuthProvider';

function Protected() {
  const { user } = useAuth();
  return (
    <div>
      {user ? 'you are user' : 'you are not user'}
      This page is protected. If you can access this page, it is mean you are
      authenticated
    </div>
  );
}

export default Protected;
