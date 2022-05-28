import { useState } from 'react';
import TeamSelect from './TeamSelect';

const Lineups = ({ divisions, teams }) => {
  const [selectedDivision, setSelectedDivision] = useState(null);
  const mensTeams = teams.filter((team) => team.mens);
  const womensTeams = teams.filter((team) => team.womens);

  return (
    <div className='flex flex-col items-center'>
      <div>
        <button
          value={divisions[0].id}
          onClick={() => setSelectedDivision(divisions[0].id)}
          className='btn btn-primary ml-4 my-6 md:btn-secondary'
        >
          {divisions[0].name}
        </button>
        <button
          value={divisions[1].id}
          onClick={() => setSelectedDivision(divisions[1].id)}
          className='btn btn-primary ml-4 my-6'
        >
          {divisions[1].name}
        </button>

      </div>
      {selectedDivision === 1 && (
        <TeamSelect teams={mensTeams} selectedDivision={selectedDivision} />
      )}
      {selectedDivision === 2 && (
        <TeamSelect teams={womensTeams} selectedDivision={selectedDivision} />
      )}
    </div>
  );
};

export default Lineups;
