import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Create from './components/Create';
import useApplicationData from './hooks/useApplicationData';
import List from './components/List';
import Fixture from './components/Fixture';
import Navbar from './components/Navbar';
import Lineups from './components/Lineups';
import { useState } from 'react';

function App() {
  const { state, dispatch } = useApplicationData();
  const [darkMode, setDarkMode] = useState(false);
  const visualMode = darkMode ? 'night' : 'winter';
  return state.isReady ? (
    <div data-theme={visualMode} className='h-screen'>
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="mx-auto">
          <Switch>
            <Route path="/create">
              <Create
                divisions={state.divisions}
                teams={state.teams}
                dispatch={dispatch}
              />
            </Route>
            <Route path="/lineups">
              <Lineups divisions={state.divisions} teams={state.teams} />
            </Route>
            <Route path="/:id">
              <Fixture
                divisions={state.divisions}
                teams={state.teams}
                fixtures={state.fixtures}
                dispatch={dispatch}
              />
            </Route>
            <Route path="/">
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
  ) : (
    <p>Loading</p>
  );
}

export default App;
