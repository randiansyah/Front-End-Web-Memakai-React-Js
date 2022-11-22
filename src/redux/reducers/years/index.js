import { combineReducers } from "redux";
import { yearsReducer } from "./yearsReducer";

const yearsReducers = combineReducers({
  years: yearsReducer,
});

export default yearsReducers;
