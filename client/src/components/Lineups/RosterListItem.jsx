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
    'bg-base-100': !selected,
    'border-primary': selected
  });

  const cardFontClasses = classNames('card-body', {
    'text-neutral-content': selected,
    'hover:bg-base-200': !selected,
    'hover:bg-neutral-focus': selected
  });

  const extraInfoClasses = classNames('card-actions justify-between', {
    invisible: !selected,
    visible: selected
  });

  return (
    <div className={cardClasses}>
      <div className={cardFontClasses}>
        <h2 className='card-title'>{name}</h2>

        <div className='flex flex-row'>
          <label htmlFor=''>Starter?</label>

          <input
            className='toggle toggle-secondary'
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
          <input
            name='gk-radio'
            className='radio radio-accent'
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
          <input
            type='text'
            className='input input-bordered input-accent w-16 h-12 text-center'
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
    // <tr className="hover">
    //   <td className="h-[75px]">
    //     <div className="flex justify-center items-center py-5">
    // <input
    //   className='toggle toggle-secondary'
    //   disabled={
    //     startingXI.filter((player) => player.id === value).length <= 0 &&
    //     startingXI.length >= 11
    //   }
    //   type="checkbox"
    //   value={value}
    //   onClick={(e) => {
    //     const clickedId = parseInt(e.target.value, 10);
    //     if (
    //       e.target.checked &&
    //       startingXI.filter((player) => player.id === clickedId).length <= 0
    //     ) {
    //       setStartingXI((prev) => {
    //         return [
    //           ...prev,
    //           roster.find((player) => player.id === clickedId),
    //         ];
    //       });
    //       setSelected(true);
    //     }
    //     if (
    //       !e.target.checked &&
    //       startingXI.filter((player) => player.id === clickedId).length > 0
    //     ) {
    //       setStartingXI((prev) => {
    //         return prev.filter((player) => player.id !== clickedId);
    //       });
    //       setSelected(false);
    //     }
    //   }}
    // />
    //     </div>
    //   </td>
    //   <td>
    //     <div className={midTableClasses}>
    // <input
    //   name='gk-radio'
    //   className='radio radio-accent'
    //   type="radio"
    //   value={value}
    //   onClick={(e) => {
    //     const clickedId = parseInt(e.target.value, 10);
    //     if (e.target.checked && goalkeeper !== clickedId) {
    //       setGoalkeeper(clickedId);
    //     }
    //     if (!e.target.checked && goalkeeper === clickedId) {
    //       setGoalkeeper(null);
    //     }
    //   }}
    // />
    //     </div>
    //   </td>
    //   <td>

    //     <div className={midTableClasses}>
    //       <input
    //         type="text"
    //         className='input input-bordered input-accent w-16 h-12 text-center'
    //         onChange={(e) => {
    //           const newNumber = parseInt(e.target.value, 10);
    //           setStartingXI((prev) =>
    //             prev.map((player) =>
    //               player.id === value
    //                 ? { ...player, number: newNumber }
    //                 : player));
    //         }}
    //       />
    //     </div>

    //   </td>
    //   <td className="w-sm md:w-md whitespace-normal">
    //     {name}
    //   </td>
    // </tr>
  );
};

export default RosterListItem;
