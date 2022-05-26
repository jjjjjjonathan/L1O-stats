import axios from 'axios';
import { useState } from 'react';
import Form from './Form';

const Create = ({ divisions, teams, dispatch }) => {
  const mensTeams = teams.filter((team) => team.mens);
  const womensTeams = teams.filter((team) => team.womens);

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [e2eId, setE2eId] = useState(null);
  const [date, setDate] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const submitNewFixture = async (
    event,
    selectedDivision,
    homeTeam,
    awayTeam,
    e2eId,
    date
  ) => {
    try {
      event.preventDefault();
      if (Number.isNaN(e2eId)) {
        setErr(true);
        setErrMsg('E2E ID needs to be a number');
      } else {
        const { data } = await axios.put('/api/fixtures', {
          selectedDivision,
          homeTeam,
          awayTeam,
          e2eId,
          date,
        });
        dispatch({ type: 'CREATE_FIXTURE', content: data });
        setSuccess(true);
        setSuccessMsg(`You just created match #${data.e2e_id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      {success && (
        <div class="alert alert-success shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{successMsg}</span>
          </div>
        </div>
      )}
      {err && (
        <div class="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Error! Task failed successfully.</span>
          </div>
        </div>
      )}
      <div>
        <button
          value={divisions[0].id}
          onClick={() => setSelectedDivision(divisions[0].id)}
          className='btn btn-primary ml-4 my-6'
        >
          {divisions[0].name}
        </button>
        <button
          value={divisions[1].id}
          onClick={() => setSelectedDivision(divisions[1].id)}
          className='btn btn-primary ml-4 my-6'
        >
          {divisions[1].name}
        </button>
      </div>
      {selectedDivision && (
        <>
          <Form
            teams={selectedDivision === 1 ? mensTeams : womensTeams}
            setHomeTeam={setHomeTeam}
            setAwayTeam={setAwayTeam}
            setE2eId={setE2eId}
            setDate={setDate}
            setSuccess={setSuccess}
            setErr={setErr}
          />
          <button
            onClick={(event) =>
              submitNewFixture(
                event,
                selectedDivision,
                homeTeam,
                awayTeam,
                e2eId,
                date
              )
            }
          >
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default Create;
