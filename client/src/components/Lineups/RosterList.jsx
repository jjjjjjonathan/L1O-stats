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

  //  lg:flex-row lg:justify-between lg:w-full

  return (
    <div className='flex flex-col'>
      <form>
        <table className='table-fixed'>
          <thead>
            <tr>
              <th className='w-1/4'>Select XI</th>
              {startingXI.length <= 0 ? (
                <>
                  <th className='w-1/4'></th>
                  <th className='w-1/4'></th>
                </>
              ) : (
                <>
                  <th className='w-1/8'>GK?</th>
                  <th className='w-1/8'>Shirt #</th>
                </>
              )}
              <th className='w-1/4'>Name</th>
            </tr>
          </thead>
          <tbody>{mappedRoster}</tbody>
        </table>
      </form>
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
