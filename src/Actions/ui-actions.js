import * as UI_ActionTypes from '../Constants/ui-action-types';

export const openConfirmationDialog = payload => {
  return {
    type: UI_ActionTypes.OPEN_CONFIRMATION_DIALOG,
    payload: {
      open: true,
      data: payload,
    },
  };
};

export const closeConfirmationDialog = () => {
  return { type: UI_ActionTypes.CLOSE_CONFIRMATION_DIALOG };
};

export const showActionsPopover = payload => {
  return { type: UI_ActionTypes.SHOW_ACTIONS_POPOVER, payload };
};

export const hideActionsPopover = () => {
  return { type: UI_ActionTypes.HIDE_ACTIONS_POPOVER };
};

export const enableEditMode = payload => {
  return {
    type: UI_ActionTypes.ENABLE_EDIT_MODE,
    payload: {
      enabled: true,
      data: payload,
    },
  };
};

export const disableEditMode = () => {
  return { type: UI_ActionTypes.DISABLE_EDIT_MODE };
};

export const expandLanguageTabsPanel = payload => {
  return {
    type: UI_ActionTypes.EXPAND_LANGUAGE_TABS_PANEL,
    payload: {
      expanded: true,
      itemId: payload,
    },
  };
};

export const collapseLanguageTabsPanel = () => {
  return { type: UI_ActionTypes.COLLAPSE_LANGUAGE_TABS_PANEL };
};

export const editData = payload => {
  return { type: UI_ActionTypes.EDIT_DATA, payload };
};

export const enableInsertMode = payload => {
  return {
    type: UI_ActionTypes.ENABLE_INSERT_MODE,
    payload: {
      enabled: true,
      data: payload,
    },
  };
};

export const disableInsertMode = () => {
  return { type: UI_ActionTypes.DISABLE_INSERT_MODE };
};

export const insertData = payload => {
  return { type: UI_ActionTypes.INSERT_DATA, payload };
};
