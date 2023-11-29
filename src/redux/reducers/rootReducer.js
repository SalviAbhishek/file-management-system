import { combineReducers } from "redux";
import authReducer from "./authReducer";
import filesReducer from "./filesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  files: filesReducer,
});

export default rootReducer;
