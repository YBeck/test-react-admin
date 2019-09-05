import { authClient } from '../../server';
export const userTypes = {
  GET_USER_PROFILE: 'GET_USER_PROFILE',
  CLEAR_USER_PROFILE: 'CLEAR_USER_PROFILE',
};

export const userActions = {
  getUserProfile(profile) {
    return async dispatch => {
      const response = await authClient.get('/users/profile');
      if (response.error) {
        return null;
      }
      dispatch({
        type: userTypes.GET_USER_PROFILE,
        payload: response.json,
      });
    };
  },
  clearUserRofile() {
    return {
      type: userTypes.CLEAR_USER_PROFILE,
    };
  },
};
