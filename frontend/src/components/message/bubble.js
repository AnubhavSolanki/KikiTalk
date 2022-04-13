import React from "react";
import styles from "./bubble.module.css";

const Bubble = ({ messageData }) => {
  return (
    <div
      className={`${styles.wrapper} ${
        messageData.id === 1 ? styles.myBubble : ""
      }`}
    >
      {messageData.message}
    </div>
  );
};

export default Bubble;
