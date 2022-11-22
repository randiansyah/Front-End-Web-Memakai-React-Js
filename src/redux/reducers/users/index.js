import { combineReducers } from "redux";
import { users } from "./usersReducer";

const userReducers = combineReducers({
  users,
});

export default userReducers;
