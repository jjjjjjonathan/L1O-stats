import { useParams } from 'react-router-dom';
import { findDivisionName, findTeamName } from '../helpers/helpers';

const Fixture = ({ divisions, teams, fixtures }) => {
  const id = parseInt(useParams().id, 10);

  const selectedFixture = fixtures.find((fixture) => fixture.id === id);

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
            <th>{findTeamName(teams, selectedFixture.home_team_id)}</th>
            <th>{findTeamName(teams, selectedFixture.away_team_id)}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Goals</th>
            <td>{selectedFixture.home_goals}</td>
            <td>{selectedFixture.away_goals}</td>
          </tr>
          <tr>
            <th>Total Shots</th>
            <td>{selectedFixture.home_total_shots}</td>
            <td>{selectedFixture.away_total_shots}</td>
          </tr>
          <tr>
            <th>On Target</th>
            <td>{selectedFixture.home_on_target}</td>
            <td>{selectedFixture.away_on_target}</td>
          </tr>
          <tr>
            <th>Corners</th>
            <td>{selectedFixture.home_corners}</td>
            <td>{selectedFixture.away_corners}</td>
          </tr>
          <tr>
            <th>Offsides</th>
            <td>{selectedFixture.home_offsides}</td>
            <td>{selectedFixture.away_offsides}</td>
          </tr>
          <tr>
            <th>Fouls</th>
            <td>{selectedFixture.home_fouls}</td>
            <td>{selectedFixture.away_fouls}</td>
          </tr>
          <tr>
            <th>Yellow Cards</th>
            <td>{selectedFixture.home_yellows}</td>
            <td>{selectedFixture.away_yellows}</td>
          </tr>
          <tr>
            <th>Red Cards</th>
            <td>{selectedFixture.home_reds}</td>
            <td>{selectedFixture.away_reds}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Fixture;
