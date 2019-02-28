import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../views/SignIn/SignIn';
import Dashboard from '../views/Dashboard/Dashboard';
import Sample from '../views/Dashboard/Sample';
import Sample2 from '../views/Dashboard/Sample2';



function Routes({ ...props }) {
    return (
        <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/sample" component={Sample} />
            <Route path="/app/sample2" component={Sample2} />
        </Switch>
    )
}

export default Routes;
