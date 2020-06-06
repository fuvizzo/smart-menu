import constants from '../Constants';
import { SET_ERROR } from '../Constants/ui-action-types';
import graphql from 'graphql';
const BACK_END_URL = process.env.REACT_APP_BACK_END_URL;
const { ErrorTypes, Locales } = constants;

const getErrorLables = language => Locales[language].Labels.Errors;

const dispatchError = (dispatch, language, message, type) => {
  dispatch({
    type: SET_ERROR,
    payload: {
      message,
      type,
    },
  });
};

const buildGraphQLRequest = async object =>
  await fetch(BACK_END_URL, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(object),
  });

export const dispatchGenericError = (dispatch, language, error = false) => {
  const message = getErrorLables(language).GENERIC;
  dispatchError(dispatch, language, message, ErrorTypes.SERVER_ERROR);
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
  dispatchError(dispatch, language, message, ErrorTypes.AUTHENTICATION);
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

export const startSession = async userTokenId => {
  const response = await buildGraphQLRequest({
    query: ` mutation StartSession($userTokenId: String!) {
      startSession(userTokenId: $userTokenId)
    }`,
    variables: { userTokenId },
  });
  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
};

export const endSession = async userTokenId => {
  const response = await buildGraphQLRequest({
    query: ` mutation EndSession {
      endSession
    }`,
  });
  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
};
