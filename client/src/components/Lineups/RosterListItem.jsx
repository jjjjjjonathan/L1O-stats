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
    <tr>
      <td>
        <input
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
      </td>
      <td>
        {startingXI.includes(value) && (
          <>
            <label htmlFor="">gk?</label>
            <input
              disabled={goalkeeper !== null && goalkeeper !== value}
              type="checkbox"
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
          </>
        )}
      </td>
      <td>
        {startingXI.includes(value) && (
          <>
            <label htmlFor="">#?</label>
            <input type="number" />
          </>
        )}
      </td>
      <td>{name}</td>
    </tr>
  );
};

export default RosterListItem;
