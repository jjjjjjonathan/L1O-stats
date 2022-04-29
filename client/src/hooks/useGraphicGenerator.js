import { useState } from 'react';

const useGraphicGenerator = (mode) => {
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
      url: '/api/teams/lineup'
    }
  };
  return { url: graphicModes[mode], graphic, altText, uploadError };
};

export default useGraphicGenerator;
