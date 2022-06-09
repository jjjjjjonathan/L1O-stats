import { useState } from 'react';
import classNames from 'classnames';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi';

const ConsoleRow = ({ fixture, label, id, validate, teams }) => {
  const getStatName = (label) => {
    const statStrings = {
      Goals: { h: 'home_goals', a: 'away_goals' },
      'Total Shots': { h: 'home_total_shots', a: 'away_total_shots' },
      'On Target': { h: 'home_on_target', a: 'away_on_target' },
      Corners: { h: 'home_corners', a: 'away_corners' },
      Offsides: { h: 'home_offsides', a: 'away_offsides' },
      Fouls: { h: 'home_fouls', a: 'away_fouls' },
      'Yellow Cards': { h: 'home_yellows', a: 'away_yellows' },
      'Red Cards': { h: 'home_reds', a: 'away_reds' }
    };
    return statStrings[label];
  };

  const valueUp = {
    h: fixture[getStatName(label).h] + 1,
    a: fixture[getStatName(label).a] + 1
  };
  const valueDown = {
    h: fixture[getStatName(label).h] - 1,
    a: fixture[getStatName(label).a] - 1
  };

  const [team, setTeam] = useState('h');

  const homeTeam = teams.find((team) => team.id === fixture.home_team_id);

  const awayTeam = teams.find((team) => team.id === fixture.away_team_id);

  const statClasses = classNames(
    'stats md:hidden',
    { 'bg-secondary text-secondary-content': team === 'h' },
    { 'bg-accent text-accent-content': team === 'a' }
  );

  return (
    <>
      {/* small screens only */}
      <div className='mx-auto md:hidden'>
        <label className='swap swap-rotate text-9xl'>
          <input
            type='checkbox'
            onChange={(e) => (e.target.checked ? setTeam('a') : setTeam('h'))}
          />

          <div className='swap-on mx-auto'>
            <img src={`/logos/${awayTeam.img}.png`} alt={awayTeam.img} />
          </div>
          <div className='swap-off mx-auto'>
            <img src={`/logos/${homeTeam.img}.png`} alt={homeTeam.img} />
          </div>
        </label>
      </div>
      <div className={statClasses}>
        <div className='stat md:hidden'>
          <div className='stat-title mx-auto text-xl font-bold'>{label}</div>
          <div className='stat-value mx-auto'>
            {fixture[getStatName(label)[team]]}
          </div>
          <div className='stat-actions flex flex-row justify-around'>
            <button
              className='btn btn-sm btn-error'
              onClick={() =>
                validate(getStatName(label)[team], valueDown[team], id)
              }
            >
              <HiOutlineMinus />
            </button>
            <button
              className='btn btn-sm btn-success'
              onClick={() =>
                validate(getStatName(label)[team], valueUp[team], id)
              }
            >
              <HiOutlinePlus />
            </button>
          </div>
        </div>
      </div>
      {/* medium + screens */}
      <div className='stats shadow-ms hover:bg-base-200 hover:shadow-lg hidden md:flex'>
        <div className='stat place-items-center flex justify-center items-center'>
          <div className='stat-figure text-secondary'>
            {/* <div className='avatar'>
              <div className='h-16'> */}
            <img src={`/logos/${homeTeam.img}.png`} alt={homeTeam.img} className='max-h-16' />
            {/* </div>
            </div> */}
          </div>
        </div>

        <div className='stat flex justify-center items-center'>
          <div className='flex flex-col lg:flex-row-reverse lg:items-center'>
            <button
              className='btn btn-success btn-sm w-24 font-bold lg:ml-1 my-2 lg:my-0'
              onClick={() => validate(getStatName(label).h, valueUp.h, id)}
            >
              +1
            </button>

            <button
              className='btn-error btn btn-sm w-24 font-bold lg:mr-1'
              onClick={() => validate(getStatName(label).h, valueDown.h, id)}
            >
              -1
            </button>
          </div>
        </div>

        <div className='stat place-items-center'>
          <div className='stat-title'>{label}</div>
          <div className='flex flex-row justify-between items-center'>
            <div className='stat-value text-primary w-full'>
              {fixture[getStatName(label).h]}
            </div>
          </div>

          <div className='stat-desc'>{homeTeam.name}</div>
        </div>
      </div>

      <div className='stats shadow-ms hover:bg-base-200 hover:shadow-lg hidden md:flex'>
        <div className='stat place-items-center'>
          <div className='stat-title'>{label}</div>
          <div className='stat-value text-secondary'>
            {fixture[getStatName(label).a]}
          </div>
          <div className='stat-desc'>{awayTeam.name}</div>
        </div>

        <div className='stat flex justify-center items-center'>
          <div className='flex flex-col lg:flex-row-reverse lg:items-center'>
            <button
              className='btn btn-success btn-sm w-24 font-bold lg:ml-1 my-2 lg:my-0'
              onClick={() => validate(getStatName(label).a, valueUp.a, id)}
            >
              +1
            </button>

            <button
              className='btn-error btn btn-sm w-24 font-bold lg:mr-1'
              onClick={() => validate(getStatName(label).a, valueDown.a, id)}
            >
              -1
            </button>
          </div>
        </div>
        <div className='stat place-items-center flex justify-center items-center'>
          <div className='stat-figure text-secondary'>
            {/* <div className='avatar object-contain'> */}
            {/* <div className='h-16 object-contain'> */}
            <img src={`/logos/${awayTeam.img}.png`} alt={awayTeam.img} className='object-contain max-h-16' />
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsoleRow;
