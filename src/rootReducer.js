import { combineReducers } from "@reduxjs/toolkit";
import authenticationReducer from "src/features/authentication/authentication";
import roleUserReducer from "src/features/roleUser/roleUser";
import parentParamReducer from "src/features/parentParam/parentParam";
import statusReducer from "src/features/status/status";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  roleUser: roleUserReducer,
  status: parentParamReducer,
  parentParam: statusReducer,
});

export default rootReducer;
