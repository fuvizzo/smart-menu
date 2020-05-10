import { SIGN_IN, SIGN_OUT } from './../Constants/user-action-types';
import { cloneDeep } from 'lodash';

const initialState = null;

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_OUT:
      return initialState;
    case SIGN_IN:
      const user = {
        ...action.payload.account.user,
        ...{
          userId: action.payload.user.uid,
          email: action.payload.user.email,
          creationTime: action.payload.user.metadata.creationTime,
          lastSignInTime: action.payload.user.metadata.lastSignInTime,
        },
      };
      return cloneDeep(user);
    default:
      return state;
  }
}

export default userReducer;
