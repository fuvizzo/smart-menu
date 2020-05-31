import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import {
  Button,
  Typography,
  ListItem,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@material-ui/core/';
import {
  AppBar,
  Toolbar,
  ToolbarTitle,
  NavList,
  RouterLink,
  LangSelector,
} from './styles';
import AuthRoute from '../Auth/auth-route';

import Pricing from '../Pricing';
import AuthOperations from '../Auth';
import UserDashboard from '../UserDashboard/index';
import MenuPreviewer from '../UserDashboard/menu-previewer';
import MenuViewer from '../MenuViewer/menu-viewer';
import { Snackbar } from '../Common';
import LanguageSelector from '../Common/public-language-selector';
import { setError, setDefaultPublicLanguage } from '../../Actions/ui-actions';
import constants from '../../Constants/index';
import ContactUsDialog from '../Contacts';
import { isEmpty } from 'lodash';
const { Locales, ErrorTypes, APP_NAME } = constants;

const PublicMasterPage = connect(mapStateToProps, {
  setError,
  setDefaultPublicLanguage,
})(props => {
  const [contactUsDialogOpen, setContactUsDialogOpen] = useState(false);
  const { children, account, publicDefaultLanguage, error } = props;

  const {
    Labels: { Sections: SectionLabels, Actions: ActionLabels, Common },
  } = Locales[publicDefaultLanguage];

  const languageChangeHandler = event => {
    props.setDefaultPublicLanguage(event.target.value);
  };

  return (
    <>
      <ContactUsDialog
        defaultLanguage={publicDefaultLanguage}
        open={contactUsDialogOpen}
        onCloseHandler={() => {
          setContactUsDialogOpen(false);
        }}
      />
      {!isEmpty(error) && (
        <Snackbar
          severity="warning"
          onCloseHandler={() => {
            props.setError();
          }}
          open={!!error}
        >
          {error.message}
        </Snackbar>
      )}
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <ToolbarTitle variant="h6" color="inherit" noWrap>
            {APP_NAME}
          </ToolbarTitle>
          <nav>
            <NavList component="div">
              {/*  <ListItem button component={RouterLink} to="/">
                <Typography color="textPrimary">
                  {SectionLabels.HOME}
                </Typography>
              </ListItem>
              <ListItem button component={RouterLink} to="/pricing">
                <Typography color="textPrimary" to="/pricing">
                  {SectionLabels.PRICING}
                </Typography>
              </ListItem> */}
              <ListItem
                button
                onClick={() => {
                  setContactUsDialogOpen(true);
                }}
              >
                <Typography color="textPrimary">
                  {ActionLabels.CONTACT_US}
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
            {account ? ActionLabels.BACK_TO_DASHBOARD : ActionLabels.SIGN_IN}
          </Button>
          <Box ml={1}>
            <LanguageSelector
              languageLabel={Common.LANGUAGE}
              value={publicDefaultLanguage}
              onChange={languageChangeHandler}
            />
          </Box>
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
          <Redirect to="/authentication/sign-up" />
          {/* <PublicMasterPage /> */}
        </Route>
        <Route path="/pricing">
          <PublicMasterPage>{/*  <Pricing /> */}</PublicMasterPage>
        </Route>

        <Route path="/authentication">
          <PublicMasterPage>
            <AuthOperations />
          </PublicMasterPage>
        </Route>
        <Route exact path="/:uniqueBusinessUrlPath/menu/:menuId">
          <MenuViewer />
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
