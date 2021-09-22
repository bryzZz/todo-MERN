import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/auth.hook';
import SignupPage from '../pages/SignupPage';
import SigninPage from '../pages/SigninPage';
import TasksPage from '../pages/TasksPage';
import MainLoader from './MainLoader/MainLoader';

function App() {
  const { userId, token, login, logout, ready, isAuthenticated } = useAuth();

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
      <Router>
        <div className="App">
          { routes_ }
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
