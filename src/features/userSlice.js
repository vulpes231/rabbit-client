import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server, devserver, getAccessToken } from "../constants";
import axios from "axios";

const initialState = {
  getUserLoading: false,
  getUserError: false,
  editUserLoading: false,
  editUserError: false,
  userEdited: false,
  user: false,
};

export const getUser = createAsyncThunk("user/getUser", async () => {
  const url = `${server}/user`;
  const accessToken = getAccessToken();

  try {
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

export const editUser = createAsyncThunk("user/editUser", async (formData) => {
  const url = `${server}/user`;
  const accessToken = getAccessToken();

  try {
    const response = await axios.put(url, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMsg = error.response.data.message;
      throw new Error(errorMsg);
    } else {
      throw new Error("Error updating user");
    }
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetEditUser(state) {
      state.editUserLoading = false;
      state.editUserError = false;
      state.userEdited = false;
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
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getUserLoading = false;
        state.getUserError = action.error.message;
        state.user = false;
      });
    builder
      .addCase(editUser.pending, (state) => {
        state.editUserLoading = true;
      })
      .addCase(editUser.fulfilled, (state) => {
        state.editUserLoading = false;
        state.editUserError = false;
        state.userEdited = true;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.editUserLoading = false;
        state.editUserError = action.error.message;
        state.userEdited = false;
      });
  },
});

export const { resetEditUser } = userSlice.actions;
export default userSlice.reducer;
