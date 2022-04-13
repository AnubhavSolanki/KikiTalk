import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  posts: [],
  hasNext: true,
};
export const allPostSlice = createSlice({
  name: "allPosts",
  initialState: INITIAL_STATE,
  reducers: {
    addPosts: (state, action) => {
      state.posts.push(...action.payload.posts);
      state.hasNext = action.payload.hasNext ?? state.hasNext;
    },
    resetAllPosts: () => INITIAL_STATE,
  },
});

export const { addPosts, resetAllPosts } = allPostSlice.actions;

export const getAllPostsState = (state) => state.allPostsState;

export default allPostSlice.reducer;
