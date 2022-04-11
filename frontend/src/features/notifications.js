import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  notifications: [],
  hasNext: true,
};
export const notifications = createSlice({
  name: "notifications",
  initialState: INITIAL_STATE,
  reducers: {
    addNotifications: (state, action) => {
      state.notifications.push(...action.payload.notifications);
      state.hasNext = action.payload.hasNext ?? state.hasNext;
    },
  },
});

export const { addNotifications } = notifications.actions;

export const getNotificationState = (state) => state.notificationsState;

export default notifications.reducer;
