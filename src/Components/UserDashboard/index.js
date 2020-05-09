import React from 'react';
import { connect } from 'react-redux';
import { setDefaultSystemLanguage } from '../../Actions/index';
import constants from '../../Constants/index';
import MenuEditor from '../MenuEditor/menuEditor';
import MenuList from './menuList';
import Dashboard from '../Dashboard/index';
import AuthRoute from '../Auth/authRoute';

import { Switch, useRouteMatch, useLocation } from 'react-router-dom';
const { Locale } = constants;

const UserDashboard = props => {
  const locale = Locale[props.defaultLanguage];
  const { path } = useRouteMatch();
  const location = useLocation();
  const sectionNameHandler = () => {
    console.log(location);
  };

  return (
    <Dashboard getSectionName={sectionNameHandler}>
      <Switch>
        <AuthRoute path={`${path}/account`}>
          <div>
            <div>
              {props.user.firstName} {props.user.lastName}
            </div>
            <div>
              {locale.DEFAULT_LANGUAGE}:
              {locale.Languages[props.defaultLanguage]}
            </div>
          </div>
        </AuthRoute>
        <AuthRoute path={`${path}/menu-editor/:menuId`}>
          <MenuEditor />
        </AuthRoute>
        <AuthRoute exact path={`${path}/menu-list`}>
          <MenuList />
        </AuthRoute>
      </Switch>
    </Dashboard>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps, {
  setDefaultSystemLanguage,
})(UserDashboard);
