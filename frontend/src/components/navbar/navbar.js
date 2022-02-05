import React from "react";
import styles from "./navbar.module.css";
const Navbar = () => {
  const onLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
  };
  return (
    <div className={styles.bar}>
      <span className={styles.logo}>LOGO</span>
      <a className={styles.links}>Home</a>
      <a onClick={onLogout} className={styles.links}>
        Logout
      </a>
      <a className={`${styles.links} ${styles.last_link}`}>Profile</a>
    </div>
  );
};

export default Navbar;
