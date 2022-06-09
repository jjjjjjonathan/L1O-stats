import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './components/Create';
import useApplicationData from './hooks/useApplicationData';
import List from './components/List';
import Fixture from './components/Fixture';
import Navbar from './components/Navbar';
import Lineups from './components/Lineups';
import Footer from './components/Footer';
import { useState, useEffect, createContext } from 'react';

export const DispatchContext = createContext();
export const AlertContext = createContext();
export const UserContext = createContext();
export const SetUserContext = createContext();

function App() {
  const { state, dispatch } = useApplicationData();

  const [alert, setAlert] = useState({
    type: null,
    msg: ''
  });

  const [user, setUser] = useState(null);

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

  useEffect(() => {
    if (alert.type) {
      setTimeout(() => {
        setAlert((prev) => {
          return {
            ...prev,
            type: null
          };
        });
      }, 4000);
    }
  }, [alert]);

  return state.isReady ? (
    <div
      data-theme={visualMode}
      className='min-h-screen flex flex-col justify-between bg-base-300'
    >
      <div>
        <Router>
          <UserContext.Provider value={user}>
            <SetUserContext.Provider value={setUser}>
              <DispatchContext.Provider value={dispatch}>
                <AlertContext.Provider value={setAlert}>
                  <Navbar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    alert={alert}
                  />
                  <div className='mx-auto'>
                    <Routes>
                      <Route
                        exact
                        path='/'
                        element={
                          <List
                            fixtures={state.fixtures}
                            teams={state.teams}
                            divisions={state.divisions}
                          />
                        }
                      />
                      <Route
                        path='/create'
                        element={
                          <Create
                            divisions={state.divisions}
                            teams={state.teams}
                          />
                        }
                      />

                      <Route
                        path='/lineups'
                        element={
                          <Lineups
                            divisions={state.divisions}
                            teams={state.teams}
                          />
                        }
                      />

                      <Route
                        path='/:id'
                        element={
                          <Fixture
                            divisions={state.divisions}
                            teams={state.teams}
                            fixtures={state.fixtures}
                          />
                        }
                      />
                    </Routes>
                  </div>
                </AlertContext.Provider>
              </DispatchContext.Provider>
            </SetUserContext.Provider>
          </UserContext.Provider>
        </Router>
      </div>
      <Footer />
    </div>
  ) : (
    <p>Loading</p>
  );
}

export default App;
