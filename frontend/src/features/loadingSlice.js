import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "loading",
  initialState: {
    value: false,
  },
  reducers: {
    setLoading: (state) => {
      state.value = true;
    },
    unsetLoading: (state) => {
      state.value = false;
    },
  },
});

export const { setLoading, unsetLoading } = counterSlice.actions;

export default counterSlice.reducer;
