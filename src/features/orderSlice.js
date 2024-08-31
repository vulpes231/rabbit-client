import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server, devserver, getAccessToken } from "../constants";
import axios from "axios";

const initialState = {
  placeOrderPending: false,
  placeOrderError: false,
  placeOrderSuccess: false,
  getOrderPending: false,
  getOrderError: false,
  getOrderSuccess: false,
  orders: [],
  orderByIdLoading: false,
  orderByIdError: false,
  singleOrder: null,
};

export const buyProduct = createAsyncThunk(
  "order/buyProduct",
  async (formData) => {
    const url = `${server}/order`;
    const accessToken = getAccessToken();

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log("trnx", response);
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

export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async () => {
    const url = `${server}/order`;
    const accessToken = getAccessToken();

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
      // console.log("orders", response);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message;
        throw new Error(errorMsg);
      } else {
        throw new Error("Error getting user orders.");
      }
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId) => {
    const url = `${server}/order/${orderId}`;
    const accessToken = getAccessToken();

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
      // console.log("orders", response);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message;
        throw new Error(errorMsg);
      } else {
        throw new Error("Error getting user orders.");
      }
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset(state) {
      state.getOrderError = false;
      state.getOrderPending = false;
      state.getOrderSuccess = false;
      state.orders = [];
    },
    resetGetorderById(state) {
      state.orderByIdLoading = false;
      state.orderByIdError = false;
      state.singleOrder = null;
    },
    resetPlaceOrder(state) {
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
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.getOrderPending = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.getOrderError = false;
        state.getOrderPending = false;
        state.getOrderSuccess = true;
        state.orders = action.payload.userOrders;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.getOrderError = action.error.message;
        state.getOrderPending = false;
        state.getOrderSuccess = false;
        state.orders = [];
      });
    builder
      .addCase(getOrderById.pending, (state) => {
        state.orderByIdLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.orderByIdError = false;
        state.orderByIdLoading = false;
        state.singleOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.orderByIdError = action.error.message;
        state.orderByIdLoading = false;
        state.singleOrder = null;
      });
  },
});

export const { reset, resetPlaceOrder } = orderSlice.actions;
export default orderSlice.reducer;
