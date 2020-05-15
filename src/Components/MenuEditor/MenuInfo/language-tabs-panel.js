import React from 'react';
import BaseLanguageTabPanel from '../base-language-tabs-panel';
import LocaleEditor from '../base-locale-editor';
import LocaleTabView from './locale-tab-view';

const emptyLocaleData = {
  lang: '',
  name: '',
  description: '',
};

const LanguageTabsPanel = props => {
  return (
    <BaseLanguageTabPanel {...props} tabView={<LocaleTabView />}>
      <LocaleEditor />
    </BaseLanguageTabPanel>
  );
};

export default LanguageTabsPanel;
