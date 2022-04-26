import { useEffect, useState } from 'react';

const SocialCanvas = ({ finalStats }) => {
  const [upload, setUpload] = useState(null);

  // useEffect to check if image is uploaded
  useEffect(() => {
    let image;
    if (upload) {
      const imageDataUrl = URL.createObjectURL(upload);
      image = new Image(1620, 1620);
      image.src = imageDataUrl;
      let div = document.querySelector('#graphic');
      div.appendChild(image);
    }
  }, [upload]);

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
        {upload && <section id="graphic"></section>}
      </div>
    </>
  );
};

export default SocialCanvas;
