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

const combinedReducer = combineReducers({
  user: userReducer,
  postState: postReducer,
  commentState: commentReducer,
  searchUserState: searchUserReducer,
  allPostsState: allPostsReducer,
  notificationsState: notificationsReducer,
  channelState: channelReducer,
  chatBoxState: chatBoxReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
