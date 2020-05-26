import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import BusinessInfoEditor from './info-editor';
import BusinessMediaAndThemeEditor from './media-theme-editor';
import { TabPanel } from '../Common';
import constants from '../../Constants/index';
import * as uiActions from '../../Actions/ui-actions';
import * as businessActions from '../../Actions/business-actions';

const a11yProps = index => ({
  id: `business-editor-tab-${index}`,
  'aria-controls': `business-editor-tabpanel-${index}`,
});

const BusinessEditor = props => {
  const {
    ui,
    businesses,
    disableEditMode,
    setBusinessEditorTabsPanelIndex,
  } = props;

  const defaultLanguage = ui.settings.defaultLanguage;
  const { Locales } = constants;
  const {
    Labels: { Business: BusinessLabels },
  } = Locales[defaultLanguage];

  const businessData = {
    businessId: Object.keys(businesses)[0],
    business: Object.values(businesses)[0],
  };

  useEffect(() => {
    disableEditMode();
  }, []);

  return (
    <>
      <Tabs
        value={ui.businessEditorTabsPanel.index}
        onChange={(event, value) => {
          if (ui.businessEditorTabsPanel.index !== value) {
            setBusinessEditorTabsPanelIndex(value);
          }
        }}
        aria-label="business editor tabs"
      >
        <Tab label={BusinessLabels.INFO} {...a11yProps(0)} />
        <Tab label={BusinessLabels.MEDIA_AND_THEME} {...a11yProps(1)} />
      </Tabs>
      <TabPanel
        value={ui.businessEditorTabsPanel.index}
        index={0}
        ariaLabelledByPrefix="business-editor-tab"
        idPrefix="business-editor-tabpanel"
      >
        <Box mt={1.5}>
          <BusinessInfoEditor businessData={businessData} />
        </Box>
      </TabPanel>
      <TabPanel
        value={ui.businessEditorTabsPanel.index}
        index={1}
        ariaLabelledByPrefix="business-editor-tab"
        idPrefix="business-editor-tabpanel"
      >
        <Box mt={1.5}>
          <BusinessMediaAndThemeEditor businessData={businessData} />
        </Box>
      </TabPanel>
    </>
  );
};

function mapStateToProps(state) {
  return {
    businesses: state.businesses,
    ui: state.ui,
  };
}

export default connect(mapStateToProps, { ...uiActions, ...businessActions })(
  BusinessEditor
);
