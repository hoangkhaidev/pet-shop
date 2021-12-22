/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account_type: null,
    display_name: null,
    id: null,
    username: null,
    permission_groups: [],
};

export const authenticationSlice = createSlice({
  name: "roleUser",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.account_type = action.payload.account_type;
      state.display_name = action.payload.display_name;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.permission_groups = action.payload.permission_groups;
    },
  }
});

export const { getUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;