import ListItem from './ListItem';

const List = ({ divisions, teams, fixtures }) => {
  const sortedFixtures = [...fixtures].sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date)
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
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-8 max-w-screen-2xl mx-auto'>
      {mappedFixtures}
    </div>
  ) :
    <p>No fixtures, click on "Create a fixture" in the navigation bar to add some</p>;
};

export default List;
