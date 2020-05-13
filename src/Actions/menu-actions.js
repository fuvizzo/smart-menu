import {
  GET_PUBLISHED_MENU,
  SORT_MENU,
  GET_MENUS,
  CREATE_NEW_MENU_ITEM,
  DELETE_MENU_ITEM,
  UPDATE_MENU_ITEM,
  CREATE_NEW_LOCALE,
  DELETE_LOCALE,
} from '../Constants/menu-action-types';
import firebaseService from '../Firebase/index';

import { v1 as uuidv1 } from 'uuid';

const LOCALES = 'locales';
const ITEMS = 'items';
const INFO = 'info';
const userMenusPath = userId => `/users/${userId}/menus`;

export const getMenus = () => {
  return async (dispatch, getState) => {
    const userId = getState().user.userId;
    const path = userMenusPath(userId);
    try {
      const results = await firebaseService.read(path);
      const data = results.val();
      dispatch({ type: GET_MENUS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPublishedMenu = (userId, menuId) => {
  return async dispatch => {
    try {
      const path = `/users/${userId}/menus/${menuId}`;
      const results = await firebaseService.read(path);
      const data = results.val();

      dispatch({ type: GET_PUBLISHED_MENU, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sortMenu = menuId => {
  return { type: SORT_MENU, payload: menuId };
};

export const createNewMenuItem = (menuId, body) => {
  return async (dispatch, getState) => {
    const menuItemId = uuidv1();
    const userId = getState().user.userId;
    const path = `${userMenusPath(userId)}/${menuId}/${ITEMS}/${menuItemId}`;

    const data = {
      path,
      body,
    };
    try {
      await firebaseService.create(data);
      dispatch({
        type: CREATE_NEW_MENU_ITEM,
        payload: { menuId, menuItemId, value: body },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteMenuItem = (menuId, menuItemId) => {
  return async (dispatch, getState) => {
    const userId = getState().user.userId;
    const path = `${userMenusPath(userId)}/${menuId}/${ITEMS}/${menuItemId}`;

    try {
      await firebaseService.delete(path);
      dispatch({ type: DELETE_MENU_ITEM, payload: { menuId, menuItemId } });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateMenuItem = (menuId, menuItemId, body) => {
  return async (dispatch, getState) => {
    const userId = getState().user.userId;
    const path = `${userMenusPath(userId)}/${menuId}/${ITEMS}/${menuItemId}`;

    const data = {
      path,
      body,
    };
    try {
      await firebaseService.update(data);
      dispatch({
        type: UPDATE_MENU_ITEM,
        payload: { menuId, menuItemId, value: body },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createNewLocale = (menuId, menuItemId, body) => {
  return async (dispatch, getState) => {
    const userId = getState().user.userId;
    const path = `${userMenusPath(
      userId
    )}/${menuId}/${ITEMS}/${menuItemId}/${LOCALES}/${body.lang}`;
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
          menuId,
          menuItemId,
          data: localeData,
          lang: body.lang,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteLocale = (menuId, menuItemId, lang) => {
  return async (dispatch, getState) => {
    const userId = getState().user.userId;
    const path = `${userMenusPath(
      userId
    )}/${menuId}/${ITEMS}/${menuItemId}/${LOCALES}/${lang}`;

    try {
      await firebaseService.delete(path);

      dispatch({
        type: DELETE_LOCALE,
        payload: {
          menuId,
          menuItemId,
          lang,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
