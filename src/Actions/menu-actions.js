import * as MenuActions from '../Constants/menu-action-types';
import firebaseService from '../Firebase/index';

import { v1 as uuidv1 } from 'uuid';

const URL_TO_USER_ID_MAPPINGS = '/urlToUserIdMappings';
const LOCALES = 'locales';
const ITEMS = 'items';
const INFO = 'info';

const userMenusPath = userId => `/users/${userId}/menus`;
const getUserId = getState => getState().account.user.userId;

export const getMenu = uniqueUrlPath => {
  return async dispatch => {
    let path, results;
    const data = { business: null, menus: null };
    try {
      results = await firebaseService.orderByValue(
        URL_TO_USER_ID_MAPPINGS,
        uniqueUrlPath
      );
      const userId = Object.keys(results.val())[0];
      path = `/users/${userId}`;
      results = await firebaseService.read(`${path}/business`);
      data.business = results.val();
      results = await firebaseService.orderByChild(
        `${path}/menus`,
        'published',
        true
      );
      data.menus = results.val();
      dispatch({ type: MenuActions.GET_MENU, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const togglePublishedStatus = (menuId, published) => {
  return async (dispatch, getState) => {
    const userId = getUserId(getState);
    const path = `${userMenusPath(userId)}/${menuId}`;
    const data = {
      path,
      body: { published },
    };
    try {
      await firebaseService.update(data);
      dispatch({
        type: MenuActions.TOGGLE_PUBLISHED,
        payload: { menuId },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sortMenu = menuId => {
  return { type: MenuActions.SORT_MENU, payload: menuId };
};

export const createNewMenu = body => {
  return async (dispatch, getState) => {
    const userId = getUserId(getState);
    const menuId = uuidv1();
    const path = `${userMenusPath(userId)}/${menuId}`;
    const data = {
      path,
      body,
    };
    try {
      await firebaseService.create(data);
      dispatch({
        type: MenuActions.CREATE_MENU,
        payload: { menuId, value: body },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteMenu = menuId => {
  return async (dispatch, getState) => {
    const userId = getUserId(getState);
    const path = `${userMenusPath(userId)}/${menuId}`;

    try {
      await firebaseService.delete(path);
      dispatch({
        type: MenuActions.DELETE_MENU,
        payload: { menuId },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createNewMenuItem = (menuId, body) => {
  return async (dispatch, getState) => {
    const menuItemId = uuidv1();
    const userId = getUserId(getState);
    const path = `${userMenusPath(userId)}/${menuId}/${ITEMS}/${menuItemId}`;

    const data = {
      path,
      body,
    };
    try {
      await firebaseService.create(data);
      dispatch({
        type: MenuActions.CREATE_NEW_MENU_ITEM,
        payload: { menuId, menuItemId, value: body },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteMenuItem = (menuId, menuItemId) => {
  return async (dispatch, getState) => {
    const userId = getUserId(getState);
    const path = `${userMenusPath(userId)}/${menuId}/${ITEMS}/${menuItemId}`;

    try {
      await firebaseService.delete(path);
      dispatch({
        type: MenuActions.DELETE_MENU_ITEM,
        payload: { menuId, menuItemId },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateMenuItem = (menuId, menuItemId, body) => {
  return async (dispatch, getState) => {
    const userId = getUserId(getState);
    const path = `${userMenusPath(userId)}/${menuId}/${ITEMS}/${menuItemId}`;

    const data = {
      path,
      body,
    };
    try {
      await firebaseService.update(data);
      dispatch({
        type: MenuActions.UPDATE_MENU_ITEM,
        payload: { menuId, menuItemId, value: body },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const createNewMenuItemLocale = (menuId, menuItemId, body) => {
  return async (dispatch, getState) => {
    const userId = getUserId(getState);
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
        type: MenuActions.CREATE_NEW_MENU_ITEM_LOCALE,
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

export const deleteMenuItemLocale = (menuId, menuItemId, lang) => {
  return async (dispatch, getState) => {
    const userId = getUserId(getState);
    const path = `${userMenusPath(
      userId
    )}/${menuId}/${ITEMS}/${menuItemId}/${LOCALES}/${lang}`;

    try {
      await firebaseService.delete(path);

      dispatch({
        type: MenuActions.DELETE_MENU_ITEM_LOCALE,
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

export const createNewLocaleMenuInfo = (menuId, body) => {
  return async (dispatch, getState) => {
    const userId = getUserId(getState);
    const path = `${userMenusPath(userId)}/${menuId}/${INFO}/${LOCALES}/${
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
        type: MenuActions.CREATE_NEW_MENU_INFO_LOCALE,
        payload: {
          menuId,
          data: localeData,
          lang: body.lang,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateMenuInfo = (menuId, body) => {
  return async (dispatch, getState) => {
    const userId = getUserId(getState);
    const path = `${userMenusPath(userId)}/${menuId}/${INFO}`;

    const data = {
      path,
      body,
    };
    try {
      await firebaseService.update(data);
      dispatch({
        type: MenuActions.UPDATE_MENU_INFO,
        payload: { menuId, value: body },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteMenuInfoLocale = (menuId, lang) => {
  return async (dispatch, getState) => {
    const userId = getUserId(getState);
    const path = `${userMenusPath(
      userId
    )}/${menuId}/${INFO}/${LOCALES}/${lang}`;

    try {
      await firebaseService.delete(path);

      dispatch({
        type: MenuActions.DELETE_MENU_INFO_LOCALE,
        payload: {
          menuId,
          lang,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
