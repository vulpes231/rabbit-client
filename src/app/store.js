import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "../features/signinSlice";
import signupReducer from "../features/signupSlice";
import logoutReducer from "../features/logoutSlice";
import productReducer from "../features/dashSlice";
import walletReducer from "../features/walletSlice";
import transactionReducer from "../features/transactionSlice";
import orderReducer from "../features/orderSlice";
import userReducer from "../features/userSlice";
import chatReducer from "../features/chatSlice";
import ticketReducer from "../features/ticketSlice";
import depositReducer from "../features/depositSlice";
import navReducer from "../features/navSlice";

const store = configureStore({
  reducer: {
    signin: signinReducer,
    signup: signupReducer,
    logout: logoutReducer,
    products: productReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
    order: orderReducer,
    user: userReducer,
    chat: chatReducer,
    ticket: ticketReducer,
    deposit: depositReducer,
    nav: navReducer,
  },
});

export default store;
