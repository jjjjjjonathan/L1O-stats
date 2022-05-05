import axios from 'axios';
import { useParams } from 'react-router-dom';
import { findDivisionName, findTeamName } from '../../helpers/helpers';
import ConsoleRow from './ConsoleRow';
import SocialCanvas from './SocialCanvas';
import { useState } from 'react';

const Fixture = ({ divisions, teams, fixtures, dispatch }) => {
  const id = parseInt(useParams().id, 10);

  const selectedFixture = fixtures.find((fixture) => fixture.id === id);

  const updateStats = async (stat, value, fixtureId) => {
    const { data } = await axios.post('/api/fixtures', {
      stat,
      value,
      fixtureId,
    });
    dispatch({ type: 'UPDATE_FIXTURE', content: data });
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

  const [graphicMode, setGraphicMode] = useState(null);

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-5xl my-5'>
        {findTeamName(teams, selectedFixture.home_team_id)} vs.{' '}
        {findTeamName(teams, selectedFixture.away_team_id)}
      </h1>
      <h2 className='text-2xl mb-5'>
        {findDivisionName(divisions, selectedFixture.division)}
      </h2>
      {err.length > 0 && <p className='text-red-700'>{err}</p>}
      <table className='border border-purple-700 border-collapse'>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>{findTeamName(teams, selectedFixture.home_team_id)}</th>
            <th></th>
            <th></th>
            <th>{findTeamName(teams, selectedFixture.away_team_id)}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <ConsoleRow
            key='goals'
            fixture={selectedFixture}
            label={'Goals'}
            id={id}
            validate={validate}
          />
          <ConsoleRow
            key='total shots'
            fixture={selectedFixture}
            label={'Total Shots'}
            id={id}
            validate={validate}
          />
          <ConsoleRow
            key='on target shots'
            fixture={selectedFixture}
            label={'On Target'}
            id={id}
            validate={validate}
          />
          <ConsoleRow
            key='corners'
            fixture={selectedFixture}
            label={'Corners'}
            id={id}
            validate={validate}
          />
          <ConsoleRow
            key='offsides'
            fixture={selectedFixture}
            label={'Offsides'}
            id={id}
            validate={validate}
          />
          <ConsoleRow
            key='fouls'
            fixture={selectedFixture}
            label={'Fouls'}
            id={id}
            validate={validate}
          />
          <ConsoleRow
            key='yellows'
            fixture={selectedFixture}
            label={'Yellow Cards'}
            id={id}
            validate={validate}
          />
          <ConsoleRow
            key='reds'
            fixture={selectedFixture}
            label={'Red Cards'}
            id={id}
            validate={validate}
          />
        </tbody>
      </table>
      <div>
        <button
          onClick={() => setGraphicMode(1)}
          className='py-2.5 px-5 mr-2 mb-2 mt-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
        >
          Half-time graphic
        </button>
        <button
          onClick={() => setGraphicMode(2)}
          className='py-2.5 px-5 mr-2 mb-2 mt-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
        >
          Full-time graphic
        </button>
      </div>

      {graphicMode === 1 && (
        <SocialCanvas stats={stats} text={'Half-time'} xAxis={-15} />
      )}
      {graphicMode === 2 && (
        <SocialCanvas stats={stats} text={'Full-time'} xAxis={-5} />
      )}
    </div>
  );
};

export default Fixture;
