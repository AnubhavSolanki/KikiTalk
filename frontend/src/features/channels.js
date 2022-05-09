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
      if (state.channelIdList.length && state.selected === -1) {
        state.selected = 0;
      }
      state.hasNext = action.payload.hasNext ?? state.hasNext;
    },
    updateSelected: (state, action) => {
      state.selected = action.payload.selected;
      return state;
    },
    selectChannelId: (state, action) => {
      state.selected = action.payload.selected;
    },
    addMessageInChannel: (state, action) => {
      state.channelIdList[state.selected]["message"] = action.payload.message;
      return state;
    },
    addInChannel: (state, action) => {
      const channelId = action.payload.channel._id;
      let index = state.channelIdList.findIndex(
        (channel) => channel._id === channelId
      );
      if (index === -1) {
        state.channelIdList.unshift(action.payload.channel);
        index = 0;
      }
      state.selected = index;
    },
  },
});

export const {
  addChannel,
  selectChannelId,
  addInChannel,
  addMessageInChannel,
  updateSelected,
} = channelSlice.actions;

export const getChannelState = (state) => state.channelState;

export const getSelectedChannel = (state) => {
  const index = parseInt(state.channelState.selected);
  return index >= 0 ? state.channelState.channelIdList[index] : null;
};

export const getSelectedChannelId = (state) => state.channelState.selected;

export default channelSlice.reducer;
