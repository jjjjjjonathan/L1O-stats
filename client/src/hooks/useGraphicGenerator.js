import axios from 'axios';
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
    1: {
      url: '/api/fixtures/score',
      xAxis: -15,
      text: 'Half-time',
      generateGraphic: async function (upload, hScore, aScore, hName, aName) {
        try {
          let Base64 = await generateString(upload);
          const { data } = await axios.put(this.url, {
            Base64,
            text: this.text,
            hScore,
            aScore,
            hName,
            aName,
            xAxis: this.xAxis
          });
          setGraphic(data.newBase64);
          setAltText(data.altText);
        }
        catch (err) {
          console.error(err);
        }
      },
      validate: function (fileType) {
        if (!acceptedImageTypes.includes(fileType)) {
          setUploadError('not an accepted image type');
          return false;
        }
        setUploadError('');
        return true;
      }
    },
    2: {
      url: '/api/fixtures/score',
      xAxis: -5,
      text: 'Full-time',
      generateGraphic: async function (upload, hScore, aScore, hName, aName) {
        try {
          let Base64 = await generateString(upload);
          const { data } = await axios.put(this.url, {
            Base64,
            text: this.text,
            hScore,
            aScore,
            hName,
            aName,
            xAxis: this.xAxis
          });
          setGraphic(data.newBase64);
          setAltText(data.altText);
        }
        catch (err) {
          console.error(err);
        }
      },
      validate: function (fileType) {
        if (!acceptedImageTypes.includes(fileType)) {
          setUploadError('not an accepted image type');
          return false;
        }
        setUploadError('');
        return true;
      }
    },
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
        try {
          let Base64 = await generateString(upload);
          const { data } = await axios.put(this.url, { Base64, updatedXI, teamName });
          setGraphic(data.newBase64);
          setAltText(data.altText);
        }
        catch (err) {
          console.error(err);
        }
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
