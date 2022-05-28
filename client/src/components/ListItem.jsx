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
  home_goals,
  away_goals
}) => {
  // Function to parse date into something readable to people
  const parsedDate = (newDate) => {
    const date = new Date(newDate);
    return date.toLocaleString('en-US');
  };

  const homeTeam = teams.find((team) => team.id === home_team_id);

  const awayTeam = teams.find((team) => team.id === away_team_id);

  const history = useHistory();

  const cardClasses = classNames('card', 'bg-primary', 'xl:bg-secondary', 'text-primary-content', 'w-full', 'mx-auto', { 'col-span-2': Date.now() + 7200000 - Date.parse(date) < 0 }, { 'col-span-1': Date.now() + 7200000 - Date.parse(date) >= 0 }, 'py-2 px-2 md:px-6');

  const cardHeroClasses = classNames('flex', 'flex-row', 'justify-around', 'w-full', 'items-center', { 'hidden': Date.now() + 7200000 - Date.parse(date) >= 0 });

  const titleClasses = classNames('card-title', { hidden: Date.now() + 7200000 - Date.parse(date) < 0 });

  const divisionClasses = classNames({ 'card-title': Date.now() + 7200000 - Date.parse(date) < 0 }, 'mx-auto');

  return (
    <div className={cardClasses} onClick={() => history.push(`/${id}`)}>
      <figure>
        <div className={cardHeroClasses}>
          <img src={`/logos/${homeTeam.img}.png`} alt={homeTeam.name} className='object-contain w-1/3 px-2 pt-2' />

          <p className='text-4xl'>{home_goals.toString(10)} - {away_goals.toString(10)}</p>

          <img src={`/logos/${awayTeam.img}.png`} alt={awayTeam.name} className='object-contain w-1/3 px-2 pt-2' />
        </div>
      </figure>
      <div className="card-body">
        <h2 className={titleClasses}>{findTeamName(teams, home_team_id)} v. {findTeamName(teams, away_team_id)}</h2>
        <h2 className={divisionClasses}>{findDivisionName(divisions, division)}</h2>
        <p>{parsedDate(date)}</p>
      </div>
    </div>
  );
};

export default ListItem;
