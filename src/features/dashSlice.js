import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devserver, server } from "../constants";

const initialState = {
  loading: false,
  error: false,
  success: false,
  data: [],
};
// devserver;

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { getState }) => {
    const url = `${devserver}/products`;
    const { accessToken } = getState().signin;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      //   console.log("API response", response);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.message.data;
        throw new Error(errorMsg);
      }
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset(state) {
      state.data = [];
      state.error = false;
      state.success = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
      state.data = [];
    });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
