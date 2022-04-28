import { useState } from 'react';
import TeamSelectOption from './TeamSelectOption';
import scrapeRosters from '../../helpers/rosters';
import RosterList from '../Fixture/RosterList';

const TeamSelect = ({ teams, selectedDivision }) => {
  const [roster, setRoster] = useState([]);

  const mappedTeams = teams.map((team) => (
    <TeamSelectOption key={team.id} value={team.id} name={team.name} />
  ));

  return (
    <>
      <section>
        <label htmlFor="">Select team</label>
        <select
          name="teamSelect"
          id="teamSelect"
          onChange={async (e) => {
            const teamId = parseInt(e.target.value, 10);
            if (teamId) {
              const selectedTeam = teams.find((team) => team.id === teamId);
              const roster = await scrapeRosters(
                selectedDivision,
                selectedTeam
              );
              setRoster(roster);
            }
          }}
        >
          <option value="{'label'}" key={'label'}>
            Select team
          </option>
          {mappedTeams}
        </select>
      </section>
      <section>{roster.length > 0 && <RosterList roster={roster} />}</section>
    </>
  );
};

export default TeamSelect;
