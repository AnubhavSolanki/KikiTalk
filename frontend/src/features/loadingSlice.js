import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  loading: false,
  searchUserLoading: false,
  homepageLoading: false,
  commmentLoading: false,
  channelLoading: false,
  messageLoading: false,
  allPostLoading: false,
};
export const loadingSlice = createSlice({
  name: "loading",
  initialState: INITIAL_STATE,
  reducers: {
    setLoading: (state, action) => {
      if (action.payload) {
        state = { ...state, ...action.payload };
      } else {
        state.loading = true;
      }
      return state;
    },
    unsetLoading: () => INITIAL_STATE,
  },
});

export const { setLoading, unsetLoading } = loadingSlice.actions;
export const getLoadingState =
  (name = "loading") =>
  (state) =>
    state.loadingState[name];

export default loadingSlice.reducer;
