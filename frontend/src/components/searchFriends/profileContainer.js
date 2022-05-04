import React from "react";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import styles from "./profileContainer.module.css";
import { removeModal } from "../../utils/createModal";
import { useDispatch } from "react-redux";
import { addProfileId } from "../../features/profileSlice";
import { resetAllPosts } from "../../features/allPosts";

const ProfileContainer = ({ userData, history }) => {
  const dispatch = useDispatch();

  return (
    <div
      data-btn
      className={styles.profileContainer}
      onClick={() => {
        dispatch(resetAllPosts());
        dispatch(addProfileId({ id: userData._id }));
        removeModal();
        history.push(`profile`);
      }}
    >
      <div className={styles.profileImage}>
        <img
          alt="profile"
          src={userData.profileImageUrl ?? defaultProfileImage}
        />
      </div>
      <div className={styles.profileInfo}>
        <span>{userData.full_name}</span>
      </div>
    </div>
  );
};

export default ProfileContainer;
