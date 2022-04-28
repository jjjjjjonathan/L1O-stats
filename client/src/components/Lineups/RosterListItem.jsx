const RosterListItem = ({ name }) => {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{name}</td>
    </tr>
  );
};

export default RosterListItem;
