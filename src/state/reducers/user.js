import { userTypes } from '../actions/user';
const initialState = {
  profile: null,
};
export function userReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case userTypes.GET_USER_PROFILE:          
      return {
        ...state,
        profile: action.payload,
      };
    case userTypes.CLEAR_USER_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
}
