import { useState } from 'react';
import useVisualMode from '../../hooks/useVisualMode';
import Start from './Start';

const Create = ({ divisions, teams }) => {
  const { mode, transition } = useVisualMode('START');

  const mensTeams = teams.filter((team) => team.mens);
  const womensTeams = teams.filter((team) => team.womens);

  const [formData, setFormData] = useState({});
  const [selectedDivision, setSelectedDivision] = useState(null);

  return (
    <>
      {mode === 'START' && (
        <Start
          divisions={divisions}
          setSelectedDivision={setSelectedDivision}
        />
      )}
    </>
  );
};

export default Create;
