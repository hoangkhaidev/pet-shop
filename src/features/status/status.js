/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resultStatus: "",
  backendClientVersion: "",
  isReloadPage: false,
};

export const status = createSlice({
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

export const { updateResultStatus, onReloadPage } = status.actions;

export default status.reducer;
