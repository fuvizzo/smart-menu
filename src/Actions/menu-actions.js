import * as MenuActions from '../Constants/menu-action-types';
import firebaseService from '../Firebase/index';
import { dispatchGenericError, getUserIdAndLanguage } from './helpers';

import { v1 as uuidv1 } from 'uuid';

const URL_TO_BUSINESS_MAPPINGS = '/urlToBusinessMappings';
const LOCALES = 'locales';
const ITEMS = 'items';
const INFO = 'info';

const userMenusPath = userId => `/users/${userId}/menus`;

export const getMenu = uniqueUrlPath => {
  return async (dispatch, getState) => {
    let path, results;
    const data = { business: null, menu: null };
    try {
      results = await firebaseService.read(
        `${URL_TO_BUSINESS_MAPPINGS}/${uniqueUrlPath}`
      );
      const mapping = results.val();

      if (mapping) {
        const { userId, businessId } = mapping;
        path = `/users/${userId}`;
        results = await firebaseService.read(
          `${path}/businesses/${businessId}`
        );
        data.business = results.val();

        results = await firebaseService
          .orderByChild(`${path}/menus`, 'published', true)
          .read();
        const list = results.val();
        if (list) {
          data.menu = {
            list,
            defaultMenuId: Object.keys(list)[0],
          };
          dispatch({ type: MenuActions.GET_MENU, payload: data });
        } else {
          dispatch({ type: MenuActions.GET_MENU, payload: { notFound: true } });
        }
      } else {
        dispatch({ type: MenuActions.GET_MENU, payload: { notFound: true } });
      }
    } catch (error) {
      const language = getState().public.ui.settings.defaultLanguage;
      dispatchGenericError(dispatch, language);
    }
  };
};

export const getPreviewMenu = menuId => {
  return (dispatch, getState) => {
    const state = getState();
    try {
      let businessId;
      if (menuId) {
        businessId = state.menus[menuId].businessId;
      }
      const business = businessId
        ? state.businesses[businessId]
        : Object.values(state.businesses)[0];
      const menu = {
        list: state.menus,
        defaultMenuId: menuId,
      };
      dispatch({
        type: MenuActions.GET_MENU,
        payload: { business, menu },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const togglePublishedStatus = (menuId, published) => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
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
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const sortMenu = menuId => {
  return { type: MenuActions.SORT_MENU, payload: menuId };
};

export const mockUnlocalizedMenus = defaultLanguage => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
    try {
      const menus = (await firebaseService.read(userMenusPath(userId))).val();
      dispatch({
        type: MenuActions.MOCK_UNLOCALIZED_MENUS,
        payload: {
          menus,
          defaultLanguage,
        },
      });
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const setProvidedLanguages = (menuId, providedLanguages) => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
    const path = `${userMenusPath(userId)}/${menuId}`;
    const data = {
      path,
      body: { providedLanguages },
    };
    try {
      await firebaseService.update(data);
      dispatch({
        type: MenuActions.SET_PROVIDED_LANGUAGES,
        payload: { menuId, value: providedLanguages },
      });
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const createNewMenu = body => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
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
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const deleteMenu = menuId => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
    const path = `${userMenusPath(userId)}/${menuId}`;

    try {
      await firebaseService.delete(path);
      dispatch({
        type: MenuActions.DELETE_MENU,
        payload: { menuId },
      });
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const createNewMenuItem = (menuId, body) => {
  return async (dispatch, getState) => {
    const menuItemId = uuidv1();
    const { userId, language } = getUserIdAndLanguage(getState);
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
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const deleteMenuItem = (menuId, menuItemId) => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
    const path = `${userMenusPath(userId)}/${menuId}/${ITEMS}/${menuItemId}`;

    try {
      await firebaseService.delete(path);
      dispatch({
        type: MenuActions.DELETE_MENU_ITEM,
        payload: { menuId, menuItemId },
      });
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const updateMenuItem = (menuId, menuItemId, body) => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
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
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const createNewMenuItemLocale = (menuId, menuItemId, body) => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
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
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const deleteMenuItemLocale = (menuId, menuItemId, lang) => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
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
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const createNewLocaleMenuInfo = (menuId, body) => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
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
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const updateMenuInfo = (menuId, body) => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);
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
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};

export const deleteMenuInfoLocale = (menuId, lang) => {
  return async (dispatch, getState) => {
    const { userId, language } = getUserIdAndLanguage(getState);

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
      return true;
    } catch (error) {
      dispatchGenericError(dispatch, language);
    }
    return false;
  };
};
