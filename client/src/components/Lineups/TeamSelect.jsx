import { useState } from 'react';
import TeamSelectOption from './TeamSelectOption';
import scrapeRosters from '../../helpers/rosters';
import RosterList from './RosterList';

const TeamSelect = ({ teams, selectedDivision }) => {
  const [roster, setRoster] = useState([]);
  const [selectedTeamName, setSelectedTeamName] = useState({});
  const [graphicColour, setGraphicColour] = useState('');

  const mappedTeams = teams.map((team) => (
    <TeamSelectOption key={team.id} value={team.id} name={team.name} />
  ));

  return (
    <>
      <section>
        <select
          className='select select-bordered w-full max-w-xs'
          name='teamSelect'
          id='teamSelect'
          onChange={async (e) => {
            try {
              const teamId = parseInt(e.target.value, 10);
              if (teamId) {
                const selectedTeam = teams.find((team) => team.id === teamId);
                const roster = await scrapeRosters(
                  selectedDivision,
                  selectedTeam
                );
                setRoster(roster);
                setSelectedTeamName(selectedTeam.name);
                setGraphicColour(selectedTeam.graphic_colour);
              }
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <option value="{'label'}" key={'label'}>
            Select team
          </option>
          {mappedTeams}
        </select>
      </section>
      <div>
        {roster.length > 0 && (
          <RosterList roster={roster} teamName={selectedTeamName} graphicColour={graphicColour} />
        )}
      </div>
    </>
  );
};

export default TeamSelect;
