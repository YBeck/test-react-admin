export const uiTypes = {
  SET_SIDEBAR_ROUTES: 'SET_SIDEBAR_ROUTES',
};

export const uiActions = {
  updateSidebar(caseId) {
    return { type: uiTypes.SET_SIDEBAR_ROUTES, caseId };
  },
};
