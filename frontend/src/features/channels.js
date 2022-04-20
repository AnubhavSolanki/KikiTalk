import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  channelIdList: [],
  selected: -1,
  hasNext: false,
};
export const channelSlice = createSlice({
  name: "channel",
  initialState: INITIAL_STATE,
  reducers: {
    addChannel: (state, action) => {
      state.channelIdList.push(...action.payload.channelIdList);
      state.hasNext = action.payload.hasNext ?? state.hasNext;
    },
    selectChannelId: (state, action) => {
      state.selected = action.payload.selected;
    },
    addMessageInChannel: (state, action) => {
      state.channelIdList[state.selected]["message"] = action.payload.message;
      return state;
    },
  },
});

export const { addChannel, selectChannelId, addMessageInChannel } =
  channelSlice.actions;

export const getChannelState = (state) => state.channelState;

export const getSelectedChannel = (state) => {
  const index = parseInt(state.channelState.selected);
  return index >= 0 ? state.channelState.channelIdList[index] : null;
};

export const getSelectedChannelId = (state) => state.channelState.selected;

export default channelSlice.reducer;
