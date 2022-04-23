import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import useApplicationData from './hooks/useApplicationData';
import List from './components/List';
import Fixture from './components/Fixture';

function App() {
  const { state, dispatch } = useApplicationData();
  return state.isReady ? (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/create">
            <Create
              divisions={state.divisions}
              teams={state.teams}
              dispatch={dispatch}
            />
          </Route>
          <Route path="/fixtures/:id">
            <Fixture
              divisions={state.divisions}
              teams={state.teams}
              fixtures={state.fixtures}
              dispatch={dispatch}
            />
          </Route>
          <Route path="/fixtures">
            <List
              fixtures={state.fixtures}
              teams={state.teams}
              divisions={state.divisions}
            />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  ) : (
    <></>
  );
}

export default App;
