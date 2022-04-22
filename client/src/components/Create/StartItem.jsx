const StartItem = ({ value, name, setSelectedDivision }) => {
  return (
    <button value={value} onClick={() => setSelectedDivision(value)}>
      {name}
    </button>
  );
};

export default StartItem;
