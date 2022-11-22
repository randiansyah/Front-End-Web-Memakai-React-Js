import { combineReducers } from "redux";
import { roomsReducer } from "./roomsReducer";

const roomsReducers = combineReducers({
  rooms: roomsReducer,
});

export default roomsReducers;
