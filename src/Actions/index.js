import * as UserActions from '../Constants/account-action-types';
import { GET_BUSINESSES } from '../Constants/business-action-types';
import { GET_MENUS } from '../Constants/menu-action-types';
import createUserBlueprint from '../Firebase/user-blueprint';
import { v1 as uuidv1 } from 'uuid';
import firebaseService from '../Firebase';
import { dispatchAuthenticationError } from './helpers';
const USERS = '/users';
const URL_TO_BUSINESS_MAPPINGS = '/urlToBusinessMappings';

const setUpStore = (authData, userData, dispatch) => {
  dispatch({ type: GET_MENUS, payload: userData.menus });
  dispatch({ type: GET_BUSINESSES, payload: userData.businesses });
  dispatch({
    type: UserActions.SIGN_IN,
    payload: {
      authData,
      userData,
    },
  });
};

const basicSignIn = async (email, password, dispatch) => {
  const authData = await firebaseService.auth.signInWithEmailAndPassword(
    email,
    password
  );
  const userData = (
    await firebaseService.database.read(`${USERS}/${authData.user.uid}`)
  ).val();
  userData.menus = userData.menus || {};
  Object.keys(userData.businesses).forEach(businessId => {
    const business = userData.businesses[businessId];
    business.media = business.media || {};
  });
  setUpStore(authData, userData, dispatch);
};

export const signInWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch, getState) => {
    let isAuthenticated = false;
    try {
      await basicSignIn(email, password, dispatch);

      isAuthenticated = true;
    } catch (error) {
      const language = getState().public.ui.settings.defaultLanguage;
      dispatchAuthenticationError(dispatch, language, error);
    }
    return isAuthenticated;
  };
};

export const signUp = ({
  firstName,
  lastName,
  email,
  password,
  businessName,
  businessType,
}) => {
  return async (dispatch, getState) => {
    let isAuthenticated = false;
    try {
      const authData = await firebaseService.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const userId = authData.user.uid;
      const businessId = uuidv1();
      const { user, uniqueUrlPath } = createUserBlueprint(
        firstName,
        lastName,
        businessId,
        businessName,
        businessType
      );
      const userData = {
        path: `${USERS}/${userId}`,
        body: user,
      };
      await firebaseService.database.create(userData);

      const urlToBusinessMappingData = {
        path: `${URL_TO_BUSINESS_MAPPINGS}/${uniqueUrlPath}`,
        body: {
          userId,
          businessId,
        },
      };

      await firebaseService.database.create(urlToBusinessMappingData);

      setUpStore(authData, user, dispatch);
      isAuthenticated = true;
    } catch (error) {
      const language = getState().public.ui.settings.defaultLanguage;
      dispatchAuthenticationError(dispatch, language, error);
    }
    return isAuthenticated;
  };
};

export const signOut = () => {
  return async (dispatch, getState) => {
    let isAuthenticated = true;
    try {
      await firebaseService.auth.signOut();
      isAuthenticated = false;
      dispatch({ type: UserActions.SIGN_OUT });
    } catch (error) {
      const language = getState().ui.settings.defaultLanguage;
      dispatchAuthenticationError(dispatch, language, error);
    }
    return isAuthenticated;
  };
};

export const submitResetPasswordRequest = email => {
  return async (dispatch, getState) => {
    try {
      await firebaseService.auth.sendPasswordResetEmail(email);
    } catch (error) {
      const language = getState().public.ui.settings.defaultLanguage;
      dispatchAuthenticationError(dispatch, language, error);
    }
  };
};

export const resetPassword = (actionCode, password, email) => {
  return async (dispatch, getState) => {
    let isAuthenticated = false;
    try {
      await firebaseService.auth.confirmPasswordReset(actionCode, password);
      await basicSignIn(email, password, dispatch);
      isAuthenticated = true;
    } catch (error) {
      const language = getState().public.ui.settings.defaultLanguage;
      dispatchAuthenticationError(dispatch, language, error);
    }
    return isAuthenticated;
  };
};

export const handleAuthOperations = (query, lang) => {
  return async dispatch => {
    const mode = query.get('mode');
    const language = query.get('lang') || lang;
    const actionCode = query.get('oobCode');
    try {
      switch (mode) {
        case 'resetPassword':
          const email = await firebaseService.auth.verifyPasswordResetCode(
            actionCode
          );

          dispatch({
            type: UserActions.COMPLETE_AUTH_OPERATION,
            payload: {
              mode,
              actionCode,
              email,
            },
          });
          return { section: 'reset-password' };
        default:
          return;
      }
    } catch (error) {
      dispatchAuthenticationError(dispatch, language, error);
      return;
    }
  };
};
