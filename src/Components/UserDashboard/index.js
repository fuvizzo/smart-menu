import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setDefaultSystemLanguage } from '../../Actions/index';
import constants from '../../Constants/index';
import MenuEditor from '../MenuEditor/menu-editor';
import MenuList from './menu-list';
import Dashboard from '../Dashboard/index';
import AuthRoute from '../Auth/auth-route';
import MenuEditorSectionHeader from '../MenuEditor/section-header';
import { Switch, useRouteMatch, useParams } from 'react-router-dom';
const { Locale } = constants;

const UserDashboard = props => {
  const locale = Locale[props.defaultLanguage];
  const { path } = useRouteMatch();

  return (
    /*  <Dashboard> */
    <Switch>
      <AuthRoute path={`${path}/account`}>
        <Dashboard>
          <div>
            {props.user.firstName} {props.user.lastName}
          </div>
          <div>
            {locale.DEFAULT_LANGUAGE}:{locale.Languages[props.defaultLanguage]}
          </div>
        </Dashboard>
      </AuthRoute>
      <AuthRoute path={`${path}/menu-editor/:menuId`}>
        <Dashboard sectionHeader={<MenuEditorSectionHeader />}>
          <MenuEditor />
        </Dashboard>
      </AuthRoute>
      <AuthRoute exact path={`${path}/menu-list`}>
        <Dashboard>
          <MenuList />
        </Dashboard>
      </AuthRoute>
    </Switch>
    /*  </Dashboard> */
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
