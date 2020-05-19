import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { connect } from 'react-redux';
import AuthRoute from '../Auth/auth-route';

import SignIn from '../Auth/sign-in';
import SignUp from '../Auth/sign-up';
import Pricing from '../Pricing';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from 'react-router-dom';
import UserDashboard from '../UserDashboard/index';
import MenuPreviewer from '../UserDashboard/menu-previewer';

import MenuViewer from '../MenuViewer/menu-viewer';
import useStyles from './styles';
import constants from '../../Constants/index';
const { Locales } = constants;

const PublicMasterPage = connect(mapStateToProps)(props => {
  const { children, account, defaultLanguage } = props;
  const classes = useStyles();

  const {
    Labels: { Sections: SectionLabels, Actions: ActionsLabels },
  } = Locales[defaultLanguage];

  return (
    <>
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
            to={account ? '/dashboard/menu-list' : 'sign-in'}
            component={RouterLink}
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            {account ? ActionsLabels.BACK_TO_DASHBOARD : ActionsLabels.SIGN_IN}
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
});

const App = props => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PublicMasterPage />
        </Route>
        <Route path="/pricing">
          <PublicMasterPage>
            <Pricing />
          </PublicMasterPage>
        </Route>
        <Route path="/sign-in">
          <PublicMasterPage>
            <SignIn />
          </PublicMasterPage>
        </Route>
        <Route path="/sign-up">
          <PublicMasterPage>
            <SignUp />
          </PublicMasterPage>
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

function mapStateToProps(state) {
  return {
    account: state.account,
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default App;
