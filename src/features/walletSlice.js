import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devserver, server } from "../constants";

const initialState = {
  loading: false,
  error: false,
  success: false,
  balance: 0,
  depositLoading: false,
  depositError: false,
  depositSuccess: false,
};

export const getUserBalance = createAsyncThunk(
  "wallet/getUserBalance",
  async () => {
    const url = `${devserver}/wallet/balance`;
    let accessToken;
    const storedAccessToken = sessionStorage.getItem("accessToken");
    accessToken = storedAccessToken ? JSON.parse(storedAccessToken) : null;

    if (!accessToken) {
      throw new Error("No access token found");
    }

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
        throw new Error("Error fetching products");
      }
    }
  }
);

export const deposit = createAsyncThunk("wallet/deposit", async (formData) => {
  const url = `${devserver}/wallet`;
  let accessToken;
  const storedAccessToken = sessionStorage.getItem("accessToken");
  accessToken = storedAccessToken ? JSON.parse(storedAccessToken) : null;

  if (!accessToken) {
    throw new Error("No access token found");
  }

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
});

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    reset(state) {
      state.balance = 0;
      state.error = false;
      state.success = false;
      state.loading = false;
      state.depositError = false;
      state.depositLoading = false;
      state.depositSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserBalance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.balance = action.payload.walletBalance;
    });
    builder.addCase(getUserBalance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
      state.balance = 0;
    });
    builder
      .addCase(deposit.pending, (state) => {
        state.depositLoading = false;
      })
      .addCase(deposit.fulfilled, (state) => {
        state.depositError = false;
        state.depositLoading = false;
        state.depositSuccess = true;
      })
      .addCase(deposit.rejected, (state, action) => {
        state.depositError = action.error.message;
        state.depositLoading = false;
        state.depositSuccess = false;
      });
  },
});

export const { reset } = walletSlice.actions;
export default walletSlice.reducer;
