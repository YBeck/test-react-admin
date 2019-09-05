export const userTypes = {
  STORE_USER_PROFILE: 'STORE_USER_PROFILE',
};

export const userActions = {
  storeProfile(profile) {        
    return { type: userTypes.STORE_USER_PROFILE, profile };
  },
};
