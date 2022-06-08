import useGraphicGenerator from '../../hooks/useGraphicGenerator';
import { useState, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';
import { HiSave } from 'react-icons/hi';

const LineupCanvas = ({ startingXI, goalkeeper, teamName, graphicColour }) => {
  const { graphicGenerator, graphic, altText, uploadError } =
    useGraphicGenerator(3);

  const inputRef = useRef(null);

  const [checked, setChecked] = useState(false);
  const [copied, setCopied] = useState(false);

  const stickyButtonClasses = classNames(
    'btn btn-circle btn-accent animate-bounce',
    {
      hidden: startingXI.length < 11 || goalkeeper === null
    }
  );

  const onBtnClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  return (
    <div className='flex flex-col xl:w-1/4 h-full justify-items-center'>
      <div className='fixed bottom-8 right-8'>
        <button className={stickyButtonClasses} onClick={onBtnClick}>
          <HiSave size={24} />
        </button>
        <input
          type='file'
          className='hidden'
          ref={inputRef}
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
      </div>

      {uploadError.length > 0 && <p className='text-red-600'>{uploadError}</p>}
      {graphic.length > 0 && checked && (
        <>
          <label htmlFor='my-modal-3' className='btn modal-button hidden'>
            open modal
          </label>

          <input
            type='checkbox'
            id='my-modal-3'
            className='modal-toggle'
            defaultChecked
            onChange={(e) => setChecked(e.target.checked)}
          />
          <div className='modal'>
            <div className='modal-box relative'>
              <h3 className='text-md font-bold pb-3'>
                Save the image below. Then press the button to copy the alt-text
                onto your clipboard so you can put in the Twitter image
                descrpition for screen readers and accessibility.
              </h3>
              <label
                htmlFor='my-modal-3'
                className='btn btn-sm btn-circle absolute right-2 top-2'
              >
                ✕
              </label>
              <img src={graphic} alt={altText} />
              <div className='modal-action'>
                <CopyToClipboard text={altText} onCopy={() => setCopied(true)}>
                  <button className='btn btn-primary'>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </>
      )}
      {altText.length > 0 && (
        <textarea
          value={altText}
          readOnly={true}
          className='textarea textarea-accent hidden'
        />
      )}
    </div>
  );
};

export default LineupCanvas;
