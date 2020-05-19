import { SIGN_IN, SIGN_OUT } from '../Constants/account-action-types';
import { cloneDeep } from 'lodash';

const initialState = null;

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_OUT:
      return initialState;
    case SIGN_IN:
      const {
        uid: userId,
        email,
        metadata: { creationTime, lastSignInTime },
      } = action.payload.authData.user;
      const user = {
        ...action.payload.userData.account.user,
        ...{
          userId,
          email,
          creationTime,
          lastSignInTime,
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
