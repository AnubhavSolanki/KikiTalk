import React from "react";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import styles from "./profileContainer.module.css";
import { removeModal } from "../../utils/createModal";

const ProfileContainer = ({ userData, history }) => {
  return (
    <div
      className={styles.profileContainer}
      onClick={() => {
        removeModal();
        history.push(`/profile?id=${userData._id}`);
      }}
    >
      <div className={styles.profileImage}>
        <img alt="profile" src={defaultProfileImage} />
      </div>
      <div className={styles.profileInfo}>
        <span>{userData.username ?? "No Username"}</span>
        <span>{userData.full_name}</span>
      </div>
    </div>
  );
};

export default ProfileContainer;
