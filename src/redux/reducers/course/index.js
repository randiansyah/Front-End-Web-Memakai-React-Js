import { combineReducers } from "redux";
import { courseReducer } from "./courseReducer";

const courseReducers = combineReducers({
  course: courseReducer,
});

export default courseReducers;
