import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  notifications: [],
  hasNext: false,
};
export const notifications = createSlice({
  name: "notifications",
  initialState: INITIAL_STATE,
  reducers: {
    addNotifications: (state, action) => {
      state.notifications.push(...action.payload.notifications);
      state.hasNext = action.payload.hasNext ?? state.hasNext;
    },
    resetNotifications: (state, action) => INITIAL_STATE,
  },
});

export const { addNotifications, resetNotifications } = notifications.actions;

export const getNotificationState = (state) => state.notificationsState;

export default notifications.reducer;
