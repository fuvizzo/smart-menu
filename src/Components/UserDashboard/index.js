import React from 'react';
import { connect } from 'react-redux';
import MenuEditor from '../MenuEditor/';
import MenuList from './menu-list';
import Dashboard from '../Dashboard/index';
import AuthRoute from '../Auth/auth-route';
import MenuListSectionHeader from './section-header';
import MenuEditorSectionHeader from '../MenuEditor/section-header';
import SubscriptionSectionHeader from '../Subscription/section-header';
import AccountSectionHeader from '../Account/section-header';
import BusinessSectionHeader from '../Business/section-header';
import { Switch, useRouteMatch } from 'react-router-dom';
import Subscription from '../Subscription';
import Account from '../Account';
import Business from '../Business';
const UserDashboard = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <AuthRoute path={`${path}/account`}>
        <Dashboard sectionHeader={<AccountSectionHeader />}>
          <Account />
        </Dashboard>
      </AuthRoute>
      <AuthRoute path={`${path}/business`}>
        <Dashboard sectionHeader={<BusinessSectionHeader />}>
          <Business />
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
  );
};

function mapStateToProps(state) {
  return {
    user: state.account.user,
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps)(UserDashboard);
