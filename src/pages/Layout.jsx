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
        <div className="text-lg font-semibold">
          {user ? user.username : 'Guest'}
        </div>
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
