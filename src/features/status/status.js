/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resultStatus: "",
  backendClientVersion: "",
  isReloadPage: false,
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    updateResultStatus: (state, action) => {
      state.resultStatus = action.payload;
    },
    onReloadPage: (state, action) => {
      state.isReloadPage = action.payload;
    },
  }
});

export const { updateResultStatus, onReloadPage } = statusSlice.actions;

export default statusSlice.reducer;
