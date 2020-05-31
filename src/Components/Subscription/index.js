import React from 'react';
import { connect } from 'react-redux';

import { DisclaimerWrapper } from './styles';
import * as uiActions from '../../Actions/ui-actions';
import Disclaimer from './disclaimer';

const Subscription = props => {
  const { user, defaultLanguage } = props;

  return (
    <DisclaimerWrapper p={2}>
      <Disclaimer lang={defaultLanguage} username={user.firstName} />
    </DisclaimerWrapper>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.ui.settings.defaultLanguage,
    user: state.account.user,
    ui: state.ui,
  };
}

export default connect(mapStateToProps, uiActions)(Subscription);
