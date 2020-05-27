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
import { Switch, useRouteMatch, Redirect } from 'react-router-dom';
import Subscription from '../Subscription';
import Account from '../Account';
import Business from '../Business';
import LeftMenu from '../UserDashboard/left-menu';

const DashboardWrapper = props => {
  return (
    <Dashboard leftMenu={<LeftMenu />} {...props}>
      {props.children}
    </Dashboard>
  );
};

const UserDashboard = props => {
  const { path } = useRouteMatch();
  // console.log(useLocation());
  return (
    <>
      <Redirect to={`${path}/menu-list`} />
      <Switch>
        <AuthRoute path={`${path}/account`}>
          <DashboardWrapper sectionHeader={<AccountSectionHeader />}>
            <Account />
          </DashboardWrapper>
        </AuthRoute>
        <AuthRoute path={`${path}/business`}>
          <DashboardWrapper sectionHeader={<BusinessSectionHeader />}>
            <Business />
          </DashboardWrapper>
        </AuthRoute>
        <AuthRoute path={`${path}/menu-editor/:menuId`}>
          <DashboardWrapper sectionHeader={<MenuEditorSectionHeader />}>
            <MenuEditor />
          </DashboardWrapper>
        </AuthRoute>
        <AuthRoute path={`${path}/subscription-status`}>
          <DashboardWrapper sectionHeader={<SubscriptionSectionHeader />}>
            <Subscription />
          </DashboardWrapper>
        </AuthRoute>
        <AuthRoute exact path={`${path}/menu-list`}>
          <DashboardWrapper sectionHeader={<MenuListSectionHeader />}>
            <MenuList />
          </DashboardWrapper>
        </AuthRoute>
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

export default connect(mapStateToProps)(UserDashboard);
