import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../constants";

const initialState = {
  loading: false,
  error: false,
  accessToken: null,
  success: false,
};

export const signinUser = createAsyncThunk(
  "signin/signinUser",
  async (formData) => {
    try {
      const url = `${server}/signin`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message;
        throw new Error(errorMsg);
      } else {
        throw error;
      }
    }
  }
);

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    reset(state) {
      state.accessToken = null;
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.loading = false;
        state.error = false;
        state.success = true;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.accessToken = null;
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export const { reset } = signinSlice.actions;
export default signinSlice.reducer;
