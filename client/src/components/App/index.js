import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { getTheme, setTheme } from "../../utils/theme";
import { useAuth } from '../../hooks/auth.hook';
import SignupPage from '../../pages/SignupPage';
import SigninPage from '../../pages/SigninPage';
import TasksPage from '../../pages/TasksPage';
import MainLoader from '../MainLoader/MainLoader';
import './styles.css';

function App() {
  const { userId, token, login, logout, ready, isAuthenticated } = useAuth();
  const [theme, toggleTheme] = useState(getTheme());

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  if(!ready){
    return <MainLoader />
  }

  let routes_;
  if(!isAuthenticated){
    routes_ = (
      <Switch>
        <Route path="/signin" exact component={SigninPage} />
        <Route path="/signup" exact component={SignupPage} />
        <Redirect to="/signin" />
      </Switch>
    );
  }else{
    routes_ = (
      <Switch>
        <Route path="/tasks" component={TasksPage} />
        <Redirect to="/tasks" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{userId, token, login, logout, isAuthenticated}}>
      <ThemeContext.Provider value={{theme, toggleTheme}} >
        <Router>
          <div className="App">
            {/* <div className="container-xl"> */}
              { routes_ }
            {/* </div> */}
          </div>
        </Router>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
