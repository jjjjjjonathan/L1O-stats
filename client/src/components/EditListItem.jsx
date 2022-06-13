import { useState, useContext } from 'react';
import FormOption from './Create/FormOption';
import { DispatchContext, AlertContext } from '../App';
import axios from 'axios';
import { zonedTimeToUtc } from 'date-fns-tz';

const EditListItem = ({
  division,
  teams,
  home_team_id,
  away_team_id,
  e2e_id,
  date,
  id
}) => {
  const dispatch = useContext(DispatchContext);
  const setAlert = useContext(AlertContext);
  const mensTeams = teams.filter((team) => team.mens);
  const womensTeams = teams.filter((team) => team.womens);
  const mappedTeams = (teamList) =>
    teamList.map((team) => (
      <FormOption key={team.id} value={team.id} name={team.name} />
    ));

  const [homeTeam, setHomeTeam] = useState(home_team_id);
  const [awayTeam, setAwayTeam] = useState(away_team_id);
  const [e2eID, setE2eID] = useState(e2e_id);
  const [matchDate, setMatchDate] = useState(date);

  const submitEditedFixture = async (
    homeTeam,
    awayTeam,
    e2eID,
    matchDate,
    id
  ) => {
    const { data } = await axios.put('/api/fixtures/edit', {
      homeTeam,
      awayTeam,
      e2eID: parseInt(e2eID, 10),
      matchDate,
      id
    });
    dispatch({ type: 'UPDATE_FIXTURE', content: data });
    setAlert({ type: 'success', msg: `Match #${e2eID} is now updated!` });
  };

  return (
    <>
      <div className='flex flex-col gap-y-4 items-center'>
        <section>
          <select
            name='homeTeamSelect'
            id='homeTeamSelect'
            onChange={(event) => {
              setHomeTeam(parseInt(event.target.value, 10));
            }}
            defaultValue={homeTeam}
            className='select select-bordered w-full max-w-xs'
          >
            {mappedTeams(division === 1 ? mensTeams : womensTeams)}
          </select>
        </section>
        <section>
          <select
            name='awayTeamSelect'
            id='awayTeamSelect'
            onChange={(event) => setAwayTeam(parseInt(event.target.value, 10))}
            defaultValue={awayTeam}
            className='select select-bordered w-full max-w-xs'
          >
            {mappedTeams(division === 1 ? mensTeams : womensTeams)}
          </select>
        </section>
        <section>
          <input
            type='text'
            onChange={(event) => {
              setE2eID(parseInt(event.target.value, 10));
            }}
            className='input input-bordered w-full max-w-xs'
            value={e2eID.toString(10)}
          />
        </section>
        <section className='flex flex-row gap-x-4'>
          <label htmlFor=''>Set date and time</label>
          <input
            type='datetime-local'
            onChange={(event) => {
              setMatchDate(zonedTimeToUtc(new Date(event.target.value), 'America/Toronto').toISOString());
            }}
            className='bg-base-200 border border-base-content rounded-lg px-4'
            defaultValue={matchDate}
          />
        </section>
      </div>
      <div className='modal-action'>
        <label
          htmlFor={`edit-modal${id}`}
          className='btn btn-success'
          onClick={() =>
            submitEditedFixture(homeTeam, awayTeam, e2eID, matchDate, id)
          }
        >
          Submit edits
        </label>
        <label htmlFor={`edit-modal${id}`} className='btn btn-warning'>
          Cancel
        </label>
      </div>
    </>
  );
};

export default EditListItem;
