/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import createModal from "../../utils/createModal";
import CreatePost from "../post/createPost";
import styles from "./navbar.module.css";
const Navbar = () => {
  const onLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
  };

  const navTabs = [
    {
      name: "Home",
    },
    {
      name: "Profile",
    },
    {
      name: "Add Post",
      onClick: () => {
        createModal(<CreatePost />);
      },
    },
    {
      name: "Logout",
      onClick: onLogout,
    },
  ];

  return (
    <div className={styles.bar}>
      <span className={styles.logo}>KikiTalk</span>
      {navTabs.map((navTab, index) => {
        return (
          <a
            key={index}
            onClick={navTab.onClick ?? null}
            className={`${styles.links} ${
              index === navTabs.length - 1 ? styles.last_link : ""
            }`}
          >
            {navTab.name}
          </a>
        );
      })}
    </div>
  );
};

export default Navbar;
