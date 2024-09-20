import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devserver, getAccessToken, server } from "../constants";

const initialState = {
  loading: false,
  error: false,
  success: false,
  transactions: [],
  trnxDetailLoading: false,
  trnxDetailError: false,
  trnxDetail: false,
  markPaidLoading: false,
  markPaidError: false,
  markPaid: false,
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

export const getTransactionById = createAsyncThunk(
  "transaction/getTransactionById",
  async (transactionId) => {
    const url = `${server}/transactions/${transactionId}`;
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

export const confirmPayment = createAsyncThunk(
  "transaction/confirmPayment",
  async (transactionId, formData) => {
    const url = `${server}/transactions/${transactionId}`;
    const accessToken = getAccessToken();

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message;
        throw new Error(errorMsg);
      } else {
        throw new Error("An error occured.");
      }
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetTrnxDetail(state) {
      state.trnxDetail = false;
      state.trnxDetailError = false;
      state.trnxDetailLoading = false;
    },
    resetMarkPaid(state) {
      state.markPaid = false;
      state.markPaidError = false;
      state.markPaidLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.transactions = action.payload;
        // console.log(action.payload);
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
        state.transactions = [];
      });
    builder
      .addCase(getTransactionById.pending, (state) => {
        state.trnxDetailLoading = true;
      })
      .addCase(getTransactionById.fulfilled, (state, action) => {
        state.trnxDetailLoading = false;
        state.trnxDetailError = false;
        state.trnxDetail = action.payload;
      })
      .addCase(getTransactionById.rejected, (state, action) => {
        state.trnxDetailLoading = false;
        state.trnxDetailError = action.error.message;
        state.trnxDetail = false;
      });
    builder
      .addCase(confirmPayment.pending, (state) => {
        state.markPaidLoading = true;
      })
      .addCase(confirmPayment.fulfilled, (state) => {
        state.markPaidLoading = false;
        state.markPaidError = false;
        state.markPaid = true;
      })
      .addCase(confirmPayment.rejected, (state, action) => {
        state.markPaidLoading = false;
        state.markPaidError = action.error.message;
        state.markPaid = false;
      });
  },
});

export const { resetTrnxDetail, resetMarkPaid } = transactionSlice.actions;
export default transactionSlice.reducer;
