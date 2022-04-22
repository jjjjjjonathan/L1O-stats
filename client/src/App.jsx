import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import useApplicationData from './hooks/useApplicationData';
import List from './components/List';

function App() {
  const { state } = useApplicationData();
  return state.isReady ? (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/fixtures">
            <List />
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
