import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import customizer from "./customizer/";
import auth from "./auth/";
import navbar from "./navbar/Index";
import storage from "redux-persist/lib/storage";
import infos from "./infos/";
import register from "./registers/";
import users from "./users/";
import rooms from "./rooms/";
import menus from "./menus/";
import privillages from "./privileges/";
import classrooms from "./classrooms/";
import group from "./group/";
import curriculum from "./curriculum/";
import roles from "./roles/";
import majors from "./majors/";
import stages from "./stages/";
import years from "./years/";
import course from "./course/";
import teachers from "./teachers/";

const rootReducer = combineReducers({
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  info: infos,
  register,
  users,
  rooms,
  menus,
  privillages,
  classrooms,
  group,
  curriculum,
  roles,
  majors,
  stages,
  years,
  course,
  teachers,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["auth", "register"],
  },
  rootReducer
);

export { rootReducer, persistedReducer };
