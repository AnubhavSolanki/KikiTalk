import React from "react";
import styles from "./channel.module.css";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";

const Channel = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileImg}>
        <img src={defaultProfileImage} alt={"follower"} />
      </div>
      <div className={styles.rightSection}>
        <span>Name</span>
      </div>
    </div>
  );
};

export default Channel;
