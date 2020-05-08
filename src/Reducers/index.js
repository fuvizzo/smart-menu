import {
  SET_DEFAULT_SYSTEM_LANGUAGE,
  SET_USER_DATA,
  SIGN_OUT,
  GET_MENU,
  GET_MENUS,
  CREATE_NEW_MENU_ITEM,
  DELETE_MENU_ITEM,
  UPDATE_MENU_ITEM,
  CREATE_NEW_LOCALE,
  DELETE_LOCALE,
} from './../Constants/actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
  settings: {
    defaultLanguage: 'en',
  },
  user: null,
  business: null,
  menus: {},
};

function rootReducer(state = initialState, action) {
  const newState = cloneDeep(state);

  switch (action.type) {
    case SET_DEFAULT_SYSTEM_LANGUAGE:
      return Object.assign({}, state, {
        settings: {
          defaultLanguage: action.payload,
        },
      });
    case SIGN_OUT:
      return Object.assign({}, state, initialState);
    case SET_USER_DATA:
      const user = {
        ...action.payload.account.user,
        ...{
          userId: action.payload.user.uid,
          email: action.payload.user.email,
          creationTime: action.payload.user.metadata.creationTime,
          lastSignInTime: action.payload.user.metadata.lastSignInTime,
        },
      };
      return Object.assign({}, state, {
        user,
        settings: action.payload.account.settings,
      });

    case GET_MENUS:
      newState.menus = action.payload;
      return newState;
    case CREATE_NEW_MENU_ITEM:
      newState.menus[action.payload.menuId].items[action.payload.menuItemId] =
        action.payload.value;
      return newState;
    case DELETE_MENU_ITEM: {
      delete newState.menus[action.payload.menuId].items[
        action.payload.menuItemId
      ];
      return newState;
    }
    case UPDATE_MENU_ITEM:
      newState.menus[action.payload.menuId].items[action.payload.menuItemId] =
        action.payload.value;
      return newState;

    case CREATE_NEW_LOCALE:
      newState.menus[action.payload.menuId].items[
        action.payload.menuItemId
      ].locales[action.payload.lang] = action.payload.data;
      return newState;

    case DELETE_LOCALE: {
      delete newState.menus[action.payload.menuId].items[
        action.payload.menuItemId
      ].locales[action.payload.lang];
      return newState;
    }

    default:
      return state;
  }
}

export default rootReducer;
