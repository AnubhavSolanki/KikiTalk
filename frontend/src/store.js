import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import logger from "redux-logger";
import postReducer from "./features/postSlice";
import commentReducer from "./features/commentSlice";
import searchUserReducer from "./features/searchUserSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    postState: postReducer,
    commentState: commentReducer,
    searchUserState: searchUserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
