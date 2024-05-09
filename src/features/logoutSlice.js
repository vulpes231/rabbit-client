import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../constants";

const initialState = {
  loading: false,
  error: false,
  success: false,
};

export const logoutUser = createAsyncThunk("logout/logoutUser", async () => {
  try {
    const url = `${server}/logout`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    }
  }
});

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    reset(state) {
      state.error = false;
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.success = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      });
  },
});

export const { reset } = logoutSlice.actions;
export default logoutSlice.reducer;
