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
  actionsPopoverState: { anchorEl: null, data: {} },
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
    default:
      return ui;
  }
}

export default uiReducer;
