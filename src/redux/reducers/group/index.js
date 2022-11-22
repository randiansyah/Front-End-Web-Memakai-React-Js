import { combineReducers } from "redux";
import { groupReducer } from "./groupReducer";

const groupReducers = combineReducers({
  group: groupReducer,
});

export default groupReducers;
