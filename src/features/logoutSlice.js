import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devserver, getAccessToken, server } from "../constants";

const initialState = {
  loading: false,
  logoutError: false,
  loggedOut: false,
};

export const logoutUser = createAsyncThunk("logout/logoutUser", async () => {
  const accessToken = getAccessToken();

  try {
    const url = `${server}/logout`;
    const response = await axios.put(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    } else {
      throw new Error("Error during logout");
    }
  }
});

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    resetLogout(state) {
      state.logoutError = false;
      state.loading = false;
      state.loggedOut = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.logoutError = false;
        state.loggedOut = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.logoutError = action.error.message;
        state.loggedOut = false;
      });
  },
});

export const { resetLogout } = logoutSlice.actions;
export default logoutSlice.reducer;
