import { combineReducers } from "redux";
import { curriculumReducer } from "./curriculumReducer";

const curriculumReducers = combineReducers({
  curriculum: curriculumReducer,
});

export default curriculumReducers;
