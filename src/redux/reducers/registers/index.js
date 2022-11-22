import { combineReducers } from "redux";
import { register } from "./registerReducer";

const registerReducers = combineReducers({
  register,
});

export default registerReducers;
