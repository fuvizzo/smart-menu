import * as MenuActions from './../Constants/menu-action-types';
import { cloneDeep } from 'lodash';
import { sort } from '../Helpers/index';
const initialState = {};

function menuReducer(state = initialState, action) {
  if (action.type === MenuActions.GET_MENUS) return cloneDeep(action.payload);
  else {
    const menus = cloneDeep(state);
    switch (action.type) {
      case MenuActions.SORT_MENU:
        const menuItems = menus[action.payload].items;
        menus[action.payload].items = sort(menuItems);
        return menus;
      case MenuActions.CREATE_MENU:
        menus[action.payload.menuId] = action.payload.value;
        return menus;
      case MenuActions.DELETE_MENU:
        delete menus[action.payload.menuId];
        return menus;
      case MenuActions.CREATE_NEW_MENU_ITEM:
        menus[action.payload.menuId].items[action.payload.menuItemId] =
          action.payload.value;
        return menus;
      case MenuActions.DELETE_MENU_ITEM:
        delete menus[action.payload.menuId].items[action.payload.menuItemId];
        return menus;
      case MenuActions.UPDATE_MENU_ITEM:
        menus[action.payload.menuId].items[action.payload.menuItemId] =
          action.payload.value;
        return menus;
      case MenuActions.TOGGLE_PUBLISHED:
        const published = menus[action.payload.menuId].published;
        menus[action.payload.menuId].published = !published;
        return menus;
      case MenuActions.CREATE_NEW_MENU_ITEM_LOCALE:
        menus[action.payload.menuId].items[action.payload.menuItemId].locales[
          action.payload.lang
        ] = action.payload.data;
        return menus;
      case MenuActions.DELETE_MENU_ITEM_LOCALE:
        delete menus[action.payload.menuId].items[action.payload.menuItemId]
          .locales[action.payload.lang];
        return menus;
      case MenuActions.UPDATE_MENU_INFO:
        menus[action.payload.menuId].info = action.payload.value;
        return menus;
      case MenuActions.CREATE_NEW_MENU_INFO_LOCALE:
        menus[action.payload.menuId].info.locales[action.payload.lang] =
          action.payload.data;
        return menus;
      case MenuActions.DELETE_MENU_INFO_LOCALE:
        delete menus[action.payload.menuId].info.locales[action.payload.lang];
        return menus;
      default:
        return state;
    }
  }
}

export default menuReducer;
