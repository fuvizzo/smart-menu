import uiReducer from './ui-reducer';
import userReducer from './user-reducer';
import menuReducer from './menu-reducer';

import { GET_MENU } from './../Constants/menu-action-types';
import { cloneDeep } from 'lodash';

const initialState = {};

function publicReducer(state = initialState, action) {
  const newState = cloneDeep(state);

  switch (action.type) {
    case GET_MENU:
      newState.data = action.payload;
      return newState;

    default:
      return state;
  }
}

export { publicReducer, uiReducer, userReducer, menuReducer };
