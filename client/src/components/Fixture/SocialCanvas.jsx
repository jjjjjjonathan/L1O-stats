import useGraphicGenerator from '../../hooks/useGraphicGenerator';

const SocialCanvas = ({ stats, graphicMode }) => {
  const { graphicGenerator, graphic, altText, uploadError } =
    useGraphicGenerator(graphicMode);

  return (
    <>
      <h1>Social media graphic generator: {graphicGenerator.text}</h1>
      <div className='mx-auto mt-5 w-96'>
        <label htmlFor=''>Select image</label>
        <input
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
            }
          }}
        />
        {graphic.length > 0 && <img src={graphic} alt={altText} />}
        {altText.length > 0 && <textarea value={altText} readOnly={true} />}
        {uploadError && <p className='text-red-600'>{uploadError}</p>}
      </div>
    </>
  );
};

export default SocialCanvas;
