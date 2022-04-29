import RosterListItem from './RosterListItem';
import { useState } from 'react';
import LineupCanvas from './LineupCanvas';

const RosterList = ({ roster, teamName }) => {
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
    <>
      <table>
        <thead>
          <tr>
            <th>Starter?</th>
            <th colSpan="2">More info</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{mappedRoster}</tbody>
      </table>
      <LineupCanvas
        startingXI={startingXI}
        goalkeeper={goalkeeper}
        teamName={teamName}
      />
    </>
  );
};

export default RosterList;
