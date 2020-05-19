import * as BusinessActions from './../Constants/business-action-types';
import { cloneDeep } from 'lodash';

const initialState = null;

function businessReducer(state = initialState, action) {
  switch (action.type) {
    case BusinessActions.GET_BUSINESSES:
      const businesses = action.payload;
      return cloneDeep(businesses);
    default:
      return state;
  }
}

export default businessReducer;
