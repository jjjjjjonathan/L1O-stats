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

  // LOOK INTO CHANGING GOALKEEPER CHECKBOXES TO RADIO BUTTONS

  return (
    <form>
      <table className='table-fixed'>
        <thead>
          <tr>
            <th>Starter?</th>
            {startingXI.length <= 0 ? (
              <th colSpan='2'></th>
            ) : (
              <th colSpan='2'>More info</th>
            )}
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{mappedRoster}</tbody>
      </table>
      <LineupCanvas
        startingXI={startingXI}
        goalkeeper={goalkeeper}
        teamName={teamName}
        graphicColour={graphicColour}
      />
    </form>
  );
};

export default RosterList;
