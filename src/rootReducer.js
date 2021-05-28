import { combineReducers } from "@reduxjs/toolkit";
import authenticationReducer from "src/features/authentication/authentication";

const rootReducer = combineReducers({
  authentication: authenticationReducer
});

export default rootReducer;
