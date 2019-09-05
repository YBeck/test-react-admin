import { facilityReducer } from "./facility";
import { uiReducer} from "./ui";
import { userReducer} from "./user";

export const reducers = {
  facility: facilityReducer,
  ui: uiReducer,
  user: userReducer,
}