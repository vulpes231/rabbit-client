import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server, devserver } from "../constants";
import axios from "axios";

const initialState = {
  placeOrderPending: false,
  placeOrderError: false,
  placeOrderSuccess: false,
};

export const buyProduct = createAsyncThunk(
  "order/buyProduct",
  async (formData) => {
    const url = `${server}/order`;
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
      // console.log("trnx", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message;
        throw new Error(errorMsg);
      } else {
        throw new Error("Error placing order.");
      }
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset(state) {
      state.placeOrderError = false;
      state.placeOrderPending = false;
      state.placeOrderSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(buyProduct.pending, (state) => {
        state.placeOrderPending = true;
      })
      .addCase(buyProduct.fulfilled, (state) => {
        state.placeOrderPending = false;
        state.placeOrderError = false;
        state.placeOrderSuccess = true;
      })
      .addCase(buyProduct.rejected, (state, action) => {
        state.placeOrderPending = false;
        state.placeOrderError = action.error.message;
        state.placeOrderSuccess = false;
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
