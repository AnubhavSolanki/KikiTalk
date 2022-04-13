import styles from "./message.module.css";
import React from "react";
import LeftPane from "./leftPane";
import RightPane from "./rightPane";

const Message = () => {
  return (
    <div className={styles.wrapper}>
      <LeftPane />
      <RightPane />
    </div>
  );
};

export default Message;
