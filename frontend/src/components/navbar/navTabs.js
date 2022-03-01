import { unsetUser } from "../../features/userSlice";
import createModal from "../../utils/createModal";
import { removeDataFromLocalStorage } from "../../utils/manageLocalStorage";
import { successToast } from "../../utils/toaster";
import CreatePost from "../post/createPost";

export const navTabs = [
  {
    name: "Home",
    onClick: ({ history }) => history.push("/home"),
  },
  {
    name: "Profile",
    onClick: ({ history }) => history.push("/profile"),
  },
  {
    name: "Add Post",
    onClick: () => createModal(<CreatePost />),
  },
  {
    name: "Notifications",
  },
  {
    name: "Message",
  },
  {
    name: "Logout",
    onClick: ({ dispatch }) => {
      removeDataFromLocalStorage(["token"]);
      dispatch(unsetUser());
      successToast("Successfully logged out");
    },
  },
];
