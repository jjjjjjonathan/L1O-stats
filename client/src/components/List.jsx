import ListItem from './ListItem';
import { findDivisionName, findTeamName } from '../helpers/helpers';

const List = ({ divisions, teams, fixtures }) => {
  const mappedFixtures = fixtures.map((fixture) => (
    <ListItem
      key={fixture.id}
      {...fixture}
      teams={teams}
      divisions={divisions}
      findDivisionName={findDivisionName}
      findTeamName={findTeamName}
    />
  ));

  return (
    <>
      <h1>Matches</h1>
      <table>
        <thead>
          <tr>
            <th>E2E ID</th>
            <th>Division</th>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>{mappedFixtures}</tbody>
      </table>
    </>
  );
};

export default List;
