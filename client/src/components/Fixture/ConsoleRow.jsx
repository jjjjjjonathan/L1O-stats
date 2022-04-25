const ConsoleRow = ({ fixture, label, id, updateStats }) => {
  const getStatName = (label) => {
    const statStrings = {
      Goals: { h: 'home_goals', a: 'away_goals' },
      'Total Shots': { h: 'home_total_shots', a: 'away_total_shots' },
      'On Target': { h: 'home_on_target', a: 'away_on_target' },
      Corners: { h: 'home_corners', a: 'away_corners' },
      Offsides: { h: 'home_offsides', a: 'away_offsides' },
      Fouls: { h: 'home_fouls', a: 'away_fouls' },
      'Yellow Cards': { h: 'home_yellows', a: 'away_yellows' },
      'Red Cards': { h: 'home_reds', a: 'away_reds' },
    };
    return statStrings[label];
  };

  const valueUp = {
    h: fixture[getStatName(label).h] + 1,
    a: fixture[getStatName(label).a] + 1,
  };
  const valueDown = {
    h: fixture[getStatName(label).h] - 1,
    a: fixture[getStatName(label).a] - 1,
  };

  return (
    <tr>
      <th>{label}</th>
      <td>
        <button
          onClick={() => updateStats(getStatName(label).h, valueDown.h, id)}
        >
          -
        </button>
      </td>
      <td>{fixture[getStatName(label).h]}</td>
      <td>
        <button
          onClick={() => updateStats(getStatName(label).h, valueUp.h, id)}
        >
          +
        </button>
      </td>
      <td>
        <button
          onClick={() => updateStats(getStatName(label).a, valueDown.a, id)}
        >
          -
        </button>
      </td>
      <td>{fixture[getStatName(label).a]}</td>
      <td>
        <button
          onClick={() => updateStats(getStatName(label).a, valueUp.a, id)}
        >
          +
        </button>
      </td>
    </tr>
  );
};

export default ConsoleRow;
