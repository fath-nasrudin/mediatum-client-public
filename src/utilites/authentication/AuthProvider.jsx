import { useContext, createContext } from 'react';
import { Outlet } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user: 'true' }}>
      {children}
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
