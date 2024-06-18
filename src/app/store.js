import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "../features/signinSlice";
import signupReducer from "../features/signupSlice";
import logoutReducer from "../features/logoutSlice";
import productReducer from "../features/dashSlice";
import serverReducer from "../features/serverSlice";
import walletReducer from "../features/walletSlice";
import transactionReducer from "../features/transactionSlice";

const store = configureStore({
  reducer: {
    signin: signinReducer,
    signup: signupReducer,
    logout: logoutReducer,
    products: productReducer,
    server: serverReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
  },
});

export default store;
