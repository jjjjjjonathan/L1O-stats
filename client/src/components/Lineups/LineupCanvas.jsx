import useGraphicGenerator from '../../hooks/useGraphicGenerator';

const LineupCanvas = ({ startingXI, goalkeeper, teamName, graphicColour }) => {
  const { graphicGenerator, graphic, altText, uploadError } =
    useGraphicGenerator(3);
  return (
    <div className='flex flex-col xl:w-1/4 h-full justify-items-center'>


      <label htmlFor='' className='block mb-2 text-md font-medium text-gray-900 dark:text-gray-300'>Generate lineup graphic</label>
      <input
        className='block w-full text-sm text-gray-900 bg-gray-500 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:btn file:btn-accent file:font-medium hover:file:btn-secondary'
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

      {uploadError.length > 0 && <p className='text-red-600'>{uploadError}</p>}
      {graphic.length > 0 && <img src={graphic} alt={altText} className='h-96 w-96 mx-auto' />}
      {altText.length > 0 && <textarea value={altText} readOnly={true} className='textarea textarea-accent' />}
    </div>
  );
};

export default LineupCanvas;
