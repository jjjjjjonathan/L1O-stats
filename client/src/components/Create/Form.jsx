import FormOption from './FormOption';

const Form = ({ teams, setHomeTeam, setAwayTeam, setE2eId, setDate }) => {
  const mappedTeams = teams.map((team) => (
    <FormOption key={team.id} value={team.id} name={team.name} />
  ));

  return (
    <>
      <section>
        <label htmlFor="">Select home team</label>
        <select
          name="homeTeamSelect"
          id="homeTeamSelect"
          onChange={(event) => setHomeTeam(parseInt(event.target.value, 10))}
          defaultValue={'label'}
        >
          <option key={'label'} disabled value={'label'}>
            Select home team
          </option>
          {mappedTeams}
        </select>
      </section>
      <section>
        <label htmlFor="">Select away team</label>
        <select
          name="awayTeamSelect"
          id="awayTeamSelect"
          onChange={(event) => setAwayTeam(parseInt(event.target.value, 10))}
          defaultValue={'label'}
        >
          <option key={'label'} disabled value={'label'}>
            Select away team
          </option>
          {mappedTeams}
        </select>
      </section>
      <section>
        <label htmlFor="">Select E2E game ID</label>
        <input
          type="number"
          onChange={(event) => setE2eId(parseInt(event.target.value, 10))}
        />
      </section>
      <section>
        <label htmlFor="">Set date and time</label>
        <input
          type="datetime-local"
          onChange={(event) => setDate(event.target.value)}
        />
      </section>
    </>
  );
};

export default Form;
