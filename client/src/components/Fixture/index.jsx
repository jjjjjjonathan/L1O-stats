import axios from 'axios';
import { useParams } from 'react-router-dom';
import { findDivisionName, findTeamName } from '../../helpers/helpers';
import ConsoleRow from './ConsoleRow';
import SocialCanvas from './SocialCanvas';
import { useState, useContext } from 'react';
import classNames from 'classnames';
import RosterSelect from './RosterSelect';
import { DispatchContext } from '../../App';

const Fixture = ({ divisions, teams, fixtures }) => {
  const id = parseInt(useParams().id, 10);

  const dispatch = useContext(DispatchContext);
  const selectedFixture = fixtures.find((fixture) => fixture.id === id);

  const homeTeam = teams.find(
    (team) => team.id === selectedFixture.home_team_id
  );

  const awayTeam = teams.find(
    (team) => team.id === selectedFixture.away_team_id
  );

  const updateStats = async (stat, value, fixtureId) => {
    try {
      const { data } = await axios.post('/api/fixtures', {
        stat,
        value,
        fixtureId
      });
      dispatch({ type: 'UPDATE_FIXTURE', content: data });
    } catch (err) {
      console.error(err);
    }
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
      name: findTeamName(teams, selectedFixture.home_team_id)
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
      name: findTeamName(teams, selectedFixture.away_team_id)
    }
  };

  const [tab, setTab] = useState(3);

  const statsTabClasses = classNames('tab tab-bordered', {
    'tab-active': tab === 3
  });

  const halfTimeClasses = classNames('tab tab-bordered md:hidden', {
    'tab-active': tab === 1
  });

  const halfTimeClassesMd = classNames('tab tab-bordered hidden md:block', {
    'tab-active': tab === 1
  });

  const fullTimeClasses = classNames('tab tab-bordered md:hidden', {
    'tab-active': tab === 2
  });

  const fullTimeClassesMd = classNames('tab tab-bordered hidden md:block', {
    'tab-active': tab === 2
  });

  const homeXIClasses = classNames('tab tab-bordered', {
    'tab-active': tab === 4
  });

  const awayXIClasses = classNames('tab tab-bordered', {
    'tab-active': tab === 5
  });

  const rows = [
    'Goals',
    'Total Shots',
    'On Target',
    'Corners',
    'Offsides',
    'Fouls',
    'Yellow Cards',
    'Red Cards'
  ];

  const mappedRows = rows.map((row) => (
    <ConsoleRow
      key={row}
      label={row}
      fixture={selectedFixture}
      id={id}
      validate={validate}
      teams={teams}
    />
  ));

  return (
    <>
      <div className='tabs justify-center py-8'>
        <button className={homeXIClasses} onClick={() => setTab(4)}>
          Home XI
        </button>
        <button className={halfTimeClasses} onClick={() => setTab(1)}>
          HT
        </button>
        <button className={halfTimeClassesMd} onClick={() => setTab(1)}>
          Half-time
        </button>
        <button className={statsTabClasses} onClick={() => setTab(3)}>
          Stats
        </button>
        <button className={fullTimeClasses} onClick={() => setTab(2)}>
          FT
        </button>
        <button className={fullTimeClassesMd} onClick={() => setTab(2)}>
          Full-time
        </button>
        <button className={awayXIClasses} onClick={() => setTab(5)}>
          Away XI
        </button>
      </div>

      {/* Stats tab content */}
      {tab === 3 && (
        <div className='grid grid-cols-2 mx-auto gap-y-4 gap-x-2 p-4 mx-auto'>
          {mappedRows}
        </div>
      )}

      {/* Half-time tab content */}
      {tab === 1 && <SocialCanvas stats={stats} graphicMode={tab} />}

      {/* Full-time tab content */}
      {tab === 2 && <SocialCanvas stats={stats} graphicMode={tab} />}

      {/* Home XI tab content */}
      {tab === 4 && (
        <RosterSelect division={selectedFixture.division} team={homeTeam} />
      )}

      {/* Away XI tab content */}
      {tab === 5 && (
        <RosterSelect division={selectedFixture.division} team={awayTeam} />
      )}
    </>
  );
};

export default Fixture;
