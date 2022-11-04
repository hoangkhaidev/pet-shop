/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { createSlice  } from "@reduxjs/toolkit";

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
      state.isLoggedIn = true;
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

export const { getToken, getUserProfile, checkIsAuthen, onLogout, setToken, deleteToken } = authenticationSlice.actions;

export default authenticationSlice.reducer;
