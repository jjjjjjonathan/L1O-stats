import axios from 'axios';
import { useParams } from 'react-router-dom';
import { findDivisionName, findTeamName } from '../../helpers/helpers';
import ConsoleRow from './ConsoleRow';

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

  return (
    <>
      <h1>
        {findTeamName(teams, selectedFixture.home_team_id)} vs.{' '}
        {findTeamName(teams, selectedFixture.away_team_id)}
      </h1>
      <h2>{findDivisionName(divisions, selectedFixture.division)}</h2>
      <table>
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
            key="goals"
            fixture={selectedFixture}
            label={'Goals'}
            id={id}
            updateStats={updateStats}
          />
          <ConsoleRow
            key="total shots"
            fixture={selectedFixture}
            label={'Total Shots'}
            id={id}
            updateStats={updateStats}
          />
          <ConsoleRow
            key="on target shots"
            fixture={selectedFixture}
            label={'On Target'}
            id={id}
            updateStats={updateStats}
          />
          <ConsoleRow
            key="corners"
            fixture={selectedFixture}
            label={'Corners'}
            id={id}
            updateStats={updateStats}
          />
          <ConsoleRow
            key="offsides"
            fixture={selectedFixture}
            label={'Offsides'}
            id={id}
            updateStats={updateStats}
          />
          <ConsoleRow
            key="fouls"
            fixture={selectedFixture}
            label={'Fouls'}
            id={id}
            updateStats={updateStats}
          />
          <ConsoleRow
            key="yellows"
            fixture={selectedFixture}
            label={'Yellow Cards'}
            id={id}
            updateStats={updateStats}
          />
          <ConsoleRow
            key="reds"
            fixture={selectedFixture}
            label={'Red Cards'}
            id={id}
            updateStats={updateStats}
          />
        </tbody>
      </table>
    </>
  );
};

export default Fixture;
