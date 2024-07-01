import { Outlet, Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="p-4 border-b-2">
      <div className="max-w-screen-xl mx-auto">
        <Link to={'/'}>
          <div className="text-xl font-bold tracking-wide">Mediatum</div>
        </Link>
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
