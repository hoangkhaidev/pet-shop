/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parentParam: '',
};

export const parentParamSlice = createSlice({
  name: "parentParam",
  initialState,
  reducers: {
    setParentParam: (state, action) => {
      state.parentParam = action.payload;
    },
    clearParentParam: (state, action) => {
      state.parentParam = '';
    },
  }
});

export const { setParentParam, clearParentParam } = parentParamSlice.actions;

export default parentParamSlice.reducer;
