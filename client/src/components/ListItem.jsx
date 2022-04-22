const ListItem = ({
  value,
  findDivisionName,
  findTeamName,
  divisions,
  teams,
  e2e_id,
  division,
  home_team_id,
  away_team_id,
  date,
}) => {
  return (
    <tr>
      <td>{e2e_id}</td>
      <td>{findDivisionName(divisions, division)}</td>
      <td>{findTeamName(teams, home_team_id)}</td>
      <td>{findTeamName(teams, away_team_id)}</td>
      <td>{date}</td>
    </tr>
  );
};

export default ListItem;
