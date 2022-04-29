import RosterListItem from './RosterListItem';
import { useState } from 'react';

const RosterList = ({ roster }) => {
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
  return (
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
  );
};

export default RosterList;
