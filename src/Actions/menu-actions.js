import * as MenuActions from '../Constants/menu-action-types';
import firebaseService from '../Firebase/index';
import { isEmpty } from 'lodash';
import { v1 as uuidv1 } from 'uuid';

const URL_TO_USER_ID_MAPPINGS = '/urlToUserIdMappings';
const LOCALES = 'locales';
const ITEMS = 'items';
const INFO = 'info';

const userMenusPath = userId => `/users/${userId}/menus`;
const getUserId = getState => getState().account.user.userId;

const getUserIdFromUrl = async uniqueUrlPath => {
  const results = await firebaseService.orderByValue(
    URL_TO_USER_ID_MAPPINGS,
    uniqueUrlPath
  );
  const data = results.val();
  return isEmpty(data) ? null : Object.keys(data)[0];
};

export const getMenu = uniqueUrlPath => {
  return async dispatch => {
    let path, results;
    const data = { business: null, menu: null };
    try {
      const userId = await getUserIdFromUrl(uniqueUrlPath);
      if (userId) {
        path = `/users/${userId}`;
        results = await firebaseService.read(`${path}/business`);
        data.business = results.val();
        results = await firebaseService.orderByChild(
          `${path}/menus`,
          'published',
          true
        );
        const list = results.val();
        data.menu = {
          list,
          defaultMenuId: Object.keys(list)[0],
        };
        dispatch({ type: MenuActions.GET_MENU, payload: data });
      } else {
        console.log('Menu not found! TODO: implement some redirect here');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPreviewMenu = menuId => {
  return (dispatch, getState) => {
    const state = getState();
    try {
      const menu = {
        list: state.menus,
        defaultMenuId: menuId,
      };
      dispatch({
        type: MenuActions.GET_MENU,
        payload: { business: state.business, menu },
      });
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
