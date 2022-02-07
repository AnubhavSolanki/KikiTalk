/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./navbar.module.css";
import { navTabs } from "./navTabs";

const Navbar = () => {
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
