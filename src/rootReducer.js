import { combineReducers } from "@reduxjs/toolkit";
import authenticationReducer from "src/features/authentication/authentication";
import roleUserReducer from "src/features/roleUser/roleUser";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  roleUser: roleUserReducer,
});

export default rootReducer;
