import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devserver, getAccessToken, server } from "../constants";

const initialState = {
  loading: false,
  error: false,
  success: false,
  products: [],
};
// devserver;

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const url = `${server}/products`;
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
        throw new Error("Error fetching products");
      }
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset(state) {
      state.products = [];
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
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
      state.products = [];
    });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
