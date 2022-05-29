import useGraphicGenerator from '../../hooks/useGraphicGenerator';
import { useState } from 'react';

const LineupCanvas = ({ startingXI, goalkeeper, teamName, graphicColour }) => {
  const { graphicGenerator, graphic, altText, uploadError } = useGraphicGenerator(3);

  const [checked, setChecked] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div className='flex flex-col xl:w-1/4 h-full justify-items-center'>


      <label htmlFor='' className='block mb-2 text-md font-medium text-gray-900 dark:text-gray-300'>Generate lineup graphic</label>
      <input
        className='block w-full text-sm text-gray-900 bg-gray-500 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:btn file:btn-accent file:font-medium hover:file:btn-secondary'
        type='file'
        id='lineupFileInput'
        onChange={(e) => {
          e.preventDefault();
          if (graphicGenerator.validate(startingXI, e.target.files[0].type)) {
            const updatedXI = startingXI
              .map((player) =>
                player.id === goalkeeper
                  ? { ...player, isGoalkeeper: true }
                  : player
              )
              .sort(graphicGenerator.prioritySort);
            graphicGenerator.generateGraphic(
              e.target.files[0],
              updatedXI,
              teamName,
              graphicColour
            );
            setChecked(true);
            setCopied(false);
          }
        }}
      />

      {uploadError.length > 0 && <p className='text-red-600'>{uploadError}</p>}
      {graphic.length > 0 && checked && (
        <>
          <label htmlFor="my-modal-3" className="btn modal-button hidden">open modal</label>

          <input type="checkbox" id="my-modal-3" className="modal-toggle" defaultChecked onChange={(e) => setChecked(e.target.checked)} />
          <div className="modal">
            <div className="modal-box relative">
              <h3 className="text-md font-bold pb-3">Save the image below. Then press the button to copy the alt-text onto your clipboard so you can put in the Twitter image descrpition for screen readers and accessibility.</h3>
              <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
              <img src={graphic} alt={altText} />
              <div className="modal-action">
                <button className='btn btn-primary' onClick={() => setCopied(true)}>{copied ? 'You\'ve Copied!' : 'Copy to Clipboard'}</button>
              </div>
            </div>
          </div>
        </>)}
      {altText.length > 0 && <textarea value={altText} readOnly={true} className='textarea textarea-accent hidden' />}
    </div>
  );
};

export default LineupCanvas;
