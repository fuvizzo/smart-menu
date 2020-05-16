import React from 'react';
import BaseLanguageTabPanel from '../base-language-tabs-panel';
import LocaleEditor from '../base-locale-editor';
import LocaleTabView from './locale-tab-view';
import constants from '../../../Constants/index';

import { connect } from 'react-redux';
const { Locale } = constants;
const emptyLocaleData = {
  lang: '',
  name: '',
  description: '',
};

const LanguageTabsPanel = props => {
  const {
    Labels: { Menu: MenuLabels },
  } = Locale[props.defaultLanguage];
  return (
    <BaseLanguageTabPanel
      {...props}
      emptyLocaleData={emptyLocaleData}
      tabView={<LocaleTabView />}
    >
      <LocaleEditor
        {...props}
        labels={{
          name: MenuLabels.DISH_NAME,
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
