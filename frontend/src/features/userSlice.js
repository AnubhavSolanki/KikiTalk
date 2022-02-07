import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    name: "",
  },
  reducers: {
    setUser: (state, action) => {
      Object.keys(state).forEach(
        (field) => (state[field] = action.payload[field])
      );
    },
    unsetUser: (state) => {
      state = {};
    },
  },
});

export const saveUserDetails =
  ({ _id: id, full_name: name }) =>
  (dispatch) => {
    dispatch(setUser({ id, name }));
  };

export const { setUser, unsetUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
