import axios from 'axios';
import { useParams } from 'react-router-dom';
import { findDivisionName, findTeamName } from '../../helpers/helpers';
import ConsoleRow from './ConsoleRow';
import SocialCanvas from './SocialCanvas';
import { useState } from 'react';
import classNames from 'classnames';

const Fixture = ({ divisions, teams, fixtures, dispatch }) => {
  const id = parseInt(useParams().id, 10);

  const selectedFixture = fixtures.find((fixture) => fixture.id === id);

  const updateStats = async (stat, value, fixtureId) => {
    try {
      const { data } = await axios.post('/api/fixtures', {
        stat,
        value,
        fixtureId,
      });
      dispatch({ type: 'UPDATE_FIXTURE', content: data });
    } catch (err) {
      console.error(err);
    }
  };

  const [err, setErrMsg] = useState('');

  const validate = (stat, value, id) => {
    value < 0
      ? setErrMsg(`Cannot have a value of less than 0.`)
      : updateStats(stat, value, id) && setErrMsg('');
  };

  // To be used for creating social media graphics
  const stats = {
    h: {
      goals: selectedFixture.home_goals,
      totalShots: selectedFixture.home_total_shots,
      onTarget: selectedFixture.home_on_target,
      corners: selectedFixture.home_corners,
      offsides: selectedFixture.home_offsides,
      fouls: selectedFixture.home_fouls,
      yellows: selectedFixture.home_yellows,
      reds: selectedFixture.home_reds,
      name: findTeamName(teams, selectedFixture.home_team_id),
    },
    a: {
      goals: selectedFixture.away_goals,
      totalShots: selectedFixture.away_total_shots,
      onTarget: selectedFixture.away_on_target,
      corners: selectedFixture.away_corners,
      offsides: selectedFixture.away_offsides,
      fouls: selectedFixture.away_fouls,
      yellows: selectedFixture.away_yellows,
      reds: selectedFixture.away_reds,
      name: findTeamName(teams, selectedFixture.away_team_id),
    },
  };

  const [tab, setTab] = useState(3);

  const statsTabClasses = classNames('tab tab-bordered', { 'tab-active': tab === 3 });

  const halfTimeClasses = classNames('tab tab-bordered', { 'tab-active': tab === 1 });

  const fullTimeClasses = classNames('tab tab-bordered', { 'tab-active': tab === 2 });

  return (
    <>
      <div className="tabs justify-center py-8">
        <a className='tab tab-bordered'>Home XI</a>
        <a className={halfTimeClasses} onClick={() => setTab(1)}>HT</a>
        <a className={statsTabClasses} onClick={() => setTab(3)}>Stats</a>
        <a className={fullTimeClasses} onClick={() => setTab(2)}>FT</a>
        <a className='tab tab-bordered'>Away XI</a>
      </div>

      {tab === 3 && (

        <div className='grid grid-cols-2 mx-auto gap-y-4 gap-x-2 p-4 mx-auto'>
          <ConsoleRow
            key='goals'
            fixture={selectedFixture}
            label={'Goals'}
            id={id}
            validate={validate}
            teams={teams}
          />
          <ConsoleRow
            key='total shots'
            fixture={selectedFixture}
            label={'Total Shots'}
            id={id}
            validate={validate}
            teams={teams}
          />
          <ConsoleRow
            key='on target shots'
            fixture={selectedFixture}
            label={'On Target'}
            id={id}
            validate={validate}
            teams={teams}
          />
          <ConsoleRow
            key='corners'
            fixture={selectedFixture}
            label={'Corners'}
            id={id}
            validate={validate}
            teams={teams}
          />
          <ConsoleRow
            key='offsides'
            fixture={selectedFixture}
            label={'Offsides'}
            id={id}
            validate={validate}
            teams={teams}
          />
          <ConsoleRow
            key='fouls'
            fixture={selectedFixture}
            label={'Fouls'}
            id={id}
            validate={validate}
            teams={teams}
          />
          <ConsoleRow
            key='yellows'
            fixture={selectedFixture}
            label={'Yellow Cards'}
            id={id}
            validate={validate}
            teams={teams}
          />
          <ConsoleRow
            key='reds'
            fixture={selectedFixture}
            label={'Red Cards'}
            id={id}
            validate={validate}
            teams={teams}
          />
        </div>
      )}
      {tab === 1 && (
        <SocialCanvas stats={stats} graphicMode={tab} />
      )}
      {tab === 2 && (
        <SocialCanvas stats={stats} graphicMode={tab} />
      )}
    </>
    // <div className='flex flex-col items-center justify-center'>
    //   <h1 className='text-5xl my-5'>
    //     {findTeamName(teams, selectedFixture.home_team_id)} vs.{' '}
    //     {findTeamName(teams, selectedFixture.away_team_id)}
    //   </h1>
    //   <h2 className='text-2xl mb-5'>
    //     {findDivisionName(divisions, selectedFixture.division)}
    //   </h2>
    //   {err.length > 0 && <p className='text-red-700'>{err}</p>}
    //   <table className='border border-purple-700 border-collapse'>
    //     <thead>
    //       <tr>
    //         <th></th>
    //         <th></th>
    //         <th>{findTeamName(teams, selectedFixture.home_team_id)}</th>
    //         <th></th>
    //         <th></th>
    //         <th>{findTeamName(teams, selectedFixture.away_team_id)}</th>
    //         <th></th>
    //       </tr>
    //     </thead>
    //     <tbody>








    //     </tbody>
    //   </table>
    //   <div>
    //     <button
    //       onClick={() => setGraphicMode(1)}
    //       className='py-2.5 px-5 mr-2 mb-2 mt-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
    //     >
    //       Half-time graphic
    //     </button>
    //     <button
    //       onClick={() => setGraphicMode(2)}
    //       className='py-2.5 px-5 mr-2 mb-2 mt-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
    //     >
    //       Full-time graphic
    //     </button>
    //   </div>


    // </div>
  );
};

export default Fixture;
