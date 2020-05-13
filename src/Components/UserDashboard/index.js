import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUserSettings } from '../../Actions/index';
import constants from '../../Constants/index';
import MenuEditor from '../MenuEditor/menu-editor';
import MenuList from './menu-list';
import Dashboard from '../Dashboard/index';
import AuthRoute from '../Auth/auth-route';
import MenuListSectionHeader from './section-header';
import MenuEditorSectionHeader from '../MenuEditor/section-header';
import SubscriptionSectionHeader from '../Subscription/section-header';
import AccountSectionHeader from '../Account/section-header';
import { Switch, useRouteMatch, useParams } from 'react-router-dom';
import Subscription from '../Subscription';
import Account from '../Account';

const UserDashboard = props => {
  const { path } = useRouteMatch();

  return (
    /*  <Dashboard> */
    <Switch>
      <AuthRoute path={`${path}/account`}>
        <Dashboard sectionHeader={<AccountSectionHeader />}>
          <Account />
        </Dashboard>
      </AuthRoute>
      <AuthRoute path={`${path}/menu-editor/:menuId`}>
        <Dashboard sectionHeader={<MenuEditorSectionHeader />}>
          <MenuEditor />
        </Dashboard>
      </AuthRoute>
      <AuthRoute path={`${path}/subscription-status`}>
        <Dashboard sectionHeader={<SubscriptionSectionHeader />}>
          <Subscription />
        </Dashboard>
      </AuthRoute>
      <AuthRoute exact path={`${path}/menu-list`}>
        <Dashboard sectionHeader={<MenuListSectionHeader />}>
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
  updateUserSettings,
})(UserDashboard);
