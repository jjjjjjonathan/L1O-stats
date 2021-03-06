import classNames from 'classnames';
import { useState } from 'react';

const RosterListItem = ({
  name,
  value,
  roster,
  setStartingXI,
  startingXI,
  goalkeeper,
  setGoalkeeper
}) => {
  const [selected, setSelected] = useState(false);

  const cardClasses = classNames('card w-full shadow-xl', {
    'bg-base-200 shadow-neutral-focus': selected
  });

  const extraInfoClasses = classNames('card-actions flex-col', {
    invisible: !selected,
    visible: selected
  });

  return (
    <div className={cardClasses}>
      <div className={classNames('card-body', { 'pt-5': selected })}>
        {selected ? (
          <input
            className='input input-ghost card-title text-primary p-0'
            type='text'
            defaultValue={name}
            onChange={(e) => {
              setStartingXI((prev) =>
                prev.map((player) =>
                  player.id === value
                    ? { ...player, name: e.target.value }
                    : player
                )
              );
            }}
          />
        ) : (
          <h2 className='card-title'>{name}</h2>
        )}

        <div className='flex flex-row'>
          <label htmlFor=''>Starter?</label>

          <input
            className='toggle toggle-primary mx-2'
            disabled={
              startingXI.filter((player) => player.id === value).length <= 0 &&
              startingXI.length >= 11
            }
            type='checkbox'
            value={value}
            onClick={(e) => {
              const clickedId = parseInt(e.target.value, 10);
              if (
                e.target.checked &&
                startingXI.filter((player) => player.id === clickedId).length <=
                  0
              ) {
                setStartingXI((prev) => {
                  return [
                    ...prev,
                    roster.find((player) => player.id === clickedId)
                  ];
                });
                setSelected(true);
              }
              if (
                !e.target.checked &&
                startingXI.filter((player) => player.id === clickedId).length >
                  0
              ) {
                setStartingXI((prev) => {
                  return prev.filter((player) => player.id !== clickedId);
                });
                setSelected(false);
              }
            }}
          />
        </div>
        <div className={extraInfoClasses}>
          <div className='flex flex-row'>
            <label htmlFor=''>Check if goalkeeper</label>
            <input
              name='gk-radio'
              className='radio radio-primary mx-2'
              type='radio'
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
          <div>
            <label htmlFor=''>Shirt number:</label>
            <input
              type='text'
              className='input input-bordered input-primary w-16 h-12 text-center mx-2'
              onChange={(e) => {
                const newNumber = parseInt(e.target.value, 10);
                setStartingXI((prev) =>
                  prev.map((player) =>
                    player.id === value
                      ? { ...player, number: newNumber }
                      : player
                  )
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RosterListItem;
