import RosterListItem from './RosterListItem';

const RosterList = ({ roster }) => {
  const mappedRoster = roster.map((player) => (
    <RosterListItem name={player.name} key={player.tempId} />
  ));
  return (
    <table>
      <thead>
        <tr>
          <th>Starter?</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>{mappedRoster}</tbody>
    </table>
  );
};

export default RosterList;
