import { useState } from 'react';
import axios from 'axios';
import useGraphicGenerator from '../../hooks/useGraphicGenerator';

const LineupCanvas = ({ startingXI, goalkeeper, teamName }) => {
  const acceptedImageTypes = ['image/jpeg', 'image/png'];
  const [uploadError, setUploadError] = useState('');
  const [graphic, setGraphic] = useState('');
  const [altText, setAltText] = useState('');
  const generateString = (upload) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(upload);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  };

  // TURN CANVAS INTO CUSTOM HOOK :)

  const prioritySort = (a, b) => {
    if (a.isGoalkeeper) {
      return -1;
    } else if (b.isGoalkeeper) {
      return 1;
    } else {
      return a.number - b.number;
    }
  };

  const generateLineupGraphic = async (upload, updatedXI) => {
    let Base64 = await generateString(upload);
    const { data } = await axios.put('/api/teams/lineup', {
      Base64,
      updatedXI,
      teamName,
    });
    setGraphic(data.newBase64);
    setAltText(data.altText);
  };
  return (
    <>
      <h1>Lineup graphic generator</h1>
      <div className='mx-auto mt-5 w-96'>
        <label htmlFor=''>Select image</label>
        <input
          type='file'
          id='lineupFileInput'
          onChange={(e) => {
            e.preventDefault();
            if (startingXI.length !== 11) {
              setUploadError('need 11 starters');
              return;
            }
            if (acceptedImageTypes.includes(e.target.files[0].type)) {
              setUploadError('');
              const updatedXI = startingXI
                .map((player) =>
                  player.id === goalkeeper
                    ? { ...player, isGoalkeeper: true }
                    : player
                )
                .sort(prioritySort);
              generateLineupGraphic(e.target.files[0], updatedXI);
            } else {
              setUploadError('not an accepted file type');
            }
          }}
        />
      </div>
      {uploadError.length > 0 && <p className='text-red-600'>{uploadError}</p>}
      {graphic.length > 0 && <img src={graphic} alt={altText} />}
      {altText.length > 0 && <textarea value={altText} readOnly={true} />}
    </>
  );
};

export default LineupCanvas;
