import { SIGN_IN, SIGN_OUT } from '../Constants/account-action-types';
import { cloneDeep } from 'lodash';

const initialState = null;

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_OUT:
      return initialState;
    case SIGN_IN:
      const user = {
        ...action.payload.userData.account.user,
        ...{
          userId: action.payload.authData.uid,
          email: action.payload.authData.email,
          creationTime: action.payload.authData.metadata.creationTime,
          lastSignInTime: action.payload.authData.metadata.lastSignInTime,
        },
      };
      return cloneDeep({
        user,
        subscriptionStatus: action.payload.userData.account.subscriptionStatus,
      });
    default:
      return state;
  }
}

export default accountReducer;
