import { combineReducers } from "redux";
import { teachersReducer } from "./teachersReducer";

const teachersReducers = combineReducers({
  teachers: teachersReducer,
});

export default teachersReducers;
