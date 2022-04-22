import axios from 'axios';
import { useState } from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';

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

  const submitNewFixture = async (
    event,
    selectedDivision,
    homeTeam,
    awayTeam,
    e2eId,
    date
  ) => {
    event.preventDefault();
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
  };

  return (
    <>
      <button
        value={divisions[0].id}
        onClick={() => setSelectedDivision(divisions[0].id)}
      >
        {divisions[0].name}
      </button>
      <button
        value={divisions[1].id}
        onClick={() => setSelectedDivision(divisions[1].id)}
      >
        {divisions[1].name}
      </button>
      {selectedDivision === 1 && (
        <>
          <Form
            teams={mensTeams}
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
      {selectedDivision === 2 && (
        <>
          <Form
            teams={womensTeams}
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
      {success && (
        <>
          <p>{successMsg}</p>
          <Link to="/fixtures">Go to list of fixtures</Link>
        </>
      )}
    </>
  );
};

export default Create;
