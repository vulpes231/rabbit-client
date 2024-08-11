import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { devserver, getAccessToken, server } from "../constants";

const initialState = {
  createTicketLoading: false,
  createTicketError: null,
  ticketCreated: false,
  ticketDataLoading: false,
  ticketDataError: null,
  ticketData: null,
};

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (orderId, { rejectWithValue }) => {
    try {
      const url = `${server}/ticket`;

      const accessToken = getAccessToken();

      if (!accessToken) {
        throw new Error("No access token found");
      }

      const response = await axios.post(
        url,
        { orderId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Return specific error message
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Error creating ticket");
      }
    }
  }
);
export const getTicketData = createAsyncThunk(
  "ticket/getTicketData",
  async (orderId, { rejectWithValue }) => {
    try {
      const url = `${server}/ticket/${orderId}`;

      const accessToken = getAccessToken();

      if (!accessToken) {
        throw new Error("No access token found");
      }

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
        // Return specific error message
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Error creating ticket");
      }
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    resetCreateTicket(state) {
      state.createTicketError = null;
      state.ticketCreated = false;
      state.createTicketLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.createTicketLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.createTicketLoading = false;
        state.createTicketError = null;
        state.ticketCreated = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.createTicketLoading = false;
        state.createTicketError = action.error.message;
        state.ticketCreated = false;
      });
    builder
      .addCase(getTicketData.pending, (state) => {
        state.ticketDataLoading = true;
      })
      .addCase(getTicketData.fulfilled, (state, action) => {
        state.ticketDataLoading = false;
        state.ticketDataError = null;
        state.ticketData = action.payload;
      })
      .addCase(getTicketData.rejected, (state, action) => {
        state.ticketDataLoading = false;
        state.ticketDataError = action.error.message;
        state.ticketData = null;
      });
  },
});

export const { resetCreateTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
