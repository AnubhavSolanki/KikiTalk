import {
  FaEnvelope,
  FaHome,
  FaPlusSquare,
  FaSearch,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { setLoading } from "../../features/loadingSlice";
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
    icon: <FaHome size={25} />,
    onClick: ({ history, index, dispatch }) => {
      dispatch(setActive({ index }));
      history.push("/home");
    },
  },
  {
    name: "Profile",
    icon: <FaUser size={25} />,
    onClick: ({ history, index, dispatch, userData }) => {
      dispatch(setLoading());
      dispatch(setActive({ index }));
      dispatch(addProfileId({ id: userData.id }));
      history.push("/profile");
    },
  },
  {
    name: "Search Friends",
    icon: <FaSearch size={25} />,
    onClick: ({ history, index, dispatch, active }) => {
      dispatch(setActive({ index }));
      CreateModal(<SearchFriends history={history} />, () => {
        dispatch(setActive({ index: active }));
      });
    },
  },
  {
    name: "Add Post",
    icon: <FaPlusSquare size={25} />,
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
    icon: <FaEnvelope size={25} />,
    onClick: ({ history, index, dispatch }) => {
      dispatch(setLoading());
      dispatch(setActive({ index }));
      history.push("/message");
    },
  },
  {
    name: "Logout",
    icon: <FaSignOutAlt size={25} />,
    onClick: ({ dispatch }) => {
      removeDataFromLocalStorage(["token"]);
      dispatch(logout());
      successToast("Successfully logged out");
    },
  },
];
