import React, { useState, useEffect, useRef } from "react";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import styles from "./profile.module.css";
import { selectUser } from "../../features/userSlice";
import {
  addProfile,
  getProfileState,
  toggleFollow,
  resetProfile,
  updateProfileNameInStore,
  addProfileImage,
  updateFollowing,
} from "../../features/profileSlice";
import { FaCheck, FaTimes } from "react-icons/fa";
import { addInChannel } from "../../features/channels";
import { useDispatch, useSelector } from "react-redux";
import { post } from "../../utils/requests";
import AllPosts from "./allPosts/allPosts";
import { get } from "../../utils/requests";
import { useHistory } from "react-router-dom";
import CreateModal from "../../utils/createModal";
import CropImage from "../post/cropImage";
import { setLoading } from "../../features/loadingSlice";
import ProfileList from "../profileList/profileList";
import { toggleFollowOnList } from "../../features/profileListSlice";

const fetchProfileInfo = (userId, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(setLoading());
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
    } finally {
      dispatch(setLoading({ loading: false }));
    }
  });
};

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const user = useSelector(selectUser);
  const profileState = useSelector(getProfileState);
  const dispatch = useDispatch();
  const history = useHistory();
  const profileNameRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (profileState.id) fetchProfileInfo(profileState?.id, dispatch);
  }, [dispatch, profileState?.id]);

  useEffect(() => {
    return () => {
      dispatch(resetProfile());
    };
  }, []);

  const toggleFollowMethod = async (id = null, index = -1) => {
    try {
      const response = await post(
        `${process.env.REACT_APP_BASE_URL}/follower`,
        {
          userId: index !== -1 ? id : profileState.id,
          followerId: user.id,
        }
      );
      if (response.status === 200) {
        if (index !== -1) {
          dispatch(toggleFollowOnList({ index }));
          dispatch(updateFollowing({ isFollower: response.data.isFollower }));
        } else {
          dispatch(toggleFollow({ isFollower: response.data.isFollower }));
        }
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

  const resetProfileName = () => {
    profileNameRef.current.innerText = profileState.name;
    setEdit(false);
  };

  const updateProfileName = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (profileNameRef.current.innerText === "")
          throw new Error("Invalid Name");
        const response = await post(
          `${process.env.REACT_APP_BASE_URL}/updateProfileName`,
          {
            full_name: profileNameRef.current.innerText,
          }
        );
        if (response.status === 200) {
          dispatch(updateProfileNameInStore(response.data));
          setEdit(false);
          resolve();
        }
      } catch (err) {
        console.log(err);
        resetProfileName();
        reject(false);
      }
    });
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          resetProfileName();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, profileState]);
  }
  useOutsideAlerter(containerRef);

  const addImage = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      const options = {
        api: `${process.env.REACT_APP_BASE_URL}/updateProfileImage`,
        want_caption: false,
        aspect: 1,
        dispatchFunc: [(response) => addProfileImage(response.data)],
      };
      reader.addEventListener("load", () =>
        CreateModal(
          <CropImage
            imgSrc={reader.result.toString() || ""}
            options={options}
          />
        )
      );
      if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
    }
  };

  const openFollowers = () => {
    CreateModal(
      <ProfileList
        options={{
          url: `${process.env.REACT_APP_BASE_URL}/followers`,
          history,
          params: { userId: profileState.id },
          heading: "Followers",
          emptyMessage: "No Followers",
          button: {
            onClick: ({ userId, index }) => {
              toggleFollowMethod(userId, index);
            },
          },
        }}
      />
    );
  };

  const openFollowings = () => {
    CreateModal(
      <ProfileList
        options={{
          url: `${process.env.REACT_APP_BASE_URL}/followings`,
          history,
          heading: "Followings",
          emptyMessage: "No Followings",
          params: { userId: profileState.id },
          button: {
            onClick: ({ userId, index }) => {
              toggleFollowMethod(userId, index);
            },
          },
        }}
      />
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerWrapper}>
          <div
            className={styles.profileImage}
            onClick={() => {
              document.querySelector("#profileInput").click();
            }}
          >
            <img
              alt="profile"
              src={profileState?.imgUrl ?? defaultProfileImage}
            />
            <input id="profileInput" hidden type="file" onChange={addImage} />
          </div>
          <div className={styles.profileDetail}>
            <div className={styles.profileName} ref={containerRef}>
              <span
                ref={profileNameRef}
                onInput={() => {
                  setEdit(true);
                }}
                onClick={() => {
                  setEdit(true);
                }}
                contentEditable={profileState.id === user.id}
                suppressContentEditableWarning={true}
              >
                {profileState.name}
              </span>{" "}
              {edit && profileState.id === user.id && (
                <>
                  <FaCheck
                    data-btn
                    style={{ cursor: "pointer" }}
                    size={15}
                    onClick={updateProfileName}
                    color="#34b233"
                  />{" "}
                  <FaTimes
                    data-btn
                    style={{ cursor: "pointer" }}
                    size={15}
                    onClick={resetProfileName}
                    color="#f12525de"
                  />
                </>
              )}
            </div>
            <div className={styles.followDetail}>
              <div align="center">{profileState.postCount} Posts</div>
              <div align="center" data-btn onClick={openFollowers}>
                {profileState.follower} Followers
              </div>
              <div align="center" data-btn onClick={openFollowings}>
                {profileState.following} Following
              </div>
            </div>
            {!profileState?.isMyProfile && (
              <div className={styles.buttonGroup}>
                <button
                  className={styles.follow_btn}
                  onClick={toggleFollowMethod}
                  data-btn
                >
                  {profileState.isFollowed ? "Unfollow" : "Follow"}
                </button>
                {profileState.isFollowed && (
                  <button
                    data-btn
                    className={styles.message_btn}
                    onClick={messageProfile}
                  >
                    Message
                  </button>
                )}
              </div>
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
