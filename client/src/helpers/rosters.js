import axios from "axios";

const scrapeRosters = async (fixture, teams, callbacks) => {
  const homeTeam = teams.find((team) => team.id === fixture.home_team_id);
  const awayTeam = teams.find((team) => team.id === fixture.away_team_id);
  const getUrls = {
    1: { h: homeTeam.mens_roster_url, a: awayTeam.mens_roster_url },
    2: { h: homeTeam.womens_roster_url, a: awayTeam.womens_roster_url },
  };
  const [homePlayers, awayPlayers] = await Promise.all([
    axios.put('/api/teams/players', {
      rosterUrl: getUrls[fixture.division].h,
    }),
    axios.put('/api/teams/players', {
      rosterUrl: getUrls[fixture.division].a,
    }),
  ]);
  callbacks.h(homePlayers.data);
  callbacks.a(awayPlayers.data);
};

export default scrapeRosters;