import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "../features/signinSlice";
import signupReducer from "../features/signupSlice";

const store = configureStore({
  reducer: {
    signin: signinReducer,
    signup: signupReducer,
  },
});

export default store;
