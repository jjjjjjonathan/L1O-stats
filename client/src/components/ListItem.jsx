import { useHistory } from 'react-router-dom';
import { findDivisionName, findTeamName } from '../helpers/helpers';
import classNames from 'classnames';

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

  const cardClasses = classNames('card', 'bg-primary', 'text-primary-content', 'w-full', 'mx-auto', { 'col-span-2': Date.now() + 7200000 - Date.parse(date) < 0 }, { 'col-span-1': Date.now() + 7200000 - Date.parse(date) >= 0 });

  return (
    <div className={cardClasses} onClick={() => history.push(`/${id}`)}>
      <div className="card-body">
        <h2 className="card-title">{findTeamName(teams, home_team_id)} v. {findTeamName(teams, away_team_id)}</h2>
        <p>{parsedDate(date)}</p>
      </div>
    </div>
  );
};

export default ListItem;
