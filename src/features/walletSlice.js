import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devserver, getAccessToken, server } from "../constants";

const initialState = {
  getBalLoading: false,
  getBalError: false,
  balance: false,
};

export const getUserBalance = createAsyncThunk(
  "wallet/getUserBalance",
  async () => {
    const url = `${server}/wallet/balance`;
    const accessToken = getAccessToken();

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message;
        throw new Error(errorMsg);
      } else {
        throw new Error("Error fetching balance");
      }
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserBalance.pending, (state) => {
      state.getBalLoading = true;
    });
    builder.addCase(getUserBalance.fulfilled, (state, action) => {
      state.getBalLoading = false;
      state.getBalError = false;
      state.balance = action.payload.walletBalance;
    });
    builder.addCase(getUserBalance.rejected, (state, action) => {
      state.getBalLoading = false;
      state.getBalError = action.error.message;
      state.balance = false;
    });
  },
});

export const { reset } = walletSlice.actions;
export default walletSlice.reducer;
