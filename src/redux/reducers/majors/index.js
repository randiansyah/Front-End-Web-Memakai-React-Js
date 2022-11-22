import { combineReducers } from "redux";
import { majorsReducer } from "./majorsReducer";

const majorsReducers = combineReducers({
  majors: majorsReducer,
});

export default majorsReducers;
