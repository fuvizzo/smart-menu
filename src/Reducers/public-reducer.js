import { GET_MENU } from '../Constants/menu-action-types';
import { SET_DEFAULT_PUBLIC_LANGUAGE } from '../Constants/ui-action-types';
import { COMPLETE_AUTH_OPERATION } from '../Constants/account-action-types';
import { cloneDeep } from 'lodash';

const initialState = {
  ui: {
    settings: {
      defaultLanguage: 'en',
    },
  },
  authOperation: null,
  data: null,
};

function publicReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MENU:
      state.data = action.payload;
      break;
    case SET_DEFAULT_PUBLIC_LANGUAGE:
      state.settings.ui.defaultLanguage = action.payload;
      break;
    case COMPLETE_AUTH_OPERATION:
      state.authOperation = action.payload;
      break;
    default:
      return state;
  }
  return cloneDeep(state);
}

export default publicReducer;
