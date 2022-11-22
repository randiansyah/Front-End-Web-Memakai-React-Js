import { combineReducers } from "redux";
import { privillagesReducer } from "./privilegesReducer";

const privillages = combineReducers({
  privillages: privillagesReducer,
});

export default privillages;
