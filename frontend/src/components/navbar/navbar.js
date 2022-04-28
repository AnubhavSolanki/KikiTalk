/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./navbar.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { navTabs } from "./navTabs";
import { getActiveIndex, setActive } from "../../features/navSlice";
import { useEffect } from "react";

const Navbar = () => {
  const history = useHistory();
  const active = useSelector(getActiveIndex);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActive({ index: 0 }));
  }, []);
  return (
    <div className={styles.bar}>
      <span
        data-btn
        onClick={navTabs[0].onClick.bind(this, {
          history,
          dispatch,
          index: 0,
          active,
        })}
        className={styles.logo}
      >
        KikiTalk
      </span>
      {navTabs.map((navTab, index) => {
        return (
          <a
            data-btn
            key={index}
            onClick={
              navTab.onClick
                ? navTab.onClick.bind(this, {
                    history,
                    dispatch,
                    index,
                    active,
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
