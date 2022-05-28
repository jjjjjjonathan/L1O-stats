import { useState } from 'react';
import classNames from 'classnames';
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi';

const ConsoleRow = ({ fixture, label, id, validate, teams }) => {
  const getStatName = (label) => {

    const statStrings = {
      Goals: { h: 'home_goals', a: 'away_goals' },
      'Total Shots': { h: 'home_total_shots', a: 'away_total_shots' },
      'On Target': { h: 'home_on_target', a: 'away_on_target' },
      Corners: { h: 'home_corners', a: 'away_corners' },
      Offsides: { h: 'home_offsides', a: 'away_offsides' },
      Fouls: { h: 'home_fouls', a: 'away_fouls' },
      'Yellow Cards': { h: 'home_yellows', a: 'away_yellows' },
      'Red Cards': { h: 'home_reds', a: 'away_reds' },
    };
    return statStrings[label];
  };

  const valueUp = {
    h: fixture[getStatName(label).h] + 1,
    a: fixture[getStatName(label).a] + 1,
  };
  const valueDown = {
    h: fixture[getStatName(label).h] - 1,
    a: fixture[getStatName(label).a] - 1,
  };

  const [team, setTeam] = useState('h');

  const homeTeamLogo = teams.find((team) => team.id === fixture.home_team_id).img;

  const awayTeamLogo = teams.find((team) => team.id === fixture.away_team_id).img;

  const statClasses = classNames('stats text-primary-content', { 'bg-secondary': team === 'h' }, { 'bg-accent': team === 'a' });

  return (
    <>
      <div>
        <label className="swap swap-flip text-9xl">
          <input type="checkbox" onChange={(e) => e.target.checked ? setTeam('a') : setTeam('h')} />

          <div className="swap-on"><img src={`/logos/${awayTeamLogo}.png`} alt={awayTeamLogo} /></div>
          <div className="swap-off"><img src={`/logos/${homeTeamLogo}.png`} alt={homeTeamLogo} /></div>
        </label>
      </div>
      <div className={statClasses}>

        <div className="stat">
          <div className="stat-title mx-auto text-xl">{label}</div>
          <div className="stat-value mx-auto">{fixture[getStatName(label)[team]]}</div>
          <div className="stat-actions flex flex-row justify-around">
            <button className="btn btn-md btn-error" onClick={() => validate(getStatName(label)[team], valueDown[team], id)}><HiOutlineMinus /></button>
            <button className="btn btn-md btn-success" onClick={() => validate(getStatName(label)[team], valueUp[team], id)}><HiOutlinePlus /></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsoleRow;
