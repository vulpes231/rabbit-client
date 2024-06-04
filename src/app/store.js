import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "../features/signinSlice";
import signupReducer from "../features/signupSlice";
import logoutReducer from "../features/logoutSlice";
import productReducer from "../features/dashSlice";
import serverReducer from "../features/serverSlice";

const store = configureStore({
  reducer: {
    signin: signinReducer,
    signup: signupReducer,
    logout: logoutReducer,
    products: productReducer,
    server: serverReducer,
  },
});

export default store;
