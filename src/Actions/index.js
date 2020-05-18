import { SIGN_OUT, SIGN_IN } from '../Constants/account-action-types';
import { GET_BUSINESS } from '../Constants/business-action-types';
import { GET_MENUS } from '../Constants/menu-action-types';
import firebaseService from '../Firebase';

const URL_TO_USER_ID_MAPPINGS = '/urlToUserIdMappings';

export function signInWithEmailAndPassword(email, password) {
  return async dispatch => {
    try {
      const data = await firebaseService.auth.signInWithEmailAndPassword(
        email,
        password
      );

      const results = await firebaseService.read(URL_TO_USER_ID_MAPPINGS);
      if (results.val()) {
        data.userData.business.uniqueUrlPath = results.val()[data.authData.uid];
      }
      dispatch({ type: SIGN_IN, payload: data });
      dispatch({ type: GET_MENUS, payload: data.userData.menus });
      dispatch({ type: GET_BUSINESS, payload: data.userData.business });
    } catch (error) {
      console.log(error);
    }
  };
}

export function signOut() {
  return async dispatch => {
    try {
      await firebaseService.auth.signOut();
      dispatch({ type: SIGN_OUT });
    } catch (error) {
      console.log(error);
    }
  };
}
