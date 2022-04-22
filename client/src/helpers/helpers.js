const findDivisionName = (divisions, divisionId) => {
  return divisions.find((division) => division.id === divisionId).name;
};

const findTeamName = (teams, teamId) => {
  return teams.find((team) => team.id === teamId).name;
};

export { findDivisionName, findTeamName };