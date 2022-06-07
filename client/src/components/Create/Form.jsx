import FormOption from './FormOption';

const Form = ({ teams, setHomeTeam, setAwayTeam, setE2eId, setDate }) => {
  const mappedTeams = teams.map((team) => (
    <FormOption key={team.id} value={team.id} name={team.name} />
  ));

  return (
    <div className='flex flex-col gap-y-4 items-center'>
      <section>
        <select
          name='homeTeamSelect'
          id='homeTeamSelect'
          onChange={(event) => {
            setHomeTeam(parseInt(event.target.value, 10));
          }}
          defaultValue={'label'}
          className='select select-bordered w-full max-w-xs'
        >
          <option key={'label'} disabled value={'label'}>
            Select home team
          </option>
          {mappedTeams}
        </select>
      </section>
      <section>
        <select
          name='awayTeamSelect'
          id='awayTeamSelect'
          onChange={(event) => setAwayTeam(parseInt(event.target.value, 10))}
          defaultValue={'label'}
          className='select select-bordered w-full max-w-xs'
        >
          <option key={'label'} disabled value={'label'}>
            Select away team
          </option>
          {mappedTeams}
        </select>
      </section>
      <section>
        <input
          type='text'
          onChange={(event) => {
            setE2eId(parseInt(event.target.value, 10));
          }}
          className='input input-bordered w-full max-w-xs'
          placeholder='Select E2EID'
        />
      </section>
      <section className='flex flex-row gap-x-4'>
        <label htmlFor=''>Set date and time</label>
        <input
          type='datetime-local'
          onChange={(event) => {
            setDate(event.target.value);
          }}
          className='bg-base-200 border border-base-content rounded-lg px-4'
        />
      </section>
    </div>
  );
};

export default Form;
