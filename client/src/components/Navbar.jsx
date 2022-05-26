import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {

  const [navExpanded, setNavExpanded] = useState(false);

  return (
    // <nav classNameName="bg-gray-900 text-gray-100 py-3.5 px-6 shadow md:flex justify-between items-center">
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
        <a className="btn">Login</a>
      </div>
    </div>
    // <>
    //   <nav classNameName="flex flex-wrap items-center justify-between w-full py-2 md:py-2 px-4 pr-16 text-lg text-gray-100 bg-gray-900">
    //     <Link to="/">
    //       <img src="/logos/L1C_ON_Alt_Badge_Vertical.png" alt="" classNameName='w-24' />
    //     </Link>

    //     <svg
    //       xmlns="<http://www.w3.org/2000/svg>"
    //       id="menu-button"
    //       classNameName="h-6 w-6 cursor-pointer md:hidden block"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //       onClick={() => {
    //         setNavExpanded(!navExpanded);
    //       }}
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M4 6h16M4 12h16M4 18h16"
    //       />
    //     </svg>
    //     <div classNameName="hidden w-full md:flex md:items-center md:w-auto" id="menu">
    //       <ul classNameName="text-base text-gray-100 pt-4 md:flex md:justify-between md:pt-0">
    //         <li classNameName="hover:text-gray-400">
    //           <Link to="/create" classNameName='md:p-4 py-2 block'>Create a fixture</Link>
    //         </li>
    //         <li classNameName=" hover:text-gray-400">
    //           <Link to="/" classNameName="md:p-4 py-2 block">
    //             See list of fixtures
    //           </Link>
    //         </li>
    //         <li classNameName="hover:text-gray-400">
    //           <Link to="/lineups" classNameName="md:p-4 py-2 block">
    //             Create lineup graphics
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </nav>
    //   {navExpanded && (
    //     <ul classNameName="text-base text-gray-100 px-7 pb-5 md:flex md:justify-between md:pt-0 bg-gray-900 z-50">
    //       <li classNameName="hover:text-gray-400">
    //         <Link to="/create" classNameName='md:p-4 py-2 block'>Create a fixture</Link>
    //       </li>
    //       <li classNameName=" hover:text-gray-400">
    //         <Link to="/" classNameName="md:p-4 py-2 block">
    //           See list of fixtures
    //         </Link>
    //       </li>
    //       <li classNameName="hover:text-gray-400">
    // <Link to="/lineups">
    //   Create lineup graphics
    // </Link>
    //       </li>
    //     </ul>
    //   )}
    // </>
  );
};

export default Navbar;
