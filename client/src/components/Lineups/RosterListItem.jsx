const RosterListItem = ({ name, value }) => {
  return (
    <tr>
      <td>
        <input type="checkbox" value={value} onClick={(e) => console.log(e.target.checked, e.target.value)} />
      </td>
      <td>{name}</td>
    </tr>
  );
};

export default RosterListItem;
