import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  postCount: 0,
  hasNext: true,
  posts: [],
};
export const postSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload.post);
      state.postCount = state.posts.length;
      return state;
    },
    addPosts: (state, action) => {
      state.posts.push(...action.payload.posts);
      state.postCount = state.posts.length;
      state.hasNext = action.payload.hasNext ?? state.hasNext;
      return state;
    },
    addLike: (state, action) => {
      const index = action.payload.index;
      const userId = action.payload.userId;
      if (!state.posts[index].likedBy.includes(userId)) {
        state.posts[index].likedBy.push(userId);
      }
      return state;
    },
    removeLike: (state, action) => {
      const userId = action.payload.userId;
      const index = action.payload.index;
      const userIndex = state.posts[index].likedBy.indexOf(userId);
      if (userIndex > -1) {
        state.posts[index].likedBy.splice(userIndex);
      }
      return state;
    },
  },
});

export const { addPost, addPosts, addLike, removeLike } = postSlice.actions;

export const getPosts = (state) => state.postState.posts;

export const getPostState = (state) => state.postState;

export const selectPost = (state, index) => state.postState.posts[index];

export default postSlice.reducer;
