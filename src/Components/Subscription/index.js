import React from 'react';
import { connect } from 'react-redux';

import constants from '../../Constants/index';
import * as uiActions from '../../Actions/ui-actions';

const Subscription = props => {
  const { ui } = props;

  return <></>;
};

function mapStateToProps(state) {
  return {
    user: state.account.user,
    ui: state.ui,
  };
}

export default connect(mapStateToProps, uiActions)(Subscription);
