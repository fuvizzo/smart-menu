import {
  GET_MENU,
  CREATE_NEW_MENU_ITEM,
  DELETE_MENU_ITEM,
  UPDATE_MENU_ITEM,
  CREATE_NEW_LOCALE,
  DELETE_LOCALE,
} from '../Constants/action-types';
import firebaseService from '../Firebase/index';
import { sortMap } from '../Helpers/index';
import { v1 as uuidv1 } from 'uuid';

const LOCALES = 'locales';

const userMenuPath = userId => `users/${userId}/menu`;

export const getMenu = () => {
  return async (dispatch, getState) => {
    const userId = getState().user.userId;
    const path = userMenuPath(userId);
    try {
      const results = await firebaseService.read(path);
      const data = results.val();
      const menu = new Map();
      Object.keys(data).forEach(key => {
        menu.set(key, data[key]);
      });
      dispatch({ type: GET_MENU, payload: menu });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sortMenu = menu => {
  return { type: GET_MENU, payload: sortMap(menu) };
};

export const createNewMenuItem = body => {
  return async (dispatch, getState) => {
    const menuItemId = uuidv1();
    const userId = getState().user.userId;
    const path = `${userMenuPath(userId)}/${menuItemId}`;

    const data = {
      path,
      body,
    };
    try {
      await firebaseService.create(data);
      dispatch({ type: CREATE_NEW_MENU_ITEM, payload: [menuItemId, body] });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteMenuItem = menuItemId => {
  return async (dispatch, getState) => {
    const userId = getState().user.userId;
    const path = `${userMenuPath(userId)}/${menuItemId}`;

    try {
      await firebaseService.delete(path);
      dispatch({ type: DELETE_MENU_ITEM, payload: menuItemId });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateMenuItem = (menuItemId, body) => {
  return async (dispatch, getState) => {
    const userId = getState().user.userId;
    const path = `${userMenuPath(userId)}/${menuItemId}`;

    const data = {
      path,
      body,
    };
    try {
      await firebaseService.update(data);
      dispatch({
        type: UPDATE_MENU_ITEM,
        payload: { key: menuItemId, value: body },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createNewLocale = (menuItemId, body) => {
  return async (dispatch, getState) => {
    const userId = getState().user.userId;
    const path = `${userMenuPath(userId)}/${menuItemId}/${LOCALES}/${
      body.lang
    }`;
    const localeData = { ...body };
    delete localeData.lang;
    const data = {
      path,
      body: localeData,
    };
    try {
      await firebaseService.create(data);
      dispatch({
        type: CREATE_NEW_LOCALE,
        payload: {
          key: menuItemId,
          data: localeData,
          lang: body.lang,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteLocale = (menuItemId, lang) => {
  return async (dispatch, getState) => {
    const userId = getState().user.userId;
    const path = `${userMenuPath(userId)}/${menuItemId}/${LOCALES}/${lang}`;

    try {
      await firebaseService.delete(path);

      dispatch({
        type: DELETE_LOCALE,
        payload: {
          key: menuItemId,

          lang,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
