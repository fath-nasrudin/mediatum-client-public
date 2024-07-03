import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utilites/authentication/AuthProvider';
import { useNavigate } from 'react-router-dom';

function InputGroup({
  name,
  value,
  onChange,
  type = 'text',
  required,
  errorMessages = [],
}) {
  let listMessages;
  if (errorMessages.length) {
    listMessages = (
      <ul className="flex flex-col gap-1 mt-1">
        {errorMessages.map((msg) => (
          <li className="text-xs text-slate-600 leading-none" key={msg}>
            {msg}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <div className="flex gap-2 align-middle">
        <label className="basis-20" htmlFor={name}>
          {name.split('_').join(' ')}
        </label>
        <div className=" flex-1">
          <input
            className="px-2 ring-1 w-full"
            type={type}
            name={name}
            id={name}
            placeholder={name.split('_').join(' ')}
            value={value}
            onChange={onChange}
            required={required}
          />
          {listMessages}
        </div>
      </div>
    </div>
  );
}

const validationErrorExtractor = (errors, path) => {
  const errorMessages = [];
  errors?.forEach((errorItem) => {
    if (errorItem.path === path) errorMessages.push(errorItem.msg);
  });
  return errorMessages;
};

function SignupPage() {
  const navigate = useNavigate();
  const { user, signupAction } = useAuth();
  const [inputs, setInputs] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(null);
  const { username, password, first_name, last_name, password_repeat } = inputs;

  // navigate user to homepage if user already signup
  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const onInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSignupClick = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    console.log(inputs);

    // validation

    // signup action
    const { error } = await signupAction(inputs);
    if (error) {
      setError(error);
      setErrorMessage(error.message);
    }

    return;
  };

  return (
    <div className="max-w-sm mx-auto mt-8 p-4 ring-1 flex flex-col gap-4">
      <h1 className="text-center text-xl font-semibold">Signup</h1>
      <form method="post" className="flex flex-col gap-4">
        {error ? (
          <p className="text-red-600 text-sm text-center mb-[-8px]">
            {error.message}
          </p>
        ) : (
          ''
        )}
        <InputGroup
          name="first_name"
          value={first_name || ''}
          onChange={onInputChange}
          required={true}
          errorMessages={validationErrorExtractor(error?.errors, 'first_name')}
        />
        <InputGroup
          name="last_name"
          value={last_name || ''}
          onChange={onInputChange}
          required={true}
          errorMessages={validationErrorExtractor(error?.errors, 'last_name')}
        />
        <InputGroup
          name="username"
          value={username || ''}
          onChange={onInputChange}
          required={true}
          errorMessages={validationErrorExtractor(error?.errors, 'username')}
        />
        <InputGroup
          name="password"
          type="password"
          value={password || ''}
          onChange={onInputChange}
          required={true}
          errorMessages={validationErrorExtractor(error?.errors, 'password')}
        />
        <InputGroup
          name="password_repeat"
          type="password"
          value={password_repeat || ''}
          onChange={onInputChange}
          required={true}
          errorMessages={validationErrorExtractor(
            error?.errors,
            'password_repeat'
          )}
        />
        <button className="bg-blue-500 py-1" onClick={onSignupClick}>
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
