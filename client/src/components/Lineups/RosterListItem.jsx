const RosterListItem = ({
  name,
  value,
  roster,
  setStartingXI,
  startingXI,
  goalkeeper,
  setGoalkeeper,
}) => {

  return (
    <tr className="hover:bg-base-300">
      <td className="h-[75px]">
        <div className="flex justify-center items-center py-5">
          <input
            className='toggle toggle-secondary'
            disabled={
              startingXI.filter((player) => player.id === value).length <= 0 &&
              startingXI.length >= 11
            }
            type="checkbox"
            value={value}
            onClick={(e) => {
              const clickedId = parseInt(e.target.value, 10);
              if (
                e.target.checked &&
                startingXI.filter((player) => player.id === clickedId).length <= 0
              ) {
                setStartingXI((prev) => {
                  return [
                    ...prev,
                    roster.find((player) => player.id === clickedId),
                  ];
                });
              }
              if (
                !e.target.checked &&
                startingXI.filter((player) => player.id === clickedId).length > 0
              ) {
                setStartingXI((prev) => {
                  return prev.filter((player) => player.id !== clickedId);
                });
              }
            }}
          />
        </div>
      </td>
      <td>
        {startingXI.filter((player) => player.id === value).length > 0 ? (
          <div className="flex justify-center items-center">
            <input
              name='gk-radio'
              className='radio radio-accent'
              type="radio"
              value={value}
              onClick={(e) => {
                const clickedId = parseInt(e.target.value, 10);
                if (e.target.checked && goalkeeper !== clickedId) {
                  setGoalkeeper(clickedId);
                }
                if (!e.target.checked && goalkeeper === clickedId) {
                  setGoalkeeper(null);
                }
              }}
            />
          </div>
        ) : <div className="w-full"></div>}
      </td>
      <td>
        {startingXI.filter((player) => player.id === value).length > 0 && (
          <div className="flex justify-center items-center">
            <input
              type="text"
              className='input input-bordered input-accent w-16 h-12 text-center'
              onChange={(e) => {
                const newNumber = parseInt(e.target.value, 10);
                setStartingXI((prev) =>
                  prev.map((player) =>
                    player.id === value
                      ? { ...player, number: newNumber }
                      : player));
              }}
            />
          </div>
        )}
      </td>
      <td>{name}</td>
    </tr>
  );
};

export default RosterListItem;
