import { combineReducers } from "redux";
import { auth } from "./loginReducer";

const authReducers = combineReducers({
  auth,
});

export default authReducers;
