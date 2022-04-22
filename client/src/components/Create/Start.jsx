import StartItem from './StartItem';

const Start = ({ divisions, pickDivision }) => {
  const mappedDivisions = divisions.map((division) => (
    <StartItem
      key={division.id}
      value={division.id}
      name={division.name}
      pickDivision={pickDivision}
    />
  ));
  return <>{mappedDivisions}</>;
};

export default Start;
