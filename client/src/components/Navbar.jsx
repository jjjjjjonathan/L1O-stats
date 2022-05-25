import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {

  const [navExpanded, setNavExpanded] = useState(false);

  return (
    // <nav className="bg-gray-900 text-gray-100 py-3.5 px-6 shadow md:flex justify-between items-center">
    <>
      <nav className="flex flex-wrap items-center justify-between w-full py-2 md:py-2 px-4 pr-16 text-lg text-gray-100 bg-gray-900">
        <Link to="/">
          <img src="/logos/L1C_ON_Alt_Badge_Vertical.png" alt="" className='w-24' />
        </Link>

        <svg
          xmlns="<http://www.w3.org/2000/svg>"
          id="menu-button"
          className="h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => {
            setNavExpanded(!navExpanded);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
          <ul className="text-base text-gray-100 pt-4 md:flex md:justify-between md:pt-0">
            <li className="hover:text-gray-400">
              <Link to="/create" className='md:p-4 py-2 block'>Create a fixture</Link>
            </li>
            <li className=" hover:text-gray-400">
              <Link to="/" className="md:p-4 py-2 block">
                See list of fixtures
              </Link>
            </li>
            <li className="hover:text-gray-400">
              <Link to="/lineups" className="md:p-4 py-2 block">
                Create lineup graphics
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {navExpanded && (
        <ul className="text-base text-gray-100 px-7 pb-5 md:flex md:justify-between md:pt-0 bg-gray-900 z-50">
          <li className="hover:text-gray-400">
            <Link to="/create" className='md:p-4 py-2 block'>Create a fixture</Link>
          </li>
          <li className=" hover:text-gray-400">
            <Link to="/" className="md:p-4 py-2 block">
              See list of fixtures
            </Link>
          </li>
          <li className="hover:text-gray-400">
            <Link to="/lineups" className="md:p-4 py-2 block">
              Create lineup graphics
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default Navbar;
