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
    unsetUser: () => INITIAL_STATE,
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
