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
    addPostInAllPost: (state, action) => {
      state.posts.unshift(action.payload.post);
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
    removeFromAllPost: (state, action) => {
      const index = state.posts.find(
        (post) => post._id === action.payload.postId
      );
      if (index !== -1) {
        state.posts.splice(index, 1);
      }
      return state;
    },
    resetAllPosts: () => INITIAL_STATE,
  },
});

export const {
  addPosts,
  addPostInAllPost,
  updatePost,
  resetAllPosts,
  removeFromAllPost,
} = allPostSlice.actions;

export const getAllPostsState = (state) => state.allPostsState;

export const isLiked = (state, index, userId) =>
  state.allPostsState.posts[index].likedBy.includes(userId);

export const getLikeCount = (state, index) =>
  state.allPostsState.posts[index].likedBy.length;

export default allPostSlice.reducer;
