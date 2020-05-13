import {
  SIGN_OUT,
  SIGN_IN,
  UPDATE_SETTINGS,
} from './../Constants/user-action-types';
import firebaseService from '../Firebase/index';

export function signInWithEmailAndPassword(email, password) {
  return async dispatch => {
    try {
      const data = await firebaseService.auth.signInWithEmailAndPassword(
        email,
        password
      );

      dispatch({ type: SIGN_IN, payload: data });
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

export function updateUserSettings(userId, settings) {
  return async dispatch => {
    try {
      const path = `/users/${userId}/account/settings`;

      const data = {
        path,
        body: settings,
      };

      await firebaseService.update(data);
      dispatch({
        type: UPDATE_SETTINGS,
        payload: { settings },
      });
    } catch (error) {
      console.log(error);
    }
  };
}
