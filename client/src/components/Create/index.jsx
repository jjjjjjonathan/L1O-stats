import axios from 'axios';
import { useState, useContext } from 'react';
import Form from './Form';
import { DispatchContext, AlertContext } from '../../App';

const Create = ({ divisions, teams }) => {
  const dispatch = useContext(DispatchContext);
  const setAlert = useContext(AlertContext);
  const mensTeams = teams.filter((team) => team.mens);
  const womensTeams = teams.filter((team) => team.womens);

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [homeTeam, setHomeTeam] = useState(null);
  const [awayTeam, setAwayTeam] = useState(null);
  const [e2eId, setE2eId] = useState(null);
  const [date, setDate] = useState(null);

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
        setAlert({
          type: 'error',
          msg: `E2E ID isn't a number.`
        });
      } else if (homeTeam === awayTeam) {
        setAlert({
          type: 'error',
          msg: `Teams can't play themselves.`
        });
      } else {
        const { data } = await axios.put('/api/fixtures', {
          selectedDivision,
          homeTeam,
          awayTeam,
          e2eId,
          date
        });
        dispatch({ type: 'CREATE_FIXTURE', content: data });
        setAlert({
          type: 'success',
          msg: `You just created match #${data.e2e_id}!`
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col items-center'>
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
