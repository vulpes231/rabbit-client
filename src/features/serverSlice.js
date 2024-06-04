import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server, devserver } from "../constants";
import axios from "axios";

const initialState = {
  getServerLoading: false,
  getServerError: false,
  serverList: [],
};

export const getServerPlans = createAsyncThunk(
  "server/getServerPlans",
  async (_, { getState }) => {
    const url = `${devserver}/plans`;
    const { accessToken } = getState().signin;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errMsg = error.response.message.data;
        throw new Error(errMsg);
      } else {
        throw error;
      }
    }
  }
);

const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    reset(state) {
      state.getServerError = false;
      state.getServerLoading = false;
      state.serverList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServerPlans.pending, (state) => {
        state.getServerLoading = true;
      })
      .addCase(getServerPlans.fulfilled, (state, action) => {
        state.getServerLoading = false;
        state.getServerError = false;
        state.serverList = action.payload.plans;
      })
      .addCase(getServerPlans.rejected, (state, action) => {
        state.getServerLoading = false;
        state.getServerError = action.error.message;
        state.serverList = [];
      });
  },
});

export const { reset } = serverSlice.actions;
export default serverSlice.reducer;
