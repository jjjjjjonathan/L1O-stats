import useGraphicGenerator from '../../hooks/useGraphicGenerator';

const LineupCanvas = ({ startingXI, goalkeeper, teamName, graphicColour }) => {
  const { graphicGenerator, graphic, altText, uploadError } =
    useGraphicGenerator(3);
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
            if (graphicGenerator.validate(startingXI, e.target.files[0].type)) {
              const updatedXI = startingXI
                .map((player) =>
                  player.id === goalkeeper
                    ? { ...player, isGoalkeeper: true }
                    : player
                )
                .sort(graphicGenerator.prioritySort);
              graphicGenerator.generateGraphic(
                e.target.files[0],
                updatedXI,
                teamName,
                graphicColour
              );
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
