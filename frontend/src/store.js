import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import logger from "redux-logger";
import postReducer from "./features/postSlice";
import commentReducer from "./features/commentSlice";
import searchUserReducer from "./features/searchUserSlice";
import allPostsReducer from "./features/allPosts";
import notificationsReducer from "./features/notifications";
import channelReducer from "./features/channels";
import chatBoxReducer from "./features/chatBox";
import socketReducer from "./features/socketSlice";
import profileReducer from "./features/profileSlice";
import navReducer from "./features/navSlice";
import loadingReducer from "./features/loadingSlice";

const combinedReducer = combineReducers({
  user: userReducer,
  postState: postReducer,
  commentState: commentReducer,
  searchUserState: searchUserReducer,
  allPostsState: allPostsReducer,
  notificationsState: notificationsReducer,
  channelState: channelReducer,
  chatBoxState: chatBoxReducer,
  socketState: socketReducer,
  profileState: profileReducer,
  navState: navReducer,
  loadingState: loadingReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});
