import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  profileList: [],
  hasNext: false,
};
export const ProfileListSlice = createSlice({
  name: "profileList",
  initialState: INITIAL_STATE,
  reducers: {
    addProfiles: (state, action) => {
      state.profileList.push(...action.payload.profiles);
      state.hasNext = action.payload.hasNext ?? state.hasNext;
    },
    toggleFollowOnList: (state, action) => {
      const index = action.payload.index;
      state.profileList[index].buttonText =
        state.profileList[index].buttonText === "Follow"
          ? "Unfollow"
          : "Follow";
      return state;
    },
    changeButtonText: (state, action) => {
      const index = action.payload.index;
      const text = action.payload.text;
      state.profileList[index].buttonText = text;
      return state;
    },
    resetProfileList: () => INITIAL_STATE,
  },
});

export const {
  addProfiles,
  resetProfileList,
  toggleFollowOnList,
  changeButtonText,
} = ProfileListSlice.actions;

export const getProfileListState = (state) => state.ProfileListState;

export default ProfileListSlice.reducer;
