const fixtures = {
  divisions: [
    {
      id: 1,
      name: `Men's Division`
    },
    {
      id: 2,
      name: `Women's Division`
    }
  ],

  teams: [
    {
      id: 12,
      name: 'Alliance United FC',
      mens: true,
      womens: true,
      mens_roster_url: 'https://www.league1ontario.com/roster/show/7104584?subseason=809614',
      womens_roster_url: 'https://www.league1ontario.com/roster/show/7098640?subseason=809616'
    },
    {
      id: 18,
      name: 'Guelph Union',
      mens: false,
      womens: true,
      mens_roster_url: null,
      womens_roster_url: 'https://www.league1ontario.com/roster/show/7098669?subseason=809616'
    },
    {
      id: 17,
      name: 'Guelph United',
      mens: true,
      womens: false,
      mens_roster_url: 'https://www.league1ontario.com/roster/show/7104596?subseason=809614',
      womens_roster_url: null
    }
  ],

  fixtures: [
    {
      id: 1,
      e2e_id: 1,
      division: 1,
      home_team_id: 12,
      away_team_id: 17,
      home_goals: 0,
      away_goals: 0,
      home_total_shots: 0,
      away_total_shots: 0,
      home_on_target: 0,
      away_on_target: 0,
      home_corners: 0,
      away_corners: 0,
      home_offsides: 0,
      away_offsides: 0,
      home_fouls: 0,
      away_fouls: 0,
      home_yellows: 0,
      away_yellows: 0,
      home_reds: 0,
      away_reds: 0,
    },
    {
      id: 2,
      e2e_id: 2,
      division: 2,
      home_team_id: 18,
      away_team_id: 12,
      home_goals: 0,
      away_goals: 0,
      home_total_shots: 0,
      away_total_shots: 0,
      home_on_target: 0,
      away_on_target: 0,
      home_corners: 0,
      away_corners: 0,
      home_offsides: 0,
      away_offsides: 0,
      home_fouls: 0,
      away_fouls: 0,
      home_yellows: 0,
      away_yellows: 0,
      home_reds: 0,
      away_reds: 0,
    }
  ]
};

export default {
  get: jest.fn().mockResolvedValue()
  // 'get': jest.fn((url) => {
  //   if (url === '/api/divisions') {
  //     return Promise.resolve({
  //       status: 200,
  //       statusText: 'OK',
  //       data: fixtures.divisions
  //     });
  //   }
  //   if (url === '/api/teams') {
  //     return Promise.resolve({
  //       status: 200,
  //       statusText: 'OK',
  //       data: fixtures.teams
  //     });
  //   }
  //   if (url === '/api/fixtures') {
  //     return Promise.resolve({
  //       status: 200,
  //       statusText: 'OK',
  //       data: fixtures.fixtures
  //     });
  //   }
  // })
};