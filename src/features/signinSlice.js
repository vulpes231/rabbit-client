import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  accessToken: null,
};

export const signinUser = createAsyncThunk("signin/signinUser", async () => {
  try {
    const response = await axios.post();
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMsg = error.response.data.message;
      throw new Error(errorMsg);
    } else {
      throw error;
    }
  }
});

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    reset(state) {
      state.accessToken = null;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signinUser.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { reset } = signinSlice.actions;
export default signinSlice.reducer;
