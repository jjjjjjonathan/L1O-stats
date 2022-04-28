import { useState } from 'react';
import axios from 'axios';

const SocialCanvas = ({ stats, text, xAxis }) => {
  const [uploadError, setUploadError] = useState('');
  const [altText, setAltText] = useState('');
  const acceptedImageTypes = ['image/jpeg', 'image/png'];
  const [graphic, setGraphic] = useState('');

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

  const generateGraphic = async (upload, text) => {
    let Base64 = await generateString(upload);
    const { data } = await axios.put('/api/fixtures/score', {
      Base64,
      text,
      hScore: stats.h.goals.toString(),
      aScore: stats.a.goals.toString(),
      hName: stats.h.name,
      aName: stats.a.name,
      xAxis,
    });
    setGraphic(data.newBase64);
    setAltText(data.altText);
  };

  return (
    <>
      <h1>Social media graphic generator: {text}</h1>
      <div className="mx-auto mt-5 w-96">
        <label htmlFor="">Select image</label>
        <input
          type="file"
          id="imageFileInput"
          onChange={(e) => {
            e.preventDefault();
            if (acceptedImageTypes.includes(e.target.files[0].type)) {
              setUploadError('');
              generateGraphic(e.target.files[0], text);
            } else {
              setUploadError('not an accepted file type');
            }
          }}
        />
        {graphic.length > 0 && <img src={graphic} alt={altText} />}
        {altText.length > 0 && <textarea value={altText} readOnly={true} />}
        {uploadError && <p className="text-red-600">{uploadError}</p>}
      </div>
    </>
  );
};

export default SocialCanvas;
