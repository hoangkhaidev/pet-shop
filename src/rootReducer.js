/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import { combineReducers } from "@reduxjs/toolkit";
import authenticationReducer from "./features/authentication/authentication";
import roleUserReducer from "./features/roleUser/roleUser";
import parentParamReducer from "./features/parentParam/parentParam";
import statusReducer from "./features/status/status";
import customizationReducer from "./features/customization/customization";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  roleUser: roleUserReducer,
  status: statusReducer,
  parentParam: parentParamReducer,
  customization: customizationReducer,
});

export default rootReducer;
