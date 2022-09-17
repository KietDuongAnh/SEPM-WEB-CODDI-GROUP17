import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import courses from "./courses";

export default combineReducers({
  auth,
  message,
  courses,
});
