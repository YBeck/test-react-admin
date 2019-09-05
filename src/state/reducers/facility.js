// import { facilityTypes } from "../actions/facility";
const initialState = {
  facility: {},
}
export function facilityReducer(state = initialState, action) {    
  const { type } = action;
  switch(type) {
    case "GET_FACILITY_SUCCESS":
      return {
        ...state,
        facility: action.payload.data
      };
    default:
      return state;
  }
}