import React from 'react';
import BaseLanguageTabPanel from '../base-language-tabs-panel';
import LocaleEditor from './locale-editor';
import LocaleTabView from './locale-tab-view';

const emptyLocaleData = {
  lang: '',
  name: '',
  description: '',
  ingredients: '',
};

const LanguageTabsPanel = props => {
  return (
    <BaseLanguageTabPanel
      {...props}
      emptyLocaleData={emptyLocaleData}
      tabView={<LocaleTabView />}
    >
      <LocaleEditor {...props} />
    </BaseLanguageTabPanel>
  );
};

export default LanguageTabsPanel;
