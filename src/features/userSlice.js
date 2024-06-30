import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server, devserver } from "../constants";
import axios from "axios";
import { getAccessToken } from "../utils/getDate";

const initialState = {
  getUserLoading: false,
  getUserError: false,
  getUserSuccess: false,
  changePassLoading: false,
  changePassError: false,
  changePassSuccess: false,
  user: null,
};

export const getUser = createAsyncThunk("user/getUser", async () => {
  const url = `${devserver}/user`;
  let accessToken;
  const storedAccessToken = sessionStorage.getItem("accessToken");
  accessToken = storedAccessToken ? JSON.parse(storedAccessToken) : null;

  if (!accessToken) {
    throw new Error("No access token found");
  }

  try {
    // console.log(accessToken);
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("user", response);
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMsg = error.response.data.message;
      throw new Error(errorMsg);
    } else {
      throw new Error("Error getting user.");
    }
  }
});

export const changePass = createAsyncThunk(
  "user/changePass",
  async (formData) => {
    const url = `${devserver}/users`;
    const accessToken = getAccessToken();

    if (!accessToken) {
      throw new Error("No access token found");
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMsg = error.response.data.message;
        throw new Error(errorMsg);
      } else {
        throw new Error("Error changing password");
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset(state) {
      state.getUserLoading = false;
      state.getUserError = false;
      state.getUserSuccess = false;
      state.changePassLoading = false;
      state.changePassError = false;
      state.changePassSuccess = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.getUserLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.getUserLoading = false;
        state.getUserError = false;
        state.getUserSuccess = true;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getUserLoading = false;
        state.getUserError = action.error.message;
        state.getUserSuccess = false;
      });
    builder
      .addCase(changePass.pending, (state) => {
        state.changePassLoading = true;
      })
      .addCase(changePass.fulfilled, (state, action) => {
        state.changePassLoading = false;
        state.changePassError = false;
        state.changePassSuccess = true;
      })
      .addCase(changePass.rejected, (state, action) => {
        state.changePassLoading = false;
        state.changePassError = action.error.message;
        state.changePassSuccess = false;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
