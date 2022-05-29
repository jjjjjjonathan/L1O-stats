import useGraphicGenerator from '../../hooks/useGraphicGenerator';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const SocialCanvas = ({ stats, graphicMode }) => {
  const { graphicGenerator, graphic, altText, uploadError } = useGraphicGenerator(graphicMode);

  const [checked, setChecked] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div className='mx-6'>
      <label htmlFor='' className='block mb-2 text-md font-medium text-content'>Generate {graphicGenerator.text} Graphic</label>
      <input
        className='w-full text-sm text-content bg-base-300 rounded-lg border border-content cursor-pointer  focus:outline-none file:btn file:btn-accent file:font-medium hover:file:btn-secondary'
        type='file'
        id='imageFileInput'
        onChange={(e) => {
          e.preventDefault();
          if (graphicGenerator.validate(e.target.files[0].type)) {
            graphicGenerator.generateGraphic(
              e.target.files[0],
              stats.h.goals.toString(),
              stats.a.goals.toString(),
              stats.h.name,
              stats.a.name
            );
            setChecked(true);
            setCopied(false);
          }
        }}
      />
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
                <CopyToClipboard text={altText} onCopy={() => setCopied(true)}>
                  <button className="btn btn-primary">{copied ? 'Copied!' : 'Copy'}</button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </>

      )}
      {uploadError && <p className='text-red-600'>{uploadError}</p>}
    </div>
  );
};

export default SocialCanvas;
