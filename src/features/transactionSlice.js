import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devserver, getAccessToken, server } from "../constants";

const initialState = {
  loading: false,
  error: false,
  success: false,
  transactions: [],
};

export const getTransactions = createAsyncThunk(
  "transaction/getTransactions",
  async () => {
    const url = `${server}/transactions`;
    const accessToken = getAccessToken();

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log("trnx", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message;
        throw new Error(errorMsg);
      } else {
        throw new Error("Error fetching products");
      }
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    reset(state) {
      state.transactions = [];
      state.error = false;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.transactions = action.payload;
      // console.log(action.payload);
    });
    builder.addCase(getTransactions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
      state.transactions = [];
    });
  },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
