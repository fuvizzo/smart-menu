import React from 'react';
import { connect } from 'react-redux';

import * as uiActions from '../../Actions/ui-actions';
const MenuDescriptionEditor = props => {
  return <>{props.menu.info.locales.en.name}</>;
};

function mapStateToProps(state) {
  return {
    menus: state.menus,
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}
export default connect(mapStateToProps, uiActions)(MenuDescriptionEditor);
