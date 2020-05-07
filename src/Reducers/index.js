import {
  SET_DEFAULT_SYSTEM_LANGUAGE,
  SET_USER_DATA,
  SIGN_OUT,
  GET_MENU,
  CREATE_NEW_MENU_ITEM,
  DELETE_MENU_ITEM,
  UPDATE_MENU_ITEM,
  CREATE_NEW_LOCALE,
  DELETE_LOCALE,
} from './../Constants/action-types';

const initialState = {
  settings: {
    defaultLanguage: 'en',
  },
  user: null,
  business: null,
  menu: new Map(),
};

function rootReducer(state = initialState, action) {
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
          refreshToken: action.payload.user.refreshToken,
          creationTime: action.payload.user.metadata.creationTime,
          lastSignInTime: action.payload.user.metadata.lastSignInTime,
        },
      };
      return Object.assign({}, state, {
        user,
        settings: action.payload.account.settings,
      });
    case GET_MENU:
      return Object.assign({}, state, {
        menu: action.payload,
      });
    case CREATE_NEW_MENU_ITEM:
      return Object.assign({}, state, {
        menu: new Map([...state.menu.entries(), action.payload]),
      });
    case DELETE_MENU_ITEM: {
      const menu = new Map(state.menu.entries());
      menu.delete(action.payload);
      return Object.assign({}, state, {
        menu,
      });
    }
    case UPDATE_MENU_ITEM: {
      const menu = new Map(state.menu.entries());
      menu.set(action.payload.key, action.payload.value);
      return Object.assign({}, state, {
        menu,
      });
    }
    case CREATE_NEW_LOCALE: {
      const menu = new Map(state.menu.entries());
      const menuItem = menu.get(action.payload.key);
      menuItem.locales[action.payload.lang] = action.payload.data;
      return Object.assign({}, state, {
        menu,
      });
    }
    case DELETE_LOCALE: {
      const menu = new Map(state.menu.entries());
      const menuItem = menu.get(action.payload.key);
      delete menuItem.locales[action.payload.lang];
      return Object.assign({}, state, {
        menu,
      });
    }

    default:
      return state;
  }
}

export default rootReducer;
