import { setActive } from "../../features/navSlice";
import { addProfileId } from "../../features/profileSlice";
import { logout } from "../../features/userSlice";
import CreateModal from "../../utils/createModal";
import { removeDataFromLocalStorage } from "../../utils/manageLocalStorage";
import { successToast } from "../../utils/toaster";
import CreatePost from "../post/createPost";
import SearchFriends from "../searchFriends/searchFriends";

export const navTabs = [
  {
    name: "Home",
    onClick: ({ history, index, dispatch }) => {
      dispatch(setActive({ index }));
      history.push("/home");
    },
  },
  {
    name: "Profile",
    onClick: ({ history, index, dispatch, userData }) => {
      dispatch(setActive({ index }));
      dispatch(addProfileId({ id: userData.id }));
      history.push("/profile");
    },
  },
  {
    name: "Search Friends",
    onClick: ({ history, index, dispatch, active }) => {
      dispatch(setActive({ index }));
      CreateModal(<SearchFriends history={history} />, () => {
        dispatch(setActive({ index: active }));
      });
    },
  },
  {
    name: "Add Post",
    onClick: ({ index, dispatch, active }) => {
      dispatch(setActive({ index }));
      CreateModal(<CreatePost />, () => {
        dispatch(setActive({ index: active }));
      });
    },
  },
  // {
  //   name: "Notifications",
  //   onClick: ({ history }) => history.push("/notifications"),
  // },
  {
    name: "Message",
    onClick: ({ history, index, dispatch }) => {
      dispatch(setActive({ index }));
      history.push("/message");
    },
  },
  {
    name: "Logout",
    onClick: ({ dispatch }) => {
      removeDataFromLocalStorage(["token"]);
      dispatch(logout());
      successToast("Successfully logged out");
    },
  },
];
