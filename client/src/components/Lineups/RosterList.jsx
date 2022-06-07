import RosterListItem from './RosterListItem';
import { useState } from 'react';
import LineupCanvas from './LineupCanvas';

const RosterList = ({ roster, teamName, graphicColour }) => {
  const [startingXI, setStartingXI] = useState([]);
  const [goalkeeper, setGoalkeeper] = useState(null);
  const mappedRoster = roster.map((player) => (
    <RosterListItem
      name={player.name}
      key={player.id}
      value={player.id}
      roster={roster}
      setStartingXI={setStartingXI}
      startingXI={startingXI}
      goalkeeper={goalkeeper}
      setGoalkeeper={setGoalkeeper}
    />
  ));

  //

  return (
    <div className='grid grid-cols-1'>
      <form>{mappedRoster}</form>
      <LineupCanvas
        startingXI={startingXI}
        goalkeeper={goalkeeper}
        teamName={teamName}
        graphicColour={graphicColour}
      />
    </div>
  );
};

export default RosterList;
