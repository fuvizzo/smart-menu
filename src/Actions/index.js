import * as UserActions from '../Constants/account-action-types';
import { GET_BUSINESSES } from '../Constants/business-action-types';
import { GET_MENUS } from '../Constants/menu-action-types';
import createUserBlueprint from '../Firebase/user-blueprint';
import { v1 as uuidv1 } from 'uuid';
import firebaseService from '../Firebase';

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

export function signInWithEmailAndPassword(email, password) {
  return async dispatch => {
    try {
      const authData = await firebaseService.auth.signInWithEmailAndPassword(
        email,
        password
      );
      const userData = (
        await firebaseService.read(`${USERS}/${authData.user.uid}`)
      ).val();

      setUpStore(authData, userData, dispatch);
    } catch (error) {
      console.log(error);
      dispatch({ type: UserActions.SHOW_AUTH_ERROR, payload: error });
    }
  };
}
export function signUp({
  firstName,
  lastName,
  email,
  password,
  businessName,
  businessType,
}) {
  return async dispatch => {
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
      await firebaseService.create(userData);

      const urlToBusinessMappingData = {
        path: `${URL_TO_BUSINESS_MAPPINGS}/${uniqueUrlPath}`,
        body: {
          userId,
          businessId,
        },
      };

      await firebaseService.create(urlToBusinessMappingData);

      setUpStore(authData, user, dispatch);
    } catch (error) {
      console.log(error);
      dispatch({ type: UserActions.SHOW_AUTH_ERROR, payload: error });
    }
  };
}

export function signOut() {
  return async dispatch => {
    try {
      await firebaseService.auth.signOut();
      dispatch({ type: UserActions.SIGN_OUT });
    } catch (error) {
      console.log(error);
      dispatch({ type: UserActions.SHOW_AUTH_ERROR, payload: error });
    }
  };
}
