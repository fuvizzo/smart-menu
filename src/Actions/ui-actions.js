import * as UI_ActionTypes from '../Constants/ui-action-types';

export const openConfirmationDialog = payload => {
  return { type: UI_ActionTypes.OPEN_CONFIRMATION_DIALOG, payload };
};

export const closeConfirmationDialog = payload => {
  return { type: UI_ActionTypes.CLOSE_CONFIRMATION_DIALOG, payload };
};

export const showActionsPopover = payload => {
  return { type: UI_ActionTypes.SHOW_ACTIONS_POPOVER, payload };
};

export const hideActionsPopover = payload => {
  return { type: UI_ActionTypes.HIDE_ACTIONS_POPOVER, payload };
};
