import { uiTypes } from "../actions/ui";
const initialState = {
  sidebarCase: null,
}
export function uiReducer(state = initialState, action) {    
  const { type } = action;
  switch(type) {
    case uiTypes.SET_SIDEBAR_ROUTES:
      return {
        ...state,
        sidebarCase: action.caseId
      };
    default:
      return state;
  }
}