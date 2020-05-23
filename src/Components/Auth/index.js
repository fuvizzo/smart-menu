import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

import { Button, Typography, ListItem } from '@material-ui/core/';
import { AppBar, Toolbar, ToolbarTitle, NavList, RouterLink } from './styles';
import AuthRoute from '../Auth/auth-route';
import SignIn from './sign-in';
import SignUp from './sign-up';
import Pricing from '../Pricing';
import { handleAuthOperations } from '../../Actions';
import UserDashboard from '../UserDashboard/index';
import MenuPreviewer from '../UserDashboard/menu-previewer';
import MenuViewer from '../MenuViewer/menu-viewer';
import AuthSectionContainer from './section-container';
import constants from '../../Constants/index';

const { Locales } = constants;

const AuthOperations = props => {
  const { defaultLanguage } = props;
  const { path } = useRouteMatch();

  const history = useHistory();
  const query = useQuery();

  function useQuery() {
    return new URLSearchParams(history.location.search);
  }
  const signInPath = `${path}/sign-in`;
  const signUpPath = `${path}/sign-up`;

  const {
    Labels: { Sections: SectionLabels, Actions: ActionsLabels },
  } = Locales[defaultLanguage];

  useEffect(() => {
    const manageAuthOperations = async () => {
      const data = await props.handleAuthOperations(query);
      if (
        !(
          history.location.pathname === signInPath ||
          history.location.pathname === signUpPath
        )
      )
        history.push(data ? `${path}/${data.section}` : '/');
    };

    manageAuthOperations();
  }, []);

  return (
    <>
      <Switch>
        <Route path={signInPath}>
          <AuthSectionContainer sectionLabel={SectionLabels.SIGN_IN}>
            <SignIn />
          </AuthSectionContainer>
        </Route>
        <Route path={signUpPath}>
          <SignUp />
        </Route>
        <Route path={`${path}/reset-password`}>
          <AuthSectionContainer />
        </Route>
      </Switch>
    </>
  );
};

function mapStateToProps(state) {
  return {
    account: state.account,
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, { handleAuthOperations })(
  AuthOperations
);
