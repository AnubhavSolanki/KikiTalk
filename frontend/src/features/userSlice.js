import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  id: "",
  name: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action) => {
      Object.keys(state).forEach(
        (field) => (state[field] = action.payload[field])
      );
    },
    logout: (state, action) => {
      return state;
    },
  },
});

export const saveUserDetails =
  ({ _id: id, full_name: name }) =>
  (dispatch) => {
    dispatch(setUser({ id, name }));
  };

export const { setUser, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
