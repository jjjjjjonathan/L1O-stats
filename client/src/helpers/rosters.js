import axios from "axios";

const scrapeRosters = async (division, team) => {
  try {
    const getUrls = {
      1: team.mens_roster_url,
      2: team.womens_roster_url,
    };
    const { data } = await axios.put('api/teams/players', { rosterUrl: getUrls[division] });
    return data;
  }
  catch (err) {
    console.error(err);
  }
};

export default scrapeRosters;