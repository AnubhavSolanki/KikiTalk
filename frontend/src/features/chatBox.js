import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  messages: [],
  hasNext: false,
};
export const chatBoxSlice = createSlice({
  name: "chatBox",
  initialState: INITIAL_STATE,
  reducers: {
    addMessage: (state, action) => {
      state.messages = [...action.payload.messages, ...state.messages];
      state.hasNext = action.payload.hasNext ?? state.hasNext;
      return state;
    },
    resetChatBox: (state) => INITIAL_STATE,
  },
});

export const { addMessage, resetChatBox } = chatBoxSlice.actions;

export const getChatBoxState = (state) => state.chatBoxState;

export default chatBoxSlice.reducer;
