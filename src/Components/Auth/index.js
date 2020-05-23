import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom';

import SignIn from './sign-in';
import SignUp from './sign-up';
import ResetPassword from './reset-password';
import { handleAuthOperations } from '../../Actions';
import AuthSectionContainer from './section-container';
import constants from '../../Constants/index';
import { Typography, Box } from '@material-ui/core';

const { Locales } = constants;

const AuthOperations = props => {
  const { defaultLanguage, authOperation } = props;
  const { path } = useRouteMatch();

  const history = useHistory();
  const query = useQuery();

  function useQuery() {
    return new URLSearchParams(history.location.search);
  }
  const signInPath = `${path}/sign-in`;
  const signUpPath = `${path}/sign-up`;

  const {
    Labels: { Sections: SectionLabels },
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
          <AuthSectionContainer sectionLabel={SectionLabels.SIGN_UP}>
            <SignUp />
          </AuthSectionContainer>
        </Route>
        {authOperation && (
          <Route path={`${path}/reset-password`}>
            <AuthSectionContainer
              sectionLabel={
                <Box>
                  {SectionLabels.RESET_PASSWORD}
                  <Box m={2}>
                    <Typography> {authOperation.email}</Typography>
                  </Box>
                </Box>
              }
            >
              <ResetPassword />
            </AuthSectionContainer>
          </Route>
        )}
      </Switch>
    </>
  );
};

function mapStateToProps(state) {
  return {
    authOperation: state.public.authOperation,
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, { handleAuthOperations })(
  AuthOperations
);
