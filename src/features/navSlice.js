import { createSlice } from "@reduxjs/toolkit";

const prefersDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedDarkMode = JSON.parse(localStorage.getItem("darkMode"));

const initialState = {
  toggle: false,
  darkMode: savedDarkMode !== null ? savedDarkMode : prefersDarkMode,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode);
    },
  },
});

export const { setToggle, setDarkMode } = navSlice.actions;
export default navSlice.reducer;
