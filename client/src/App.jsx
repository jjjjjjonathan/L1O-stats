import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Create from './components/Create';
import useApplicationData from './hooks/useApplicationData';
import List from './components/List';
import Fixture from './components/Fixture';
import Navbar from './components/Navbar';
import Lineups from './components/Lineups';

function App() {
  const { state, dispatch } = useApplicationData();
  return state.isReady ? (
    <div className="min-h-screen flex-grow bg-gray-300 font-sans font-semibold">
      <Router>
        <Navbar />
        <div className="min-h-screen">
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
    <></>
  );
}

export default App;
