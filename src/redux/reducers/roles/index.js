import { combineReducers } from "redux";
import { rolesReducer } from "./rolesReducer";

const rolesReducers = combineReducers({
  roles: rolesReducer,
});

export default rolesReducers;
