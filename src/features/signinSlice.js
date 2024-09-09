import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devserver, server } from "../constants";

const initialState = {
  loading: false,
  error: false,
  accessToken: false,
  success: false,
  user: false,
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
    resetLogin(state) {
      state.accessToken = false;
      state.loading = false;
      state.error = false;
      state.success = false;
      state.user = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.loading = false;
        state.error = false;
        state.success = true;
        state.user = action.payload.userObj;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.accessToken = false;
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
        state.user = false;
      });
  },
});

export const { resetLogin } = signinSlice.actions;
export default signinSlice.reducer;
