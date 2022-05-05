import axios from 'axios';
import { useState } from 'react';

const useGraphicGenerator = (mode, teamName) => {
  const acceptedImageTypes = ['image/jpeg', 'image/png'];
  const [graphic, setGraphic] = useState('');
  const [altText, setAltText] = useState('');
  const [uploadError, setUploadError] = useState('');
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
  const graphicModes = {
    3: {
      url: '/api/teams/lineup',
      prioritySort: function (a, b) {
        if (a.isGoalkeeper) {
          return -1;
        }
        if (b.isGoalkeeper) {
          return 1;
        }
        return a.number - b.number;
      },
      generateGraphic: async function (upload, updatedXI, teamName) {
        let Base64 = await generateString(upload);
        const { data } = await axios.put(this.url, { Base64, updatedXI, teamName });
        setGraphic(data.newBase64);
        setAltText(data.altText);
      },
      validate: function (startingXI, uploadType) {
        if (startingXI.length !== 11) {
          setUploadError('need 11 starters');
          return false;
        }
        if (!acceptedImageTypes.includes(uploadType)) {
          setUploadError('not an accepted file type');
          return false;
        }
        setUploadError('');
        return true;
      }
    }
  };
  return { graphicGenerator: graphicModes[mode], graphic, altText, uploadError };
};

export default useGraphicGenerator;
