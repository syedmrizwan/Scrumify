import React, { Component } from 'react';
import './assets/css/App-basicTheme.css';
import muiTheme from './assets/jss/App-muiTheme';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, Provider as ReduxProvider } from 'react-redux';
import SignIn from './views/SignIn/SignIn';
import Layout from './views/MainLayout/Layout';
const theme = createMuiTheme(muiTheme);

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  fetch: PropTypes.func.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,
};

const PrivateRoute = ({ props, component, isAuthenticated, ...rest }) => ( // eslint-disable-line
  // jwt.verify(localStorage.getItem('token')
  //   , process.env.REACT_APP_JWT_SECRET, function (err, decoded) {
  //     if (err) {
  //       props.dispatch(logout());
  //     }
  //   }),
  <Route
    {...rest} render={props => (
      isAuthenticated ? (
        React.createElement(component, props)
      ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }, // eslint-disable-line
            }}
          />
        )
    )}
  />
);

class App extends Component {
  /* constructor(props) {
    super(props);
  } */
  static propTypes = {
    context: PropTypes.shape(ContextType),
    store: PropTypes.any, // eslint-disable-line
    // isAuthenticated: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    context: null,
  };

  static contextTypes = {
    router: PropTypes.any,
    store: PropTypes.any,
  };

  static childContextTypes = ContextType;

  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/app" />} />
            <PrivateRoute props={this.props} isAuthenticated={true} path="/app" component={Layout} />
            <Route path="/login" exact component={SignIn} />
          </Switch>
        </MuiThemeProvider>

      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    // isAuthenticated: store.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(App));
