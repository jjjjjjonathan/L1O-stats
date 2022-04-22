const StartItem = ({ value, name, pickDivision }) => {
  return (
    <button value={value} onClick={() => pickDivision(value)}>
      {name}
    </button>
  );
};

export default StartItem;
