import createModal from "../../utils/createModal";
import { removeDataFromLocalStorage } from "../../utils/manageLocalStorage";
import { successToast } from "../../utils/toaster";
import CreatePost from "../post/createPost";

export const navTabs = [
  {
    name: "Home",
  },
  {
    name: "Profile",
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
    onClick: () => {
      removeDataFromLocalStorage(["token"]);
      successToast("Successfully logged out");
    },
  },
];
