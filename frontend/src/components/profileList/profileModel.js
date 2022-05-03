import React from "react";
import styles from "./profileModel.module.css";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import { selectUser } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { addProfileId } from "../../features/profileSlice";
import { setActive } from "../../features/navSlice";
import { removeModal } from "../../utils/createModal";

const ProfileModel = ({ userData, index, button, history }) => {
  const userId = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleClickOnProfileName = () => {
    dispatch(addProfileId({ id: userData._id }));
    dispatch(setActive({ index: 1 }));
    removeModal();
    history.push(`profile`);
  };
  return (
    <div className={styles.wrapper}>
      <div
        data-btn
        onClick={handleClickOnProfileName}
        className={styles.profileImage}
      >
        <img
          alt="profile"
          src={userData.profileImageUrl ?? defaultProfileImage}
        />
      </div>
      <div
        data-btn
        onClick={handleClickOnProfileName}
        className={styles.profileInfo}
      >
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
