import { combineReducers } from "redux";
import { infos } from "./infos";

const infoReducers = combineReducers({
  infos,
});

export default infoReducers;
