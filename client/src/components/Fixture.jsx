import axios from 'axios';
import { useParams } from 'react-router-dom';
import { findDivisionName, findTeamName } from '../helpers/helpers';

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
          <tr>
            <th>Goals</th>
            <td>
              <button
                onClick={() =>
                  updateStats('home_goals', selectedFixture.home_goals - 1, id)
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.home_goals}</td>
            <td>
              <button
                onClick={() =>
                  updateStats('home_goals', selectedFixture.home_goals + 1, id)
                }
              >
                +
              </button>
            </td>
            <td>
              <button
                onClick={() =>
                  updateStats('away_goals', selectedFixture.away_goals - 1, id)
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.away_goals}</td>
            <td>
              <button
                onClick={() =>
                  updateStats('away_goals', selectedFixture.away_goals + 1, id)
                }
              >
                +
              </button>
            </td>
          </tr>
          <tr>
            <th>Total Shots</th>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'home_total_shots',
                    selectedFixture.home_total_shots - 1,
                    id
                  )
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.home_total_shots}</td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'home_total_shots',
                    selectedFixture.home_total_shots + 1,
                    id
                  )
                }
              >
                +
              </button>
            </td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'away_total_shots',
                    selectedFixture.away_total_shots - 1,
                    id
                  )
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.away_total_shots}</td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'away_total_shots',
                    selectedFixture.away_total_shots + 1,
                    id
                  )
                }
              >
                +
              </button>
            </td>
          </tr>
          <tr>
            <th>On Target</th>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'home_on_target',
                    selectedFixture.home_on_target - 1,
                    id
                  )
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.home_on_target}</td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'home_on_target',
                    selectedFixture.home_on_target + 1,
                    id
                  )
                }
              >
                +
              </button>
            </td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'away_on_target',
                    selectedFixture.away_on_target - 1,
                    id
                  )
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.away_on_target}</td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'away_on_target',
                    selectedFixture.away_on_target + 1,
                    id
                  )
                }
              >
                +
              </button>
            </td>
          </tr>
          <tr>
            <th>Corners</th>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'home_corners',
                    selectedFixture.home_corners - 1,
                    id
                  )
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.home_corners}</td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'home_corners',
                    selectedFixture.home_corners + 1,
                    id
                  )
                }
              >
                +
              </button>
            </td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'away_corners',
                    selectedFixture.away_corners - 1,
                    id
                  )
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.away_corners}</td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'away_corners',
                    selectedFixture.away_corners + 1,
                    id
                  )
                }
              >
                +
              </button>
            </td>
          </tr>
          <tr>
            <th>Offsides</th>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'home_offsides',
                    selectedFixture.home_offsides - 1,
                    id
                  )
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.home_offsides}</td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'home_offsides',
                    selectedFixture.home_offsides + 1,
                    id
                  )
                }
              >
                +
              </button>
            </td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'away_offsides',
                    selectedFixture.away_offsides - 1,
                    id
                  )
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.away_offsides}</td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'away_offsides',
                    selectedFixture.away_offsides + 1,
                    id
                  )
                }
              >
                +
              </button>
            </td>
          </tr>
          <tr>
            <th>Fouls</th>
            <td>
              <button
                onClick={() =>
                  updateStats('home_fouls', selectedFixture.home_fouls - 1, id)
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.home_fouls}</td>
            <td>
              <button
                onClick={() =>
                  updateStats('home_fouls', selectedFixture.home_fouls + 1, id)
                }
              >
                +
              </button>
            </td>
            <td>
              <button
                onClick={() =>
                  updateStats('away_fouls', selectedFixture.away_fouls - 1, id)
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.away_fouls}</td>
            <td>
              <button
                onClick={() =>
                  updateStats('away_fouls', selectedFixture.away_fouls + 1, id)
                }
              >
                +
              </button>
            </td>
          </tr>
          <tr>
            <th>Yellow Cards</th>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'home_yellows',
                    selectedFixture.home_yellows - 1,
                    id
                  )
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.home_yellows}</td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'home_yellows',
                    selectedFixture.home_yellows + 1,
                    id
                  )
                }
              >
                +
              </button>
            </td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'away_yellows',
                    selectedFixture.away_yellows - 1,
                    id
                  )
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.away_yellows}</td>
            <td>
              <button
                onClick={() =>
                  updateStats(
                    'away_yellows',
                    selectedFixture.away_yellows + 1,
                    id
                  )
                }
              >
                +
              </button>
            </td>
          </tr>
          <tr>
            <th>Red Cards</th>
            <td>
              <button
                onClick={() =>
                  updateStats('home_reds', selectedFixture.home_reds - 1, id)
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.home_reds}</td>
            <td>
              <button
                onClick={() =>
                  updateStats('home_reds', selectedFixture.home_reds + 1, id)
                }
              >
                +
              </button>
            </td>
            <td>
              <button
                onClick={() =>
                  updateStats('away_reds', selectedFixture.away_reds - 1, id)
                }
              >
                -
              </button>
            </td>
            <td>{selectedFixture.away_reds}</td>
            <td>
              <button
                onClick={() =>
                  updateStats('away_reds', selectedFixture.away_reds + 1, id)
                }
              >
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Fixture;
