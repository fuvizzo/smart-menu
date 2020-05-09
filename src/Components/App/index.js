import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { connect } from 'react-redux';
import AuthRoute from '../Auth/authRoute';
import useStyles from './styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from 'react-router-dom';
import SignIn from '../Auth/signIn';
import Pricing from '../Pricing';
import UserDashboard from '../UserDashboard/index';

const App = props => {
  const classes = useStyles();

  return (
    <Router>
      {/* {!props.user && <Redirect from="/" to="signin" />} */}
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            {!props.user && <div>Smart menu</div>}
          </Typography>
          <nav>
            <Link
              component={RouterLink}
              variant="button"
              color="textPrimary"
              className={classes.link}
              to="/"
            >
              Home
            </Link>
            <Link
              component={RouterLink}
              variant="button"
              color="textPrimary"
              className={classes.link}
              to="/pricing"
            >
              Pricing
            </Link>
          </nav>
          <Button
            to={`signin`}
            component={RouterLink}
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/">
          <h3>Home content</h3>
        </Route>
        <Route path="/pricing">
          <Pricing />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <AuthRoute path="/dashboard">
          <UserDashboard />
        </AuthRoute>
      </Switch>
    </Router>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
