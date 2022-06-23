/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { createSlice  } from "@reduxjs/toolkit";
// action - state management

const initialState = {
    isOpen: [], // for active default menu
    // titlePage: [],
    fontFamily: "'Roboto', sans-serif",
    borderRadius: 12,
    opened: true
};

export const customizationSlice = createSlice({
  name: "customization",
  initialState,
  reducers: {
    menuOpen: (state, action) => {
      state.isOpen = [action.payload];
    },
    // setTitlePage: (state, action) => {
    //   state.titlePage = [action.payload];
    // },
    setMenu: (state, action) => {
      state.opened = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
    },
  }
});

export const { menuOpen, setTitlePage, setMenu, setFontFamily, setBorderRadius } = customizationSlice.actions;

export default customizationSlice.reducer;
