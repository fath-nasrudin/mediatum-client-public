import { Outlet, Link } from "react-router-dom";
const Header = () => {
  return (
    <header
      className="p-4"
    >
      <Link to={'/'}>
        <div className="text-xl font-bold tracking-wide">
          Mediatum
        </div>
      </Link>
    </header>
  )
};

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
};

export default Layout;