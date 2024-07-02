import React, { useEffect, useState } from 'react';
import { useAuth } from '../utilites/authentication/AuthProvider';
import { useNavigate } from 'react-router-dom';

function InputGroup({ name, value, onChange, type = 'text' }) {
  return (
    <div className="flex gap-2 align-middle">
      <label className="basis-20" htmlFor={name}>
        {name}
      </label>
      <input
        className="px-2 ring-1 flex-1"
        type={type}
        name={name}
        id={name}
        placeholder={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/');
  }, [user]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { loginAction } = useAuth();

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onLoginClick = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username) {
      setErrorMessage('username cannot be empty');
      return;
    }
    if (!password) {
      setErrorMessage('Password cannot be empty');
      return;
    }

    const { error } = await loginAction({
      username,
      password,
    });
    if (error) setErrorMessage(error.message);
  };

  return (
    <div className="max-w-sm mx-auto mt-8 p-4 ring-1 flex flex-col gap-4">
      <h1 className="text-center text-xl font-semibold">Login</h1>
      <form method="post" className="flex flex-col gap-4">
        {errorMessage ? (
          <p className="text-red-600 text-sm text-center mb-[-8px]">
            {errorMessage}
          </p>
        ) : (
          ''
        )}
        <InputGroup
          name="username"
          onChange={onUsernameChange}
          value={username}
        />
        <InputGroup
          name="password"
          type="password"
          onChange={onPasswordChange}
          value={password}
        />
        <button className="bg-blue-500 py-1" onClick={onLoginClick}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
