import React, { useEffect } from "react";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import styles from "./profile.module.css";
import { selectUser } from "../../features/userSlice";
import {
  addProfile,
  getProfileState,
  toggleFollow,
  resetProfile,
} from "../../features/profileSlice";
import { addInChannel } from "../../features/channels";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../utils/requests";
import AllPosts from "./allPosts/allPosts";
import { get } from "../../utils/requests";
import { useHistory } from "react-router-dom";

const fetchProfileInfo = (userId, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await get(
        `${process.env.REACT_APP_BASE_URL}/profileDetail`,
        {
          params: { userId },
        }
      );
      if (response.status === 200) {
        dispatch(addProfile(response.data));
        resolve();
      }
    } catch (err) {
      console.log(err);
      reject(false);
    }
  });
};

const Profile = () => {
  const user = useSelector(selectUser);
  const profileState = useSelector(getProfileState);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (profileState.id) fetchProfileInfo(profileState?.id, dispatch);
    else if (user?.id) fetchProfileInfo(user?.id, dispatch);
  }, [dispatch, profileState?.id]);

  useEffect(() => {
    return () => {
      dispatch(resetProfile());
    };
  }, []);

  const toggleFollowMethod = async () => {
    try {
      const response = await post(
        `${process.env.REACT_APP_BASE_URL}/follower`,
        {
          userId: profileState.id,
          followerId: user.id,
        }
      );
      if (response.status === 200) {
        dispatch(toggleFollow({ isFollower: response.data.isFollower }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const messageProfile = () => {
    dispatch(
      addInChannel({
        channel: {
          _id: profileState.id,
          full_name: profileState.name,
          profileImageUrl: profileState.imgUrl,
        },
      })
    );
    history.push("message");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerWrapper}>
          <div className={styles.profileImage}>
            <img
              alt="profile"
              src={profileState?.imgUrl ?? defaultProfileImage}
            />
          </div>
          <div className={styles.profileDetail}>
            <div className={styles.profileName}>{profileState.name}</div>
            <div className={styles.followDetail}>
              <div>{profileState.postCount} Posts</div>
              <div>{profileState.follower} Followers</div>
              <div>{profileState.following} Following</div>
            </div>
            {!profileState?.isMyProfile && (
              <>
                <button
                  className={styles.follow_btn}
                  onClick={toggleFollowMethod}
                >
                  {profileState.isFollowed ? "Unfollow" : "Follow"}
                </button>
                {profileState.isFollowed && (
                  <button
                    className={styles.message_btn}
                    onClick={messageProfile}
                  >
                    Message
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footer_heading}>Posts</div>
        <AllPosts />
      </div>
    </div>
  );
};

export default Profile;
