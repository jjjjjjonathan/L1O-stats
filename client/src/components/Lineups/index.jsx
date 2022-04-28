import { useState } from 'react';
import TeamSelect from './TeamSelect';

const Lineups = ({ divisions, teams }) => {
  const [selectedDivision, setSelectedDivision] = useState(null);
  const mensTeams = teams.filter((team) => team.mens);
  const womensTeams = teams.filter((team) => team.womens);

  return (
    <>
      <button
        value={divisions[0].id}
        onClick={() => setSelectedDivision(divisions[0].id)}
      >
        {divisions[0].name}
      </button>
      <button
        value={divisions[1].id}
        onClick={() => setSelectedDivision(divisions[1].id)}
      >
        {divisions[1].name}
      </button>
      {selectedDivision === 1 && (
        <TeamSelect teams={mensTeams} selectedDivision={selectedDivision} />
      )}
      {selectedDivision === 2 && (
        <TeamSelect teams={womensTeams} selectedDivision={selectedDivision} />
      )}
    </>
  );
};

export default Lineups;
