import defaultProfileImage from "../../../assets/images/default_profile.jpeg";
import React from "react";
import styles from "./singlePostCard.module.css";

export const SinglePostCard = ({ postData }) => {
  return (
    <div className={styles.wrapper}>
      <img
        alt="card"
        src={postData?.data?.medium?.url ?? defaultProfileImage}
      />
    </div>
  );
};
