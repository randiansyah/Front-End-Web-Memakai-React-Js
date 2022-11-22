import { combineReducers } from "redux";
import { menusReducer } from "./menusReducer";

const menusReducers = combineReducers({
  menus: menusReducer,
});

export default menusReducers;
