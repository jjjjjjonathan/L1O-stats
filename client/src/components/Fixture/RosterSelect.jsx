import scrapeRosters from "../../helpers/rosters";
import { useEffect, useState } from "react";
import RosterList from "../Lineups/RosterList";

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
  }, []);

  return (
    <>
      {roster.length > 0 ? <RosterList roster={roster} teamName={teamName} graphicColour={graphicColour} /> : <p>Loading</p>}
    </>
  );
};

export default RosterSelect;
