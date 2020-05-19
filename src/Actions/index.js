import * as UserActions from '../Constants/account-action-types';
import { GET_BUSINESS } from '../Constants/business-action-types';
import { GET_MENUS } from '../Constants/menu-action-types';
import createUserBlueprint from '../Firebase/user-blueprint';
import firebaseService from '../Firebase';

const URL_TO_USER_ID_MAPPINGS = '/urlToUserIdMappings';
const USERS = '/users';

const setUpStore = (authData, userData, dispatch) => {
  dispatch({ type: GET_MENUS, payload: userData.menus });
  dispatch({ type: GET_BUSINESS, payload: userData.business });
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

      const results = await firebaseService.read(URL_TO_USER_ID_MAPPINGS);
      if (results.val()) {
        userData.business.uniqueUrlPath = results.val()[authData.user.uid];
      }
      setUpStore(authData, userData, dispatch);
    } catch (error) {
      console.log(error);
      dispatch({ type: UserActions.SHOW_AUTH_ERROR, payload: error });
    }
  };
}
export function signUp(firstName, lastName, email, password) {
  return async dispatch => {
    try {
      const authData = await firebaseService.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const newUser = createUserBlueprint(firstName, lastName);
      const data = {
        path: `${USERS}/${authData.user.uid}`,
        body: newUser,
      };
      await firebaseService.create(data);

      setUpStore(authData, newUser, dispatch);
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
