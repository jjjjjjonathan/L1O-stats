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

  return fixtures.length > 0 ? (
    <div className='grid grid-cols-2 gap-4 p-4'>
      {mappedFixtures}
    </div>
  ) :
    <p>No fixtures, click on "Create a fixture" in the navigation bar to add some</p>;
};

export default List;
