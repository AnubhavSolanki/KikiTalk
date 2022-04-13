import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  searchResult: [],
  hasNext: false,
};
export const searchUserSlice = createSlice({
  name: "searchUser",
  initialState: INITIAL_STATE,
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult.push(...action.payload.searchResult);
      state.hasNext = action.payload.hasNext;
      return state;
    },
    unsetSearchResult: (state) => INITIAL_STATE,
  },
});

export const { setSearchResult, unsetSearchResult } = searchUserSlice.actions;

export const getSearchUserState = (state) => state.searchUserState;

export default searchUserSlice.reducer;
