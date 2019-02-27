import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../views/SignIn/SignIn';
import Dashboard from '../views/Dashboard/Dashboard';


class Routes extends React.Component {



    render() {
        return (
            <Switch>
                <Route path="/login" exact component={SignIn} />
                <Route path="/dashboard" exact component={Dashboard} />
            </Switch>
        )
    }
}

export default Routes