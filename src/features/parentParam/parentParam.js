/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parentParam: '',
  page: '',
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
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearPage: (state, action) => {
      state.page = '';
    }
  }
});

export const { setParentParam, clearParentParam, setPage, clearPage } = parentParamSlice.actions;

export default parentParamSlice.reducer;
