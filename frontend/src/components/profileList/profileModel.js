import React from "react";
import styles from "./profileModel.module.css";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

const ProfileModel = ({ userData, index, button }) => {
  const userId = useSelector(selectUser);
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileImage}>
        <img
          alt="profile"
          src={userData.profileImageUrl ?? defaultProfileImage}
        />
      </div>
      <div className={styles.profileInfo}>
        <span>{userData.full_name}</span>
      </div>
      {userData._id !== userId.id ? (
        <button
          onClick={() => {
            button?.onClick({ userId: userData._id, index });
          }}
          data-btn={button?.text !== "Sent"}
          className={`${styles.btn} ${
            button?.text === "Sent" ? styles.disabledBtn : ""
          }`}
          disabled={button?.text === "Sent"}
        >
          {button?.text}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileModel;
