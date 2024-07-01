import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../utilites/authentication/AuthProvider';

const Header = () => {
  const { user } = useAuth();
  return (
    <header className="p-4 border-b-2 ">
      <div className="max-w-screen-xl mx-auto flex justify-between">
        <Link to={'/'}>
          <div className="text-xl font-bold tracking-wide">Mediatum</div>
        </Link>

        {user ? (
          <div className="text-lg font-semibold">{user.username}</div>
        ) : (
          <div className="flex gap-2">
            <Link to={'/login'}>
              <button className="bg-blue-300 px-2 rounded-md">Login</button>
            </Link>
            <Link to="/signup">
              <button className="bg-gray-300  px-2 rounded-md">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
