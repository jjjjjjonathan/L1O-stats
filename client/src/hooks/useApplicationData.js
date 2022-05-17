import { useReducer, useEffect } from 'react';
import axios from 'axios';

const useApplicationData = () => {
  console.log(axios);
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
    },

    'UPDATE_FIXTURE'(state, action) {
      return {
        ...state,
        fixtures: state.fixtures.map(fixture => fixture.id === action.content.id ? action.content : fixture)
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

  const setApplicationData = async () => {
    try {
      const [divisions, teams, fixtures] = await Promise.all([
        axios.get('/api/divisions'),
        axios.get('/api/teams'),
        axios.get('/api/fixtures')
      ]);
      dispatch({ type: 'SET_APPLICATION_DATA', divisions, teams, fixtures });
    }
    catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setApplicationData();
  }, []);

  return { state, dispatch };
};

export default useApplicationData;