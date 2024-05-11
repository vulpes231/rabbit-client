import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devserver, server } from "../constants";

const initialState = {
  loading: false,
  error: false,
  success: false,
};

export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async (formData) => {
    try {
      const url = `${server}/signup`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
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

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    reset(state) {
      state.success = false;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
        state.error = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export const { reset } = signupSlice.actions;
export default signupSlice.reducer;
