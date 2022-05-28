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
    <div className='flex flex-col-reverse lg:flex-row lg:justify-evenly lg:items-start mx-auto'>
      <form>
        <table className='table table-fixed'>
          <thead>
            <tr>
              <th className='w-sm text-center'>Select XI</th>
              {startingXI.length <= 0 ? (
                <>
                  <th className='w-sm'></th>
                  <th className='w-sm'></th>
                </>
              ) : (
                <>
                  <th className='w-sm text-center'>GK?</th>
                  <th className='w-sm text-center'>Shirt #</th>
                </>
              )}
              <th className='w-2 text-center'>Name</th>
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
