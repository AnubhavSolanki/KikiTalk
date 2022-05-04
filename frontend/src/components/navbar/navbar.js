/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./navbar.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { navTabs } from "./navTabs";
import { getActiveIndex, setActive } from "../../features/navSlice";
import { useEffect } from "react";
import { selectUser } from "../../features/userSlice";
import Logo from "../../assets/images/logo.png";

const Navbar = () => {
  const history = useHistory();
  const active = useSelector(getActiveIndex);
  const dispatch = useDispatch();
  const activeProfileId = useSelector((state) => state.profileState.id);
  const userData = useSelector(selectUser);
  useEffect(() => {
    dispatch(setActive({ index: 0 }));
  }, []);
  return (
    <div className={styles.bar}>
      <div
        data-btn
        onClick={navTabs[0].onClick.bind(this, {
          history,
          dispatch,
          index: 0,
          active,
          userData,
          activeProfileId,
        })}
        className={styles.logo}
      >
        <img style={{ width: "50px" }} src={Logo} alt="logo" />
        <span data-btn>KikiTalk</span>
      </div>
      <div className={styles.navigationIcons}>
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
                      userData,
                      activeProfileId,
                    })
                  : null
              }
              className={`${styles.links} ${
                index === navTabs.length - 1 ? styles.last_link : ""
              } ${index === active ? styles.active : ""}`}
            >
              <span className={`${index === active ? styles.active : ""}`}>
                {navTab.icon}
              </span>
              {/* <FaHome /> */}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
