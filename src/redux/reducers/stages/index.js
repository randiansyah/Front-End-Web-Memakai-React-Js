import { combineReducers } from "redux";
import { stagesReducer } from "./stagesReducer";

const stagesReducers = combineReducers({
  stages: stagesReducer,
});

export default stagesReducers;
