import { useHistory } from 'react-router-dom';
import { findDivisionName, findDivisionAbbreviation } from '../helpers/helpers';
import classNames from 'classnames';
import { formatISO9075 } from 'date-fns';
import EditListItem from './EditListItem';
import axios from 'axios';
import { DispatchContext, AlertContext } from '../App';
import { useContext } from 'react';

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
  const dispatch = useContext(DispatchContext);
  const setAlert = useContext(AlertContext);

  const homeTeam = teams.find((team) => team.id === home_team_id);

  const awayTeam = teams.find((team) => team.id === away_team_id);

  const history = useHistory();

  const cardClasses = classNames(
    'card',
    'bg-base-100',
    'hover:bg-base-200',
    'text-base-content',
    'w-full',
    'mx-auto',
    'shadow-lg',
    'hover:shadow-xl',
    { 'col-span-2 md:px-6': Date.parse(date) + 7200000 - Date.now() >= 0 },
    { 'col-span-1': Date.parse(date) + 7200000 - Date.now() < 0 },
    'py-2 px-1'
  );

  const cardHeroClasses = classNames(
    'flex',
    'flex-row',
    'justify-around',
    'w-full',
    'items-center',
    'pb-8',
    { hidden: Date.parse(date) + 7200000 - Date.now() < 0 }
  );

  const titleClasses = classNames('card-title text-base-content text-3xl', {
    hidden: Date.parse(date) + 7200000 - Date.now() >= 0
  });

  const abbreviationClasses = classNames(
    'card-title text-base-content text-2xl hidden px-3',
    { 'lg:block': Date.parse(date) + 7200000 - Date.now() < 0 }
  );

  const badgeClassesAbbrev = classNames('badge font-bold shadow-md lg:hidden', {
    'badge-accent text-accent-content': division === 2,
    'badge-secondary text-secondary-content': division === 1
  });

  const badgeClassesFull = classNames(
    'badge font-bold shadow-md hidden lg:flex',
    {
      'badge-accent text-accent-content': division === 2,
      'badge-secondary text-secondary-content': division === 1
    }
  );

  const badgeGroupClasses = classNames(
    'flex flex-row justify-end gap-x-2 items-center h-full',
    { hidden: Date.parse(date) + 7200000 - Date.now() < 0 }
  );

  const deleteFixture = async (id) => {
    const { data } = await axios.delete(`/api/fixtures/delete/${id}`);
    dispatch({ type: 'DELETE_FIXTURE', content: data });
    setAlert({ type: 'success', msg: `Match ${data.e2e_id} is now deleted.` });
  };

  return (
    <div className={cardClasses}>
      <figure>
        <div className={cardHeroClasses} onClick={() => history.push(`/${id}`)}>
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
      <div className='card-body flex flex-col justify-between py-0'>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row items-center'>
              <div className='flex flex-row'>
                <img
                  src={`/logos/${homeTeam.img}.png`}
                  alt={homeTeam.name}
                  className={classNames(
                    'max-h-[28px] max-w-[28px] object-contain overflow-y-clip',
                    { hidden: Date.parse(date) + 7200000 - Date.now() >= 0 }
                  )}
                />
                <h2 className={abbreviationClasses}>{homeTeam.abbreviation}</h2>
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
                    { hidden: Date.parse(date) + 7200000 - Date.now() >= 0 }
                  )}
                />
                <h2 className={abbreviationClasses}>{awayTeam.abbreviation}</h2>
              </div>
            </div>
            <h2 className={titleClasses}>{away_goals.toString(10)}</h2>
          </div>
        </div>

        <div className='card-actions justify-between py-4'>
          <div className='flex flex-row justify-start gap-x-2 items-center'>
            <label
              htmlFor={`edit-modal${id}`}
              className='btn modal-button btn-success btn-xs lg:btn-sm hover:scale-110'
            >
              Edit
            </label>
            <input
              type='checkbox'
              id={`edit-modal${id}`}
              className='modal-toggle'
            />
            <div className='modal'>
              <div className='modal-box'>
                <h3 className='font-bold text-lg'>Edit Match Details</h3>
                <EditListItem
                  teams={teams}
                  division={division}
                  home_team_id={home_team_id}
                  away_team_id={away_team_id}
                  e2e_id={e2e_id}
                  date={date}
                  id={id}
                />
              </div>
            </div>
            <label
              htmlFor={`delete-modal${id}`}
              className='btn modal-button btn-error btn-xs lg:btn-sm hover:scale-110'
            >
              Delete
            </label>
            <input
              type='checkbox'
              id={`delete-modal${id}`}
              className='modal-toggle'
            />
            <div className='modal'>
              <div className='modal-box'>
                <h3 className='font-bold text-lg'>
                  Are you sure you want to delete?
                </h3>
                <p className='py-4'>
                  You will have to re-create the fixture if you need it later.
                </p>
                <div className='modal-action'>
                  <label
                    htmlFor={`delete-modal${id}`}
                    className='btn btn-error'
                    onClick={() => deleteFixture(id)}
                  >
                    Yes I'm sure
                  </label>
                  <label
                    htmlFor={`delete-modal${id}`}
                    className='btn btn-warning'
                  >
                    Cancel
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div
            className={badgeGroupClasses}
            onClick={() => history.push(`/${id}`)}
          >
            <div className='badge badge-info font-bold text-info-content'>
              {formatISO9075(new Date(date), { representation: 'date' })}
            </div>
            <div className={badgeClassesFull}>
              {findDivisionName(divisions, division)}
            </div>
            <div className={badgeClassesAbbrev}>
              {findDivisionAbbreviation(divisions, division)}
            </div>
            <div className='badge badge-primary font-bold text-primary-content'>
              #{e2e_id.toString(10)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
