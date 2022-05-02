import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  posts: {},
};
export const messagePostSlice = createSlice({
  name: "messagePost",
  initialState: INITIAL_STATE,
  reducers: {
    addPost: (state, action) => {
      state.posts[action.payload.index] = action.payload.post;
      return state;
    },
    updatePost: (state, action) => {
      const statePostData = state.posts[action.payload.index];
      state.posts[action.payload.index] = {
        ...statePostData,
        ...action.payload.postData,
      };
      return state;
    },
  },
});

export const { addPost, updatePost } = messagePostSlice.actions;

export const getMessagePost = (state, index) =>
  state.messagePostState.posts[index];

export const isLiked = (state, index, userId) =>
  state.messagePostState.posts[index].likedBy.includes(userId);

export const getLikeCount = (state, index) =>
  state.messagePostState.posts[index].likedBy.length;

export default messagePostSlice.reducer;
