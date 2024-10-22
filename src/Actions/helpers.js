import constants from '../Constants';
import { SET_ERROR } from '../Constants/ui-action-types';

const { ErrorTypes, Locales } = constants;

const getErrorLables = language => Locales[language].Labels.Errors;

const dispatchError = (dispatch, message, type) => {
  dispatch({
    type: SET_ERROR,
    payload: {
      message,
      type,
    },
  });
};

export const dispatchFormValidationError = (dispatch, language, error) => {
  const message = getErrorLables(language).FormValidation[error];
  dispatchError(dispatch, message, ErrorTypes.SERVER_ERROR);
};

export const dispatchGenericError = (dispatch, language) => {
  const message = getErrorLables(language).GENERIC;
  dispatchError(dispatch, message, ErrorTypes.SERVER_ERROR);
};

export const dispatchAuthenticationError = (dispatch, language, error) => {
  let labelName = null;
  const errorLabels = getErrorLables(language);
  switch (error.code) {
    case 'auth/email-already-in-use':
      labelName = 'EMAIL_ALREADY_IN_USE';
      break;
    case 'auth/invalid-action-code':
      labelName = 'INVALID_ACTION_CODE';
      break;
    case 'auth/wrong-password':
      labelName = 'WRONG_PASSWORD';
      break;
    case 'auth/user-not-found':
      labelName = 'USER_NOT_FOUND';
      break;
    default:
      break;
  }
  const message = labelName
    ? errorLabels.Authentication[labelName]
    : errorLabels.GENERIC;
  dispatchError(dispatch, message, ErrorTypes.AUTHENTICATION);
};

export const getUserIdAndLanguage = getState => {
  const {
    ui: {
      settings: { defaultLanguage: language },
    },
    account: {
      user: { userId },
    },
  } = getState();
  return { userId, language };
};
