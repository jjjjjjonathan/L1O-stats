import StartItem from './StartItem';

const Start = ({ divisions, setSelectedDivision }) => {
  const mappedDivisions = divisions.map((division) => (
    <StartItem
      key={division.id}
      value={division.id}
      name={division.name}
      setSelectedDivision={setSelectedDivision}
    />
  ));
  return <>{mappedDivisions}</>;
};

export default Start;
