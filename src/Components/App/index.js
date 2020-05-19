import React from 'react';

import { connect } from 'react-redux';
import AuthRoute from '../Auth/auth-route';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserDashboard from '../UserDashboard/index';
import MenuPreviewer from '../UserDashboard/menu-previewer';
import Home from './home';
import MenuViewer from '../MenuViewer/menu-viewer';
import useStyles from './styles';

const App = props => {
  const classes = useStyles();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/:uniqueBusinessUrlPath">
          <MenuViewer />
        </Route>
        <AuthRoute path="/menu-preview/:uniqueBusinessUrlPath">
          <MenuPreviewer />
        </AuthRoute>
        <AuthRoute path="/dashboard">
          <UserDashboard />
        </AuthRoute>
      </Switch>
    </Router>
  );
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(App);
