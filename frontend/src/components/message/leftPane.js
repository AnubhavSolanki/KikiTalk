import React from "react";
import styles from "./leftPane.module.css";
import Channel from "./channel";

const LeftPane = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Messages</div>
      <Channel />
      <Channel />
      <Channel />
      <Channel />
    </div>
  );
};

export default LeftPane;
