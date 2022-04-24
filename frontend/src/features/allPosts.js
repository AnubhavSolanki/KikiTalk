import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  posts: [],
  hasNext: false,
};
export const allPostSlice = createSlice({
  name: "allPosts",
  initialState: INITIAL_STATE,
  reducers: {
    addPosts: (state, action) => {
      state.posts.push(...action.payload.posts);
      state.hasNext = action.payload.hasNext ?? state.hasNext;
    },
    updatePost: (state, action) => {
      const statePostData = state.posts[action.payload.index];
      state.posts[action.payload.index] = {
        ...statePostData,
        ...action.payload.postData,
      };
      return state;
    },
    resetAllPosts: () => INITIAL_STATE,
  },
});

export const { addPosts, updatePost, resetAllPosts } = allPostSlice.actions;

export const getAllPostsState = (state) => state.allPostsState;

export const isLiked = (state, index, userId) =>
  state.allPostsState.posts[index].likedBy.includes(userId);

export const getLikeCount = (state, index) =>
  state.allPostsState.posts[index].likedBy.length;

export default allPostSlice.reducer;
