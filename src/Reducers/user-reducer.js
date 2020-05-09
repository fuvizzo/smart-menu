import { SET_USER_DATA, SIGN_OUT } from './../Constants/actionTypes';
import { cloneDeep } from 'lodash';

const initialState = null;

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_OUT:
      return initialState;
    case SET_USER_DATA:
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
