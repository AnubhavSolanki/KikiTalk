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
      state.follower = state.follower + (action.payload.isFollower ? 1 : -1);
      return state;
    },
    updateFollowing: (state, action) => {
      state.following += action.payload.isFollower ? 1 : -1;
      return state;
    },
    addProfileId: (state, action) => {
      state.id = action.payload.id;
      return state;
    },
    increasePostCount: (state) => {
      state.postCount = state.postCount + 1;
      return;
    },
    updateProfileNameInStore: (state, action) => {
      state.name = action.payload.name;
      return state;
    },
    addProfileImage: (state, action) => {
      state.imgUrl = action.payload.imgUrl;
      return state;
    },
    resetProfile: () => INITIAL_STATE,
  },
});

export const {
  addProfile,
  toggleFollow,
  updateProfileNameInStore,
  resetProfile,
  addProfileId,
  addProfileImage,
  increasePostCount,
  updateFollowing,
} = profileSlice.actions;

export const getProfileState = (state) => state.profileState;

export default profileSlice.reducer;
