import { GET_MENU } from './../Constants/menu-action-types';
import { SET_DEFAULT_PUBLIC_LANGUAGE } from './../Constants/ui-action-types';
import { cloneDeep } from 'lodash';

const initialState = {
  settings: {
    defaultLanguage: 'en',
  },
  showHeader: true,
  data: null,
};

function publicReducer(state = initialState, action) {
  state.showHeader = true;
  switch (action.type) {
    case GET_MENU:
      state.data = action.payload;
      break;
    case SET_DEFAULT_PUBLIC_LANGUAGE:
      state.settings.defaultLanguage = action.payload;
      break;
    default:
      return state;
  }
  return cloneDeep(state);
}

export default publicReducer;
