import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devserver, getAccessToken, server } from "../constants";
import axios from "axios";

const initialState = {
  manualDepositLoading: false,
  manualDepositError: false,
  manualTrnxData: false,
  autoDepositLoading: false,
  autoDepositError: false,
  autoTrnxData: false,
};

export const manualDeposit = createAsyncThunk(
  "wallet/manualDeposit",
  async (formData) => {
    const url = `${server}/wallet/depositmanual`;
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

export const autoDeposit = createAsyncThunk(
  "wallet/autoDeposit",
  async (formData) => {
    const url = `${server}/wallet/depositauto`;
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

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    resetManualDeposit(state) {
      state.manualDepositError = false;
      state.manualDepositLoading = false;
      state.manualTrnxData = false;
    },
    resetAutoDeposit(state) {
      state.autoDepositError = false;
      state.autoDepositLoading = false;
      state.autoTrnxData = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(manualDeposit.pending, (state) => {
        state.manualDepositLoading = true;
      })
      .addCase(manualDeposit.fulfilled, (state, action) => {
        state.manualDepositLoading = false;
        state.manualDepositError = false;
        state.manualTrnxData = action.payload;
      })
      .addCase(manualDeposit.rejected, (state, action) => {
        state.manualDepositLoading = false;
        state.manualTrnxData = false;
        state.manualDepositError = action.error.message;
      });
    builder
      .addCase(autoDeposit.pending, (state) => {
        state.autoDepositLoading = true;
      })
      .addCase(autoDeposit.fulfilled, (state, action) => {
        state.autoDepositLoading = false;
        state.autoDepositError = false;
        state.autoTrnxData = action.payload;
      })
      .addCase(autoDeposit.rejected, (state, action) => {
        state.autoDepositLoading = false;
        state.autoTrnxData = false;
        state.autoDepositError = action.error.message;
      });
  },
});

export const { resetManualDeposit, resetAutoDeposit } = depositSlice.actions;
export default depositSlice.reducer;
