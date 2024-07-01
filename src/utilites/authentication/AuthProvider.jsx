import { useContext, createContext, useState } from 'react';
import config from '../../config';
import { Outlet, useNavigate } from 'react-router-dom';
const AuthContext = createContext();

const initialUser = {
  username: 'jondoe',
  first_name: 'Jojon',
  last_name: 'Doedoeng',
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(
    localStorage.getItem('access_token') || ''
  );
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      console.log('try to login...');
      const response = await fetch(`${config.server.url}/auth/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log('response no ok');
        const resultError = await response.json();
        console.log({ resultError });
        throw new Error(`Response Status: ${response.status}`);
      }

      console.log('success to login');
      const result = await response.json();

      // set the access token
      localStorage.setItem('access_token', result.access_token);
      setToken(result.access_token);
      navigate('/articles');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAction }}>
      {children}
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
