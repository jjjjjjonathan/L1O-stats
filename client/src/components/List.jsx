import ListItem from './ListItem';

const List = ({ divisions, teams, fixtures }) => {
  const findDivisionName = (divisions, divisionId) => {
    return divisions.find((division) => division.id === divisionId).name;
  };

  const findTeamName = (teams, teamId) => {
    return teams.find((team) => team.id === teamId).name;
  };

  const mappedFixtures = fixtures.map((fixture) => (
    <ListItem
      key={fixture.id}
      value={fixture.id}
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
