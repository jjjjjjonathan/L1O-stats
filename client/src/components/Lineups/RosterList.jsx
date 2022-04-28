import RosterListItem from './RosterListItem';
import { useState } from 'react';

const RosterList = ({ roster }) => {
  const [startingXI, setStartingXI] = useState([]);
  const mappedRoster = roster.map((player) => (
    <RosterListItem name={player.name} key={player.id} value={player.id} />
  ));
  return (
    <table>
      <thead>
        <tr>
          <th>Starter?</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>{mappedRoster}</tbody>
    </table>
  );
};

export default RosterList;
