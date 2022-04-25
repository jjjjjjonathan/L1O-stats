import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-gray-100 py-3.5 px-6 shadow md:flex justify-between items-center">
      <ul className="flex flex-col cursor-pointer  md:flex-row md:items-center">
        <li className="md:mx-4 hover:text-gray-400">
          <Link to="/create">Create a fixture</Link>
        </li>
        <li className="md:mx-4 hover:text-gray-400">
          <Link to="/" className="md:mx-4 hover:text-gray-400">
            See list of fixtures
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
