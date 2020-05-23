import React, { useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Button, Typography, ListItem } from '@material-ui/core/';
import { AppBar, Toolbar, ToolbarTitle, NavList, RouterLink } from './styles';
import AuthRoute from '../Auth/auth-route';

import Pricing from '../Pricing';
import AuthOperations from '../Auth';
import UserDashboard from '../UserDashboard/index';
import MenuPreviewer from '../UserDashboard/menu-previewer';
import MenuViewer from '../MenuViewer/menu-viewer';
import { Snackbar } from '../Common';
import { setError } from '../../Actions/ui-actions';
import constants from '../../Constants/index';

const { Locales, ErrorTypes } = constants;

const PublicMasterPage = connect(mapStateToProps, { setError })(props => {
  const [openWarningSnackbar, setOpenWarningSnackbar] = useState(true);
  const { children, account, publicDefaultLanguage, error } = props;

  const {
    Labels: { Sections: SectionLabels, Actions: ActionsLabels },
  } = Locales[publicDefaultLanguage];

  return (
    <>
      {error && error.type === ErrorTypes.AUTHENTICATION && (
        <Snackbar
          severity="warning"
          onCloseHandler={() => {
            setOpenWarningSnackbar(false);
            props.setError();
          }}
          open={openWarningSnackbar}
        >
          {error.message}
        </Snackbar>
      )}
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <ToolbarTitle variant="h6" color="inherit" noWrap>
            {!props.user && <div>Smart menu</div>}
          </ToolbarTitle>
          <nav>
            <NavList component="div">
              <ListItem button component={RouterLink} to="/">
                <Typography color="textPrimary">
                  {SectionLabels.HOME}
                </Typography>
              </ListItem>
              <ListItem button component={RouterLink} to="/pricing">
                <Typography color="textPrimary" to="/pricing">
                  {SectionLabels.PRICING}
                </Typography>
              </ListItem>
            </NavList>
          </nav>

          <Button
            to={account ? '/dashboard/menu-list' : '/authentication/sign-in'}
            component={RouterLink}
            color="primary"
            variant="outlined"
          >
            {account ? ActionsLabels.BACK_TO_DASHBOARD : ActionsLabels.SIGN_IN}
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
});

const App = () => {
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

        <Route path="/authentication">
          <PublicMasterPage>
            <AuthOperations />
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
    error: state.ui.error,
    publicDefaultLanguage: state.public.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps)(App);
