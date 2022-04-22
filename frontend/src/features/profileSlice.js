import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  id: "",
  imgUrl: "",
  name: "",
  postCount: 0,
  follower: 0,
  following: 0,
  isMyProfile: false,
  isFollowed: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: INITIAL_STATE,
  reducers: {
    addProfile: (state, action) => {
      return action.payload;
    },
    toggleFollow: (state, action) => {
      state.isFollowed = action.payload.isFollower;
      return state;
    },
    resetProfile: () => INITIAL_STATE,
  },
});

export const { addProfile, toggleFollow, resetProfile } = profileSlice.actions;

export const getProfileState = (state) => state.profileState;

export default profileSlice.reducer;
