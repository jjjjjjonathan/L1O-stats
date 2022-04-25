import { useHistory } from 'react-router-dom';
import { findDivisionName, findTeamName } from '../helpers/helpers';

const ListItem = ({
  id,
  divisions,
  teams,
  e2e_id,
  division,
  home_team_id,
  away_team_id,
  date,
}) => {
  // Function to parse date into something readable to people
  const parsedDate = (newDate) => {
    const date = new Date(newDate);
    return date.toLocaleString('en-US');
  };
  const history = useHistory();
  return (
    <tr onClick={() => history.push(`/${id}`)} className="whitespace-nowrap">
      <td className="px-6 py-4">{e2e_id}</td>
      <td className="px-6 py-4">{findDivisionName(divisions, division)}</td>
      <td className="px-6 py-4 text-center">
        {findTeamName(teams, home_team_id)}
      </td>
      <td className="px-6 py-4 text-center">
        {findTeamName(teams, away_team_id)}
      </td>
      <td className="px-6 py-4">{parsedDate(date)}</td>
    </tr>
  );
};

export default ListItem;
