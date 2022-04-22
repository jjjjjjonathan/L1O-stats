import { useReducer, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  const reducers = {
    'SET_APPLICATION_DATA'(state, action) {
      return {
        ...state,
        divisions: action.divisions.data,
        teams: action.teams.data,
        fixtures: action.fixtures.data,
        isReady: true
      };
    },

    'CREATE_FIXTURE'(state, action) {
      return {
        ...state,
        fixtures: [...state.fixtures, action.content]
      };
    }
  };
  const reducer = (state, action) => reducers[action.type](state, action) || state;
  const initState = {
    divisions: [],
    teams: [],
    fixtures: [],
    isReady: false
  };
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    Promise.all([
      axios.get('/api/divisions'),
      axios.get('/api/teams'),
      axios.get('/api/fixtures')
    ]).then(all => {
      const [divisions, teams, fixtures] = all;
      dispatch({ type: 'SET_APPLICATION_DATA', divisions, teams, fixtures });
    });
  }, []);

  return { state, dispatch };
};

export default useApplicationData;