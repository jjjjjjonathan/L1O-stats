import ListItem from './ListItem';

const List = ({ divisions, teams, fixtures }) => {
  const sortedFixtures = [...fixtures].sort(
    (a, b) => Date.parse(a.date) - Date.parse(b.date)
  );
  const mappedFixtures = sortedFixtures.map((fixture) => (
    <ListItem
      key={fixture.id}
      {...fixture}
      teams={teams}
      divisions={divisions}
    />
  ));

  return (
    <>
      <h1>Matches</h1>
      <table className='table-auto'>
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
