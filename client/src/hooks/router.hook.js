import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignupPage from '../pages/SignupPage';
import SigninPage from '../pages/SigninPage';
import TasksPage from '../pages/TasksPage';

export const useRoutes = (isAuthenticated) => {
    if(!isAuthenticated){
        return (
            <Switch>
                <Route path="/signin" exact component={SigninPage} />
                <Route path="/signup" exact component={SignupPage} />
                <Redirect to="/signin" />
            </Switch>
        );
    }else{
        return (
            <Switch>
                <Route path="/tasks" exact component={TasksPage} />
                {/* <Route path="/create" exact component={CreatePage} /> */}
                {/* <Route path="/detail/:id" component={DetailPage} /> */}
                {/* <Redirect to="/tasks" /> */}
            </Switch>
        );
    }
}