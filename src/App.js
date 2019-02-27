import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import SignIn from './views/SignIn/SignIn';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={SignIn} />
      </Switch>
    );
  }
}

export default App;
