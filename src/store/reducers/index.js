import { combineReducers } from "redux";
import auth from "./auth";
import sidebar from "./sidebar";
import users from "./users";

const reducer = combineReducers({
  auth,
  sidebar,
  users,
});

export default reducer;
