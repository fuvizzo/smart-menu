import * as MenuActions from './../Constants/menu-action-types';
import { cloneDeep } from 'lodash';
import { sort, mockUnlocalizedMenus } from '../Helpers/index';
const initialState = {};

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case MenuActions.GET_MENUS:
      state = action.payload;
      break;
    case MenuActions.SORT_MENU:
      const menuItems = state[action.payload].items;
      state[action.payload].items = sort(menuItems);
      break;
    case MenuActions.MOCK_UNLOCALIZED_MENUS:
      state = mockUnlocalizedMenus(
        action.payload.menus,
        action.payload.defaultLanguage
      );
      break;
    case MenuActions.CREATE_MENU:
      state[action.payload.menuId] = action.payload.value;
      break;
    case MenuActions.DELETE_MENU:
      delete state[action.payload.menuId];
      break;
    case MenuActions.CREATE_NEW_MENU_ITEM:
      state[action.payload.menuId].items[action.payload.menuItemId] =
        action.payload.value;
      break;
    case MenuActions.DELETE_MENU_ITEM:
      delete state[action.payload.menuId].items[action.payload.menuItemId];
      break;
    case MenuActions.UPDATE_MENU_ITEM:
      state[action.payload.menuId].items[action.payload.menuItemId] =
        action.payload.value;
      break;
    case MenuActions.TOGGLE_PUBLISHED:
      const published = state[action.payload.menuId].published;
      state[action.payload.menuId].published = !published;
      break;
    case MenuActions.CREATE_NEW_MENU_ITEM_LOCALE:
      state[action.payload.menuId].items[action.payload.menuItemId].locales[
        action.payload.lang
      ] = action.payload.data;
      break;
    case MenuActions.DELETE_MENU_ITEM_LOCALE:
      delete state[action.payload.menuId].items[action.payload.menuItemId]
        .locales[action.payload.lang];
      break;
    case MenuActions.UPDATE_MENU_INFO:
      state[action.payload.menuId].info = action.payload.value;
      break;
    case MenuActions.CREATE_NEW_MENU_INFO_LOCALE:
      state[action.payload.menuId].info.locales[action.payload.lang] =
        action.payload.data;
      break;
    case MenuActions.DELETE_MENU_INFO_LOCALE:
      delete state[action.payload.menuId].info.locales[action.payload.lang];
      break;
    default:
      return state;
  }
  return cloneDeep(state);
}

export default menuReducer;
