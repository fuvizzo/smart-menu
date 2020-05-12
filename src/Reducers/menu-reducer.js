import {
  GET_MENUS,
  SORT_MENU,
  CREATE_NEW_MENU_ITEM,
  DELETE_MENU_ITEM,
  UPDATE_MENU_ITEM,
  CREATE_NEW_LOCALE,
  DELETE_LOCALE,
} from './../Constants/menu-action-types';
import { cloneDeep } from 'lodash';
import { sort } from '../Helpers/index';
const initialState = {};

function menuReducer(state = initialState, action) {
  if (action.type === GET_MENUS) return cloneDeep(action.payload);
  else {
    const menus = cloneDeep(state);
    switch (action.type) {
      case SORT_MENU:
        const menuItems = menus[action.payload].items;
        menus[action.payload].items = sort(menuItems);
        return menus;
      case CREATE_NEW_MENU_ITEM:
        menus[action.payload.menuId].items[action.payload.menuItemId] =
          action.payload.value;
        return menus;
      case DELETE_MENU_ITEM: {
        delete menus[action.payload.menuId].items[action.payload.menuItemId];
        return menus;
      }
      case UPDATE_MENU_ITEM:
        menus[action.payload.menuId].items[action.payload.menuItemId] =
          action.payload.value;
        return menus;

      case CREATE_NEW_LOCALE:
        menus[action.payload.menuId].items[action.payload.menuItemId].locales[
          action.payload.lang
        ] = action.payload.data;
        return menus;

      case DELETE_LOCALE: {
        delete menus[action.payload.menuId].items[action.payload.menuItemId]
          .locales[action.payload.lang];
        return menus;
      }
      default:
        return state;
    }
  }
}

export default menuReducer;
