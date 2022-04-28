import { logout } from "../../features/userSlice";
import CreateModal from "../../utils/createModal";
import { removeDataFromLocalStorage } from "../../utils/manageLocalStorage";
import { successToast } from "../../utils/toaster";
import CreatePost from "../post/createPost";
import SearchFriends from "../searchFriends/searchFriends";

export const navTabs = [
  {
    name: "Home",
    onClick: ({ history, index, setActive }) => {
      setActive(index);
      history.push("/home");
    },
  },
  {
    name: "Profile",
    onClick: ({ history, index, setActive }) => {
      setActive(index);
      history.push("/profile");
    },
  },
  {
    name: "Search Friends",
    onClick: ({ history }) => {
      CreateModal(<SearchFriends history={history} />);
    },
  },
  {
    name: "Add Post",
    onClick: () => {
      CreateModal(<CreatePost />);
    },
  },
  // {
  //   name: "Notifications",
  //   onClick: ({ history }) => history.push("/notifications"),
  // },
  {
    name: "Message",
    onClick: ({ history, index, setActive }) => {
      setActive(index);
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
