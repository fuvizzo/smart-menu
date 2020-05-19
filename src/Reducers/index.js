import uiReducer from './ui-reducer';
import accountReducer from './account-reducer';
import menuReducer from './menu-reducer';
import businessReducer from './business-reducer';

import { GET_MENU } from './../Constants/menu-action-types';
import { cloneDeep } from 'lodash';

const initialState = {
  settings: {
    defaultLanguage: 'en',
  },
  data: null,
};

function publicReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MENU:
      state.data = action.payload;
      break;

    default:
      return state;
  }
  return cloneDeep(state);
}

export {
  publicReducer,
  uiReducer,
  accountReducer,
  businessReducer,
  menuReducer,
};
