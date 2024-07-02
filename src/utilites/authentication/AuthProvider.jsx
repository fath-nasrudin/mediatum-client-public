import { useContext, createContext, useState } from 'react';
import config from '../../config';
import { Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const AuthContext = createContext();

const initialUser = () => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    return jwtDecode(accessToken);
  }
  return null;
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
        credentials: 'include',
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

      console.log({ decoded: jwtDecode(result.access_token) });
      setUser(jwtDecode(result.access_token));
      // set the access token
      localStorage.setItem('access_token', result.access_token);
      setToken(result.access_token);
      navigate('/articles');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const logoutAction = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('access_token');
  };

  const refreshToken = async () => {
    try {
      console.log('try to refresh token...');
      const response = await fetch(`${config.server.url}/auth/refresh-token`, {
        credentials: 'include',
      });

      if (!response.ok) {
        console.log('refresh token response not ok');
        // notify user that the session has end

        console.log('try to logout');
        const errorResult = await response.json();
        throw new Error(errorResult.message);
      }

      console.log('success to get a new access token');
      const result = await response.json();

      console.log({ token, decoded: jwtDecode(result.access_token) });

      // update token and user
      console.log('updating user and token state...');
      setUser(jwtDecode(result.access_token));
      localStorage.setItem('access_token', result.access_token);
      setToken(result.access_token);
      console.log('success update user and token state');
      return { error: null };
    } catch (error) {
      logoutAction();
      console.error('Error fetching data:', error);
      return { error };
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, token, loginAction, logoutAction, refreshToken }}
    >
      {children}
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
