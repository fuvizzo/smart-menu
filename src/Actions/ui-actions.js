import * as UI_Actions from '../Constants/ui-action-types';

export const openConfirmationDialog = (payload, childItem = false) => {
  return {
    type: UI_Actions.OPEN_CONFIRMATION_DIALOG,
    payload: {
      childItem,
      open: true,
      data: payload,
    },
  };
};

export const closeConfirmationDialog = () => {
  return { type: UI_Actions.CLOSE_CONFIRMATION_DIALOG };
};

export const showActionsPopover = payload => {
  return { type: UI_Actions.SHOW_ACTIONS_POPOVER, payload };
};

export const hideActionsPopover = () => {
  return { type: UI_Actions.HIDE_ACTIONS_POPOVER };
};

export const enableEditMode = (payload, childItem = false) => {
  return {
    type: UI_Actions.ENABLE_EDIT_MODE,
    payload: {
      childItem,
      enabled: true,
      data: payload,
    },
  };
};

export const disableEditMode = () => {
  return { type: UI_Actions.DISABLE_EDIT_MODE };
};

export const expandLanguageTabsPanel = payload => {
  return {
    type: UI_Actions.EXPAND_LANGUAGE_TABS_PANEL,
    payload: {
      expanded: true,
      itemId: payload,
    },
  };
};

export const collapseLanguageTabsPanel = () => {
  return { type: UI_Actions.COLLAPSE_LANGUAGE_TABS_PANEL };
};

export const editData = payload => {
  return { type: UI_Actions.EDIT_DATA, payload };
};

export const enableInsertMode = (payload, childItem = false) => {
  return {
    type: UI_Actions.ENABLE_INSERT_MODE,
    payload: {
      childItem,
      enabled: true,
      data: payload,
    },
  };
};

export const disableInsertMode = () => {
  return { type: UI_Actions.DISABLE_INSERT_MODE };
};

export const insertData = payload => {
  return { type: UI_Actions.INSERT_DATA, payload };
};

export const setMenuEditorTabsPanelIndex = payload => {
  return { type: UI_Actions.SET_MENU_EDITOR_TABS_PANEL_INDEX, payload };
};

export const setDashboardDrawerOpen = payload => {
  return { type: UI_Actions.SET_DASHBOARD_DRAWER_OPEN, payload };
};

export const setDefaultSystemLanguage = payload => {
  return { type: UI_Actions.SET_DEFAULT_SYSTEM_LANGUAGE, payload };
};

export const setError = payload => {
  return { type: UI_Actions.SET_ERROR, payload };
};

export const setDefaultPublicLanguage = payload => {
  return { type: UI_Actions.SET_DEFAULT_PUBLIC_LANGUAGE, payload };
};
