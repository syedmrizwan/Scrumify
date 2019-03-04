import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../views/Dashboard/Dashboard';
// import Milestones from '../views/Milestones/Milestones';
// import MainMileStoneBoard from '../views/Milestones/MainMileStoneBoard';
import Board from '../views/Milestones/Board';
import SignIn from '../views/SignIn/SignIn';


function Routes({ ...props }) {
    return (
        <Switch>
            <Route path="/app" exact component={Board} />
            <Route path="/app/dashboard" exact component={Dashboard} />
            {/* <Route path="/login" component={SignIn} /> */}
        </Switch>
    )
}

export default Routes;
