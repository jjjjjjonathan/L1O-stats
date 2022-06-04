import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Create from './components/Create';
import useApplicationData from './hooks/useApplicationData';
import List from './components/List';
import Fixture from './components/Fixture';
import Navbar from './components/Navbar';
import Lineups from './components/Lineups';
import { useState, useEffect, createContext } from 'react';

function App() {
  const { state, dispatch } = useApplicationData();
  const DispatchContext = createContext(dispatch);
  const checkPreferredMode = () => {
    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };

  const lastSelectedMode = JSON.parse(localStorage.getItem('DARK_MODE'));
  const [darkMode, setDarkMode] = useState(
    lastSelectedMode !== null ? lastSelectedMode : checkPreferredMode()
  );

  const visualMode = darkMode ? 'night' : 'winter';

  useEffect(() => {
    localStorage.setItem('DARK_MODE', darkMode);
  }, [darkMode]);

  return state.isReady ? (
    <DispatchContext.Provider value={dispatch}>
      <div
        data-theme={visualMode}
        className='min-h-screen flex flex-col justify-between bg-base-300'
      >
        <div>
          <Router>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className='mx-auto'>
              <Switch>
                <Route path='/create'>
                  <Create
                    divisions={state.divisions}
                    teams={state.teams}
                    dispatch={dispatch}
                  />
                </Route>
                <Route path='/lineups'>
                  <Lineups divisions={state.divisions} teams={state.teams} />
                </Route>
                <Route path='/:id'>
                  <Fixture
                    divisions={state.divisions}
                    teams={state.teams}
                    fixtures={state.fixtures}
                    dispatch={dispatch}
                  />
                </Route>
                <Route path='/'>
                  <List
                    fixtures={state.fixtures}
                    teams={state.teams}
                    divisions={state.divisions}
                  />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
        <div>Footer goes here</div>
      </div>
    </DispatchContext.Provider>
  ) : (
    <p>Loading</p>
  );
}

export default App;
