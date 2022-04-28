import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  active: -1,
};
export const navSlice = createSlice({
  name: "navSlice",
  initialState: INITIAL_STATE,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload.index;
      return state;
    },
  },
});

export const { setActive } = navSlice.actions;

export const getActiveIndex = (state) => state.navState.active;

export default navSlice.reducer;
