import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../views/Dashboard/Dashboard';
// import Milestones from '../views/Milestones/Milestones';
// import MainMileStoneBoard from '../views/Milestones/MainMileStoneBoard';
import Board from '../views/Milestones/Board';


function Routes({ ...props }) {
    return (
        <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/boards" component={Board} />
        </Switch>
    )
}

export default Routes;
