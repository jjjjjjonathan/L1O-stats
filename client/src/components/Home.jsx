import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Link to="/create">Create new fixture</Link>
      <Link to="/fixtures">See list of fixtures</Link>
    </>
  );
};

export default Home;
