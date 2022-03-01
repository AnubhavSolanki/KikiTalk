import React from "react";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import styles from "./profile.module.css";

const Profile = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerWrapper}>
          <div className={styles.profileImage}>
            <img alt="profile" src={defaultProfileImage} />
          </div>
          <div className={styles.profileName}>Anubhav</div>
          <div>0 Posts</div>
          <div>0 Followers</div>
          <div>0 Following</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
