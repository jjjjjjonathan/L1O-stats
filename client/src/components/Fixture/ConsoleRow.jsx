import classNames from 'classnames';

const ConsoleRow = ({ fixture, label, id, validate }) => {
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

  const valueUpClassesBtn = classNames(
    'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'
  );

  const valueUpClassesSpan = classNames(
    'relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'
  );

  const valueDownClassesBtn = classNames(
    'relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800'
  );

  const valueDownClassesSpan = classNames(
    'relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'
  );

  return (
    <tr>
      <th className="px-6 py-0">{label}</th>
      <td className="px-6 py-0">
        <button
          onClick={() => validate(getStatName(label).h, valueDown.h, id)}
          className={valueDownClassesBtn}
        >
          <span className={valueDownClassesSpan}>-</span>
        </button>
      </td>
      <td className="px-6 py-0 text-center">{fixture[getStatName(label).h]}</td>
      <td className="px-6 py-0">
        <button
          onClick={() => validate(getStatName(label).h, valueUp.h, id)}
          className={valueUpClassesBtn}
        >
          <span className={valueUpClassesSpan}>+</span>
        </button>
      </td>
      <td className="px-6 py-0">
        <button
          onClick={() => validate(getStatName(label).a, valueDown.a, id)}
          className={valueDownClassesBtn}
        >
          <span className={valueDownClassesSpan}>-</span>
        </button>
      </td>
      <td className="px-6 py-2 text-center">{fixture[getStatName(label).a]}</td>
      <td className="px-6 py-0">
        <button
          onClick={() => validate(getStatName(label).a, valueUp.a, id)}
          className={valueUpClassesBtn}
        >
          <span className={valueUpClassesSpan}>+</span>
        </button>
      </td>
    </tr>
  );
};

export default ConsoleRow;
