import React from 'react';
import BaseLanguageTabPanel from '../base-language-tabs-panel';
import LocaleEditor from './locale-editor';
import LocaleTabView from './locale-tab-view';

const LanguageTabsPanel = props => {
  return (
    <BaseLanguageTabPanel {...props} tabView={<LocaleTabView />}>
      <LocaleEditor {...props} />
    </BaseLanguageTabPanel>
  );
};

export default LanguageTabsPanel;
