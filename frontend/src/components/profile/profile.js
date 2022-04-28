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
  const [edit, setEdit] = useState(false);
  const user = useSelector(selectUser);
  const profileState = useSelector(getProfileState);
  const dispatch = useDispatch();
  const history = useHistory();
  const profileNameRef = useRef(null);
  const containerRef = useRef(null);

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
              <div>{profileState.postCount} Posts</div>
              <div>{profileState.follower} Followers</div>
              <div>{profileState.following} Following</div>
            </div>
            {!profileState?.isMyProfile && (
              <>
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
