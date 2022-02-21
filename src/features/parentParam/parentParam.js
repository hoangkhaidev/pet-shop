/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parentParam: '',
  page: '',
  pageName: '',
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
    setPageName: (state, action) => {
      state.pageName = action.payload;
    },
    clearPage: (state, action) => {
      console.log(123);
      state.page = '';
      state.pageName = '';
    }
  }
});

export const { setParentParam, clearParentParam, setPage, clearPage, setPageName } = parentParamSlice.actions;

export default parentParamSlice.reducer;
