import * as UI_ActionTypes from '../Constants/ui-action-types';
import { cloneDeep } from 'lodash';

const initialState = {
  settings: {
    defaultLanguage: 'en',
  },
  confirmationDialogState: {
    open: false,
    data: {},
  },
  editModeState: {
    enabled: false,
    data: {},
    childItem: false,
  },
  insertModeState: {
    enabled: false,
    data: {},
    childItem: false,
  },
  actionsPopoverState: {},
  languageTabsPanelState: {
    expanded: false,
    itemId: null,
  },
};

function uiReducer(state = initialState, action) {
  const ui = cloneDeep(state);
  switch (action.type) {
    case UI_ActionTypes.SET_DEFAULT_SYSTEM_LANGUAGE:
      ui.settings.defaultLanguage = action.payload;
      return ui;
    case UI_ActionTypes.CLOSE_CONFIRMATION_DIALOG:
      ui.confirmationDialogState = initialState.confirmationDialogState;
      return ui;
    case UI_ActionTypes.OPEN_CONFIRMATION_DIALOG:
      ui.confirmationDialogState = action.payload;
      return ui;
    case UI_ActionTypes.SHOW_ACTIONS_POPOVER:
      ui.actionsPopoverState = action.payload;
      return ui;
    case UI_ActionTypes.HIDE_ACTIONS_POPOVER:
      ui.actionsPopoverState = initialState.actionsPopoverState;
      return ui;
    case UI_ActionTypes.EDIT_DATA:
      ui.editModeState.data = action.payload;
      return ui;
    case UI_ActionTypes.ENABLE_EDIT_MODE:
      ui.editModeState = action.payload;
      return ui;
    case UI_ActionTypes.DISABLE_EDIT_MODE:
      ui.editModeState = initialState.editModeState;
      return ui;
    case UI_ActionTypes.EXPAND_LANGUAGE_TABS_PANEL:
      ui.languageTabsPanelState = action.payload;
      return ui;
    case UI_ActionTypes.COLLAPSE_LANGUAGE_TABS_PANEL:
      ui.languageTabsPanelState = initialState.languageTabsPanelState;
      return ui;
    case UI_ActionTypes.INSERT_DATA:
      ui.insertModeState.data = action.payload;
      return ui;
    case UI_ActionTypes.ENABLE_INSERT_MODE:
      ui.insertModeState = action.payload;
      return ui;
    case UI_ActionTypes.DISABLE_INSERT_MODE:
      ui.insertModeState = initialState.insertModeState;
      return ui;

    default:
      return ui;
  }
}

export default uiReducer;
