import { useState } from 'react';
import axios from 'axios';

const SocialCanvas = ({ stats, text }) => {
  const [uploadError, setUploadError] = useState('');
  const acceptedImageTypes = ['image/jpeg', 'image/png'];

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
    });
    let image = new Image(1620, 1620);
    image.src = data;
    let section = document.querySelector('#graphic');
    section.replaceChildren(image);
  };

  return (
    <>
      <h1>Social media graphic generator</h1>
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
        <section id="graphic"></section>
        {uploadError && <p className="text-red-600">{uploadError}</p>}
      </div>
    </>
  );
};

export default SocialCanvas;
