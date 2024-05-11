import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "../features/signinSlice";
import signupReducer from "../features/signupSlice";
import logoutReducer from "../features/logoutSlice";

const store = configureStore({
  reducer: {
    signin: signinReducer,
    signup: signupReducer,
    logout: logoutReducer,
  },
});

export default store;
