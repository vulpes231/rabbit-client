import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "../features/signinSlice";

const store = configureStore({
  reducer: {
    signin: signinReducer,
  },
});

export default store;
