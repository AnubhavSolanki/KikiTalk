/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./navbar.module.css";
import { useHistory } from "react-router-dom";
import { navTabs } from "./navTabs";

const Navbar = () => {
  const history = useHistory();
  return (
    <div className={styles.bar}>
      <span className={styles.logo}>KikiTalk</span>
      {navTabs.map((navTab, index) => {
        return (
          <a
            key={index}
            onClick={navTab.onClick ? navTab.onClick.bind(this, history) : null}
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
