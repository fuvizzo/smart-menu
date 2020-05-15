import * as UI_ActionTypes from '../Constants/ui-action-types';
import { cloneDeep } from 'lodash';

const initialState = {
  settings: {
    defaultLanguage: 'en',
  },
  confirmationDialog: {
    open: false,
    data: {},
    childItem: false,
  },
  editMode: {
    enabled: false,
    data: {},
    childItem: false,
  },
  insertMode: {
    enabled: false,
    data: {},
    childItem: false,
  },
  actionsPopover: {},
  languageTabsPanel: {
    expanded: false,
    itemId: null,
  },
  menuEditorTabsPanel: {
    index: 0,
  },
  dashboardDrawerOpen: false,
};

function uiReducer(state = initialState, action) {
  const ui = cloneDeep(state);
  switch (action.type) {
    case UI_ActionTypes.SET_DEFAULT_SYSTEM_LANGUAGE:
      ui.settings.defaultLanguage = action.payload;
      return ui;
    case UI_ActionTypes.CLOSE_CONFIRMATION_DIALOG:
      ui.confirmationDialog = initialState.confirmationDialog;
      return ui;
    case UI_ActionTypes.OPEN_CONFIRMATION_DIALOG:
      ui.confirmationDialog = action.payload;
      return ui;
    case UI_ActionTypes.SHOW_ACTIONS_POPOVER:
      ui.actionsPopover = action.payload;
      return ui;
    case UI_ActionTypes.HIDE_ACTIONS_POPOVER:
      ui.actionsPopover = initialState.actionsPopover;
      return ui;
    case UI_ActionTypes.EDIT_DATA:
      ui.editMode.data = action.payload;
      return ui;
    case UI_ActionTypes.ENABLE_EDIT_MODE:
      ui.editMode = action.payload;
      return ui;
    case UI_ActionTypes.DISABLE_EDIT_MODE:
      ui.editMode = initialState.editMode;
      return ui;
    case UI_ActionTypes.EXPAND_LANGUAGE_TABS_PANEL:
      ui.languageTabsPanel = action.payload;
      return ui;
    case UI_ActionTypes.COLLAPSE_LANGUAGE_TABS_PANEL:
      ui.languageTabsPanel = initialState.languageTabsPanel;
      return ui;
    case UI_ActionTypes.INSERT_DATA:
      ui.insertMode.data = action.payload;
      return ui;
    case UI_ActionTypes.ENABLE_INSERT_MODE:
      ui.insertMode = action.payload;
      return ui;
    case UI_ActionTypes.DISABLE_INSERT_MODE:
      ui.insertMode = initialState.insertMode;
      return ui;
    case UI_ActionTypes.SET_MENU_EDITOR_TABS_PANEL_INDEX:
      ui.menuEditorTabsPanel.index = action.payload;
      return ui;
    case UI_ActionTypes.SET_DASHBOARD_DRAWER_OPEN:
      ui.dashboardDrawerOpen = action.payload;
      return ui;
    default:
      return state;
  }
}

export default uiReducer;
