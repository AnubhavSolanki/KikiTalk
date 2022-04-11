import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import logger from "redux-logger";
import postReducer from "./features/postSlice";
import commentReducer from "./features/commentSlice";
import searchUserReducer from "./features/searchUserSlice";
import allPostsReducer from "./features/allPosts";
import notificationsReducer from "./features/notifications";

export default configureStore({
  reducer: {
    user: userReducer,
    postState: postReducer,
    commentState: commentReducer,
    searchUserState: searchUserReducer,
    allPostsState: allPostsReducer,
    notificationsState: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
