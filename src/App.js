import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import SignIn from './views/SignIn/SignIn';
import Dashboard from './views/Dashboard/Dashboard';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/dashboard" exact component={Dashboard} />
      </Switch>
    );
  }
}

export default App;
