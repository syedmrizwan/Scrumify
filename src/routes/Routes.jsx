import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../views/Dashboard/Dashboard';
import Board from '../views/Milestones/Board';



function Routes({ ...props }) {
    return (
        <Switch>
            <Route path="/app" exact component={Board} />
            <Route path="/app/dashboard" exact component={Dashboard} />
        </Switch>
    )
}

export default Routes;
