import { combineReducers } from "redux";
import { classroomsReducer } from "./classroomsReducer";

const classroomReducers = combineReducers({
  classrooms: classroomsReducer,
});

export default classroomReducers;
