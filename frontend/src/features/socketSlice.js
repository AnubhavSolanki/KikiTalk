import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const INITIAL_STATE = {
  socket: null,
};
export const socketSlice = createSlice({
  name: "socket",
  initialState: INITIAL_STATE,
  reducers: {
    createSocket: (state, action) => {
      const newSocket = io(process.env.REACT_APP_BASE_URL, {
        auth: {
          token: action.payload.token,
        },
      });
      state.socket = newSocket;
      return state;
    },
    resetSocket: (state) => {
      if (state.socket) state.socket.close();
      return INITIAL_STATE;
    },
  },
});

export const { createSocket, resetSocket } = socketSlice.actions;

export const getSocket = (state) => state.socketState.socket;

export default socketSlice.reducer;
