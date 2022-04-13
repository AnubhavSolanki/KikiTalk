import React from "react";
import styles from "./bubble.module.css";

const Bubble = ({ id }) => {
  return (
    <div className={`${styles.wrapper} ${id === 1 ? styles.myBubble : ""}`}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, quisquam
      magnam placeat fugiat saepe perferendis eos nostrum sit quia mollitia
      incidunt velit laudantium iure aspernatur.
    </div>
  );
};

export default Bubble;
