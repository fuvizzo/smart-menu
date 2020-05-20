import * as UI_ActionTypes from '../Constants/ui-action-types';
import { cloneDeep, isUndefined } from 'lodash';

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
  showLoader: false,
  error: {},
};

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case UI_ActionTypes.SET_DEFAULT_SYSTEM_LANGUAGE:
      state.settings.defaultLanguage = action.payload;
      break;
    case UI_ActionTypes.CLOSE_CONFIRMATION_DIALOG:
      state.confirmationDialog = initialState.confirmationDialog;
      break;
    case UI_ActionTypes.OPEN_CONFIRMATION_DIALOG:
      state.confirmationDialog = action.payload;
      break;
    case UI_ActionTypes.SHOW_ACTIONS_POPOVER:
      state.actionsPopover = isUndefined(action.payload)
        ? initialState.actionsPopover
        : action.payload;
      break;
    case UI_ActionTypes.HIDE_ACTIONS_POPOVER:
      state.actionsPopover = initialState.actionsPopover;
      break;
    case UI_ActionTypes.EDIT_DATA:
      state.editMode.data = action.payload;
      break;
    case UI_ActionTypes.ENABLE_EDIT_MODE:
      state.editMode = action.payload;
      break;
    case UI_ActionTypes.DISABLE_EDIT_MODE:
      state.editMode = initialState.editMode;
      state.error = initialState.error;
      break;
    case UI_ActionTypes.EXPAND_LANGUAGE_TABS_PANEL:
      state.languageTabsPanel = action.payload;
      break;
    case UI_ActionTypes.COLLAPSE_LANGUAGE_TABS_PANEL:
      state.languageTabsPanel = initialState.languageTabsPanel;
      break;
    case UI_ActionTypes.INSERT_DATA:
      state.insertMode.data = action.payload;
      break;
    case UI_ActionTypes.ENABLE_INSERT_MODE:
      state.insertMode = action.payload;
      break;
    case UI_ActionTypes.DISABLE_INSERT_MODE:
      state.insertMode = initialState.insertMode;
      state.error = initialState.error;
      break;
    case UI_ActionTypes.SET_MENU_EDITOR_TABS_PANEL_INDEX:
      state.menuEditorTabsPanel.index = action.payload;
      break;
    case UI_ActionTypes.SET_DASHBOARD_DRAWER_OPEN:
      state.dashboardDrawerOpen = action.payload;
      break;
    case UI_ActionTypes.SET_ERROR:
      state.error = action.payload || initialState.error;
      break;
    default:
      return state;
  }
  return cloneDeep(state);
}

export default uiReducer;
