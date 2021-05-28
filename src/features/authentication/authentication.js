/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
  userProfile: {}
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    getToken: (state, action) => {
      state.token = action.payload;
    },
    getUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    checkIsAuthen: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    onLogout: () => ({
      ...initialState
    })
  }
});

export const { getToken, getUserProfile, checkIsAuthen, onLogout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
