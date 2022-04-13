import React from "react";
import styles from "./rightPane.module.css";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import { FaWolfPackBattalion } from "react-icons/fa";
import Bubble from "./bubble";

const RightPane = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.profileImg}>
          <img src={defaultProfileImage} alt={"follower"} />
        </div>
        <span>Name</span>
      </div>
      <div className={styles.chatSection}>
        <Bubble id={0} />
        <Bubble id={1} />
      </div>
      <div className={styles.footer}>
        <input
          placeholder={`Enter your Message`}
          className={styles.input}
          type="text"
        />
        <FaWolfPackBattalion size={40} />
      </div>
    </div>
  );
};

export default RightPane;
