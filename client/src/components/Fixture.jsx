import { useParams } from 'react-router-dom';

const Fixture = ({ divisions, teams, fixtures }) => {
  const id = useParams().id;
  console.log(typeof id);
  return <h1>Hello {id}</h1>;
};

export default Fixture;
