import { useHistory } from 'react-router-dom';
import { findDivisionName, findTeamName } from '../helpers/helpers';
import classNames from 'classnames';
import { formatISO9075 } from 'date-fns';

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

  const cardClasses = classNames(
    'card',
    'bg-primary',
    'hover:bg-primary-focus',
    'text-primary-content',
    'w-full',
    'mx-auto',
    { 'col-span-2 md:px-6': Date.now() + 7200000 - Date.parse(date) < 0 },
    { 'col-span-1': Date.now() + 7200000 - Date.parse(date) >= 0 },
    'py-2 px-1'
  );

  const cardHeroClasses = classNames(
    'flex',
    'flex-row',
    'justify-around',
    'w-full',
    'items-center',
    { hidden: Date.now() + 7200000 - Date.parse(date) >= 0 }
  );

  const titleClasses = classNames('card-title text-primary-content text-3xl', {
    hidden: Date.now() + 7200000 - Date.parse(date) < 0
  });

  const abbreviationClasses = classNames(
    'card-title text-primary-content text-2xl hidden px-3',
    { 'lg:block': Date.now() + 7200000 - Date.parse(date) >= 0 }
  );

  const badgeClasses = classNames('badge font-bold', {
    hidden: Date.now() + 7200000 - Date.parse(date) >= 0,
    'badge-accent': division === 2,
    'badge-secondary': division === 1
  });

  return (
    <div className={cardClasses} onClick={() => history.push(`/${id}`)}>
      <figure>
        <div className={cardHeroClasses}>
          <div className='h-[100px] w-[100px] flex justify-center'>
            <img
              src={`/logos/${homeTeam.img}.png`}
              alt={homeTeam.name}
              className='object-contain max-h-[100px] max-w[100px] px-2 pt-2'
            />
          </div>

          <p className='text-4xl font-bold'>
            {home_goals.toString(10)} - {away_goals.toString(10)}
          </p>
          <div className='h-[100px] w-[100px] flex justify-center'>
            <img
              src={`/logos/${awayTeam.img}.png`}
              alt={awayTeam.name}
              className='object-contain max-h-[100px] max-w-[100px] px-2 pt-2'
            />
          </div>
        </div>
      </figure>
      <div className='card-body flex flex-col justify-between'>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row items-center'>
              <div className='flex flex-row'>
                <img
                  src={`/logos/${homeTeam.img}.png`}
                  alt={homeTeam.name}
                  className={classNames(
                    'max-h-[28px] max-w-[28px] object-contain overflow-y-clip',
                    { hidden: Date.now() + 7200000 - Date.parse(date) < 0 }
                  )}
                />
                <h2 className={abbreviationClasses}>{homeTeam.abbreviation}</h2>
                {/* <h2 className={titleClasses}>{homeTeam.abbreviation}</h2> */}
              </div>
            </div>
            <h2 className={titleClasses}>{home_goals.toString(10)}</h2>
          </div>

          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row items-center'>
              <div className='flex flex-row items-center'>
                <img
                  src={`/logos/${awayTeam.img}.png`}
                  alt={awayTeam.name}
                  className={classNames(
                    'max-h-[28px] max-w-[28px] object-contain overflow-y-clip',
                    { hidden: Date.now() + 7200000 - Date.parse(date) < 0 }
                  )}
                />
                <h2 className={abbreviationClasses}>{awayTeam.abbreviation}</h2>
                {/* <h2 className={titleClasses}>{awayTeam.abbreviation}</h2> */}
              </div>
            </div>
            <h2 className={titleClasses}>{away_goals.toString(10)}</h2>
          </div>
        </div>

        <div className='card-actions justify-end pt-2'>
          <div className='badge badge-warning font-bold text-content'>
            {formatISO9075(new Date(date), { representation: 'date' })}
          </div>
          <div className={badgeClasses}>
            {findDivisionName(divisions, division)}
          </div>
          <div className='badge badge-success font-bold text-content'>
            #{e2e_id.toString(10)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
