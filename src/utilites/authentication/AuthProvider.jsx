import { useContext, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user: 'true' }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
