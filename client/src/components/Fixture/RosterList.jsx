const RosterList = ({ roster }) => {
  let names = [...roster].join(', ');
  return <h1>{names}</h1>;
};

export default RosterList;
