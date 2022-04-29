import { useState } from 'react';

const RosterListItem = ({
  name,
  value,
  roster,
  setStartingXI,
  startingXI,
  goalkeeper,
  setGoalkeeper,
}) => {
  const [errorMsg, setErrorMsg] = useState('');

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
        {startingXI.filter((player) => player.id === value).length > 0 && (
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
        {startingXI.filter((player) => player.id === value).length > 0 && (
          <>
            <label htmlFor="">#?</label>
            <input
              placeholder={errorMsg}
              type="number"
              onChange={(e) => {
                const newNumber = parseInt(e.target.value, 10);
                if (Number.isInteger(newNumber)) {
                  setErrorMsg('');
                  setStartingXI((prev) =>
                    prev.map((player) =>
                      player.id === value
                        ? { ...player, number: newNumber }
                        : player
                    )
                  );
                } else {
                  setErrorMsg('Cannot have a blank number');
                }
              }}
            />
          </>
        )}
      </td>
      <td>{name}</td>
    </tr>
  );
};

export default RosterListItem;
