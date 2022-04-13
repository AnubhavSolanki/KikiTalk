import React, { useEffect, useState } from "react";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import styles from "./profile.module.css";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { post } from "../../utils/requests";
import * as queryString from "query-string";
import AllPosts from "./allPosts/allPosts";

const Profile = () => {
  const [profileId, setProfileId] = useState("");
  const user = useSelector(selectUser);

  useEffect(() => {
    const id = queryString.parse(window.location.search)?.id;
    console.log({ id });
    if (id && id !== profileId) {
      setProfileId(id);
    } else {
      setProfileId("");
    }
  }, []);

  const onFollow = async () => {
    if (user.id === profileId || profileId === "") return;
    const data = {
      userId: profileId,
      followerId: user.id,
    };
    await post(`${process.env.REACT_APP_BASE_URL}/follower`, data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerWrapper}>
          <div className={styles.profileImage}>
            <img alt="profile" src={defaultProfileImage} />
          </div>
          <div className={styles.profileDetail}>
            <div className={styles.profileName}>Anubhav</div>
            <div className={styles.followDetail}>
              <div>0 Posts</div>
              <div>0 Followers</div>
              <div>0 Following</div>
            </div>
            {profileId !== "" && user.id !== profileId ? (
              <button className={styles.follow_btn} onClick={onFollow}>
                Follow
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footer_heading}>Posts</div>
        <AllPosts profileId={profileId} />
      </div>
    </div>
  );
};

export default Profile;
