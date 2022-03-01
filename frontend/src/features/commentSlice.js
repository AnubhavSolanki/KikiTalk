import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  commentCount: 0,
  hasNext: true,
  comments: [],
};
export const commentSlice = createSlice({
  name: "comments",
  initialState: INITIAL_STATE,
  reducers: {
    addComments: (state, action) => {
      state.comments.unshift(...action.payload.comments);
      state.commentCount = state.comments.length;
      state.hasNext = action.payload?.hasNext ?? state.hasNext;
    },
    resetCommentState: () => INITIAL_STATE,
  },
});

export const { addComments, resetCommentState } = commentSlice.actions;

export const getComments = (state) => state.commentState.comments;

export const getCommentState = (state) => state.commentState;

export default commentSlice.reducer;
