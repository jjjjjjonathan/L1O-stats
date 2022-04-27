const RosterList = ({ roster }) => {
  const mappedRoster = roster.map((player) => {
    return (
      <tr>
        <td>
          <input type="checkbox" />
        </td>
        <td>{player}</td>
      </tr>
    );
  });
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
