import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className="navbar bg-base-100 top-0 sticky">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/create">Create a fixture</Link></li>
            <li tabIndex="0">
              <Link to="/">See list of fixtures</Link>
            </li>
            <li><Link to="/lineups">Create lineup graphics</Link></li>
          </ul>
        </div>
        <Link to="/">
          <img src="/logos/L1C_ON_Alt_Badge_Vertical.png" alt="" className='h-24' />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li><Link to="/create">Create a fixture</Link></li>
          <li tabIndex="0">
            <Link to="/">See list of fixtures</Link>
          </li>
          <li><Link to="/lineups">Create lineup graphics</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* <a className="btn">Login</a> */}
      </div>
    </div>
  );
};

export default Navbar;
