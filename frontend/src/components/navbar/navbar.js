/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import styles from "./navbar.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { navTabs } from "./navTabs";

const Navbar = () => {
  const [active, setActive] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div className={styles.bar}>
      <span className={styles.logo}>KikiTalk</span>
      {navTabs.map((navTab, index) => {
        return (
          <a
            key={index}
            onClick={
              navTab.onClick
                ? navTab.onClick.bind(this, {
                    history,
                    dispatch,
                    index,
                    setActive,
                  })
                : null
            }
            className={`${styles.links} ${
              index === navTabs.length - 1 ? styles.last_link : ""
            } ${index === active ? styles.active : ""}`}
          >
            {navTab.name}
          </a>
        );
      })}
    </div>
  );
};

export default Navbar;
