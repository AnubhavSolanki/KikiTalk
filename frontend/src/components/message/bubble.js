import React from "react";
import TimeAgo from "timeago-react";
import styles from "./bubble.module.css";

const Bubble = ({ messageData }) => {
  return (
    <div
      className={`${styles.wrapper} ${
        messageData.id === 1 ? styles.myBubble : ""
      }`}
    >
      <span className={styles.message}>{messageData.message}</span>
      <TimeAgo className={styles.time} datetime={messageData.createdAt} />
    </div>
  );
};

export default Bubble;
