import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setDefaultSystemLanguage } from '../../Actions/index';
import constants from '../../Constants/index';
import MenuEditor from './menuEditor';
import Dashboard from '../Dashboard/index';
import AuthRoute from '../Auth/authRoute';

import {
  BrowserRouter as Router,
  Switch,
  useRouteMatch,
  useHistory,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';
const { LOCALE } = constants;

const UserDashboard = props => {
  const locale = LOCALE[props.defaultLanguage];
  const { path } = useRouteMatch();

  console.log(path);
  return (
    <Dashboard>
      <Switch>
        <AuthRoute exact path={path}>
          <div>
            <div>
              {props.user.firstName} {props.user.lastName}
            </div>
            <div>
              {locale.DEFAULT_LANGUAGE}:
              {locale.LANGUAGES[props.defaultLanguage]}
            </div>
          </div>
        </AuthRoute>
        <AuthRoute path={`${path}/menu-editor`}>
          <MenuEditor />
        </AuthRoute>
      </Switch>
    </Dashboard>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
    defaultLanguage: state.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, {
  setDefaultSystemLanguage,
})(UserDashboard);