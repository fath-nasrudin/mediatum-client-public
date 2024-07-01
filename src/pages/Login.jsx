import React, { useState } from 'react';

function InputGroup({ name, value, onChange }) {
  return (
    <div className="flex gap-2 align-middle">
      <label className="basis-20" htmlFor={name}>
        {name}
      </label>
      <input
        className="px-2 ring-1 flex-1"
        type="text"
        name={name}
        id={name}
        placeholder={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

const loginAction = async (url, data) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const resultError = await response.json();
      console.log({ resultError });
      throw new Error(`Response Status: ${response.status}`);
    }

    const result = await response.json();

    // set the access token
    localStorage.setItem('access_token', result.access_token);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onLoginClick = (e) => {
    e.preventDefault();
    loginAction('http://localhost:3000/auth/login', { username, password });
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
