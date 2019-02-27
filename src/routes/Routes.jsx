import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../views/SignIn/SignIn';


class Routes extends React.Component {



    render() {
        return (
            <Switch>
                <Route path="/login" exact component={SignIn} />
            </Switch>
        )
    }
}

export default Routes