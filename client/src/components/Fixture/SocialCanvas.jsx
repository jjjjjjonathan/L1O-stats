import { useEffect, useState } from 'react';

const SocialCanvas = ({ finalStats }) => {
  const [upload, setUpload] = useState(null);
  const [graphic, setGraphic] = useState(null);

  // useEffect to check if image is uploaded
  useEffect(() => {
    let image;
    if (upload) {
      const imageDataUrl = URL.createObjectURL(upload);
      image = new Image();
      image.src = imageDataUrl;
      console.log(image.src);
      setGraphic(image);
    }
  }, [upload]);

  useEffect(() => {
    if (graphic) console.log(graphic.height, graphic.width);
  }, [graphic]);

  return (
    <>
      <h1>Social media graphic generator</h1>
      <div className="mx-auto my-5 w-96">
        <label htmlFor="">Select image</label>
        <input
          type="file"
          id="imageFileInput"
          onChange={(e) => {
            e.preventDefault();
            setUpload(e.target.files[0]);
          }}
        />
        <canvas id="graphic-generator"></canvas>
      </div>
    </>
  );
};

export default SocialCanvas;
