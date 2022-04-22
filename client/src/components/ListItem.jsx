import { useHistory } from 'react-router-dom';

const ListItem = ({
  id,
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
  const history = useHistory();
  return (
    <tr onClick={() => history.push(`/fixtures/${id}`)}>
      <td>{e2e_id}</td>
      <td>{findDivisionName(divisions, division)}</td>
      <td>{findTeamName(teams, home_team_id)}</td>
      <td>{findTeamName(teams, away_team_id)}</td>
      <td>{date}</td>
    </tr>
  );
};

export default ListItem;
