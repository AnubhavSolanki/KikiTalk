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
      action.payload.messages
        .filter(
          (message) =>
            message.senderId === action.payload.channelId ||
            message.recieverId === action.payload.channelId
        )
        .forEach((message) => {
          if (
            !state.messages.find(
              (stateMessage) => String(stateMessage._id) === String(message._id)
            )
          ) {
            state.messages = [...state.messages, message];
          }
        });
      state.hasNext = action.payload.hasNext ?? state.hasNext;
      return state;
    },
    addNewMessages: (state, action) => {
      if (
        !state.messages.find(
          (message) => message._id === action.payload.messages[0]?._id
        ) ||
        !action.payload.messages[0]?._id
      )
        state.messages = [...action.payload.messages, ...state.messages];
      return state;
    },
    resetChatBox: () => INITIAL_STATE,
  },
});

export const { addMessage, resetChatBox, addNewMessages } =
  chatBoxSlice.actions;

export const getChatBoxState = (state) => state.chatBoxState;

export default chatBoxSlice.reducer;
