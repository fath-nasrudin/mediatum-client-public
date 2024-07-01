import React, { useState } from 'react';

function InputGroup({ name, value, onChange }) {
  return (
    <div className="flex gap-2 align-middle">
      <label className="basis-20" htmlFor="username">
        {name}
      </label>
      <input
        className="px-2 ring-1 flex-1"
        type="text"
        name="username"
        id="username"
        placeholder={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onLoginClick = (e) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <div className="max-w-sm mx-auto mt-8 p-4 ring-1 flex flex-col gap-4">
      <h1 className="text-center text-xl font-semibold">Login</h1>
      <form method="post" className="flex flex-col gap-4">
        <InputGroup
          name="username"
          onChange={onUsernameChange}
          value={username}
        />
        <InputGroup
          name="password"
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
