import React from 'react';
import { Link } from 'react-router-dom';

function SignupSuccessPage() {
  return (
    <div className="mx-auto mt-8 text-center">
      <h1 className="text-2xl font-bold text-green-600">Success Signup</h1>
      <div className="mt-4">
        Please login
        <Link to={'/login'}>
          <p className="text-blue-700 text-xl font-semibold">Login</p>
        </Link>
      </div>
    </div>
  );
}

export default SignupSuccessPage;
