import React from 'react';
import BaseLanguageTabPanel from '../base-language-tabs-panel';
import LocaleEditor from '../base-locale-editor';
import LocaleTabView from './locale-tab-view';
import constants from '../../../Constants/index';

import { connect } from 'react-redux';
const { Locales } = constants;
const emptyLocaleData = {
  lang: '',
  name: '',
  description: '',
};

const LanguageTabsPanel = props => {
  const {
    Labels: { Menu: MenuLabels },
  } = Locales[props.defaultLanguage];
  return (
    <BaseLanguageTabPanel
      {...props}
      emptyLocaleData={emptyLocaleData}
      tabView={<LocaleTabView />}
    >
      <LocaleEditor
        {...props}
        labels={{
          name: MenuLabels.MENU_NAME,
          description: MenuLabels.DESCRIPTION,
        }}
      />
    </BaseLanguageTabPanel>
  );
};

function mapStateToProps(state) {
  return {
    defaultLanguage: state.ui.settings.defaultLanguage,
  };
}

export default connect(mapStateToProps)(LanguageTabsPanel);
