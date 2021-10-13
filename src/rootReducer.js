import { combineReducers } from "@reduxjs/toolkit";
import authenticationReducer from "src/features/authentication/authentication";
import roleUserReducer from "src/features/roleUser/roleUser";
import parentParamReducer from "src/features/parentParam/parentParam";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  roleUser: roleUserReducer,
  parentParam: parentParamReducer,
});

export default rootReducer;
