import { userTypes } from '../actions/user';
const initialState = {
  profile: null,
};
export function userReducer(state = initialState, action) {
  const { type } = action;  
  switch (type) {
    case userTypes.STORE_USER_PROFILE:     
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
}
