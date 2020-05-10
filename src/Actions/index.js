import { SIGN_OUT, SIGN_IN } from './../Constants/user-action-types';
import firebaseService from '../Firebase/index';

export function setDefaultSystemLanguage() {}

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
