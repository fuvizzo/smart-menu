import * as BusinessActions from './../Constants/business-action-types';
import { cloneDeep } from 'lodash';

const initialState = null;

function businessReducer(state = initialState, action) {
  switch (action.type) {
    case BusinessActions.GET_BUSINESS:
      const business = action.payload;
      return cloneDeep(business);
    default:
      return state;
  }
}

export default businessReducer;
