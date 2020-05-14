import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuDescriptionEditor from './menu-description-editor';
import { TabPanel } from '../Common';
import Box from '@material-ui/core/Box';
import constants from '../../Constants/index';
import MenuItemsEditor from './menu-items-editor';
import * as uiActions from '../../Actions/ui-actions';

import * as menuActions from '../../Actions/menu-actions';

const a11yProps = index => ({
  id: `menu-editor-tab-${index}`,
  'aria-controls': `menu-editor-tabpanel-${index}`,
});

const MenuEditor = props => {
  const { menuId } = useParams();

  const {
    ui,
    menus,
    disableEditMode,
    disableInsertMode,
    collapseLanguageTabsPanel,
    setMenuEditorTabsPanelIndex,
  } = props;
  const defaultLanguage = ui.settings.defaultLanguage;
  const { Locale } = constants;
  const {
    Labels: { Menu: MenuLabels },
  } = Locale[defaultLanguage];

  const menu = menus[menuId];

  useEffect(() => {
    disableEditMode();
    disableInsertMode();
    collapseLanguageTabsPanel();
  }, []);

  return (
    <>
      <Tabs
        value={ui.menuEditorTabsPanel.index}
        onChange={(event, value) => setMenuEditorTabsPanelIndex(value)}
        aria-label="menu editor tabs"
      >
        <Tab label={MenuLabels.ITEMS} {...a11yProps(0)} />
        <Tab label={MenuLabels.INFO} {...a11yProps(1)} />
      </Tabs>
      <TabPanel
        value={ui.menuEditorTabsPanel.index}
        index={0}
        ariaLabelledByPrefix="menu-editor-tab"
        idPrefix="menu-editor-tabpanel"
      >
        <Box mt={1.5}>
          <MenuItemsEditor menu={menu} />
        </Box>
      </TabPanel>
      <TabPanel
        value={ui.menuEditorTabsPanel.index}
        index={1}
        ariaLabelledByPrefix="menu-editor-tab"
        idPrefix="menu-editor-tabpanel"
      >
        <MenuDescriptionEditor menu={menu} />
      </TabPanel>
    </>
  );
};

function mapStateToProps(state) {
  return {
    menus: state.menus,
    ui: state.ui,
  };
}

export default connect(mapStateToProps, { ...uiActions, ...menuActions })(
  MenuEditor
);
