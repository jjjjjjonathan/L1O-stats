const RosterListItem = ({ name }) => {
  return (
    <tr>
      <td>
        <input type="checkbox" onClick={(e) => console.log(e.target.checked)} />
      </td>
      <td>{name}</td>
    </tr>
  );
};

export default RosterListItem;
