import * as BusinessActions from './../Constants/business-action-types';
import { cloneDeep } from 'lodash';

const initialState = null;

function businessReducer(state = initialState, action) {
  switch (action.type) {
    case BusinessActions.GET_BUSINESSES:
      state = action.payload;
      break;
    case BusinessActions.UPDATE_BUSINESS:
      state[action.payload.businessId] = action.payload.value;
      break;
    default:
      return state;
  }
  return cloneDeep(state);
}

export default businessReducer;
