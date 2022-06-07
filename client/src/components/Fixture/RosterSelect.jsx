import scrapeRosters from '../../helpers/rosters';
import { useEffect, useState } from 'react';
import RosterList from '../Lineups/RosterList';

const RosterSelect = ({ division, team }) => {
  const [roster, setRoster] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [graphicColour, setGraphicColour] = useState('');

  const rosterScrape = async (division, team) => {
    try {
      const scrapedRoster = await scrapeRosters(division, team);
      setRoster(scrapedRoster);
      setTeamName(team.name);
      setGraphicColour(team.graphic_colour);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    rosterScrape(division, team);
  }, [division, team]);

  return (
    <>
      {roster.length > 0 ? (
        <RosterList
          roster={roster}
          teamName={teamName}
          graphicColour={graphicColour}
        />
      ) : (
        <div className='flex flex-row justify-center items-center h-screen'>
          <svg
            className='h-24 w-24 animate-spin text-base-content'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        </div>
      )}
    </>
  );
};

export default RosterSelect;
