import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';

import { Button, FormControl, Drawer } from '@material-ui/core/';

import {
  Menu as MenuIcon,
  ChevronRight as ChevronRigthIcon,
} from '@material-ui/icons';
import {
  AppBar,
  ListItem,
  Toolbar,
  ToolbarTitle,
  NavList,
  RouterLink,
  DesktopNav,
  MenuButton,
} from './styles';
import AuthRoute from '../Auth/auth-route';

import Pricing from '../Pricing';
import AuthOperations from '../Auth';
import UserDashboard from '../UserDashboard/index';
import MenuPreviewer from '../UserDashboard/menu-previewer';
import MenuViewer from '../MenuViewer/menu-viewer';
import { Snackbar } from '../Common';
import { setError, setDefaultPublicLanguage } from '../../Actions/ui-actions';
import constants from '../../Constants/index';
import ContactUsDialog from '../Contacts';
import { isEmpty } from 'lodash';
import Logo from '../Common/logo';

const { Locales } = constants;
const useQuery = () => new URLSearchParams(useLocation().search);

const PublicMasterPage = connect(mapStateToProps, {
  setError,
  setDefaultPublicLanguage,
})(props => {
  const [contactUsDialogOpen, setContactUsDialogOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const query = useQuery();
  const { children, account, publicDefaultLanguage, error } = props;

  useEffect(() => {
    const language = query.get('lang');
    if (Object.keys(Locales).some(lang => lang === language)) {
      props.setDefaultPublicLanguage(language);
    }
  }, []);

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setRightDrawerOpen(open);
  };

  const {
    Labels: { Sections: SectionLabels, Actions: ActionLabels },
  } = Locales[publicDefaultLanguage];

  const NavPanel = () => {
    return (
      <div
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
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
          <ListItem component="div">
            <Button
              onClick={() => {
                setContactUsDialogOpen(true);
              }}
              color="primary"
            >
              {ActionLabels.CONTACT_US}
            </Button>
          </ListItem>
          <ListItem component="div">
            <Button
              to={account ? '/dashboard/menu-list' : '/authentication/sign-in'}
              component={RouterLink}
              color="primary"
              variant="outlined"
            >
              {account ? ActionLabels.BACK_TO_DASHBOARD : ActionLabels.SIGN_IN}
            </Button>
          </ListItem>
        </NavList>
      </div>
    );
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
      <Drawer
        anchor="right"
        open={rightDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        <NavPanel />
      </Drawer>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <ToolbarTitle
            variant="h6"
            color="inherit"
            noWrap
            style={{ display: 'flex' }}
          >
            <Logo style={{ marginLeft: 20 }} />
          </ToolbarTitle>
          <DesktopNav>
            <NavPanel />
          </DesktopNav>
          <MenuButton
            edge="end"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            {rightDrawerOpen ? <ChevronRigthIcon /> : <MenuIcon />}
          </MenuButton>
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
        <AuthRoute path="/menu-preview/:uniqueBusinessUrlPath/menu/:menuId">
          <MenuPreviewer />
        </AuthRoute>
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

export default App;
