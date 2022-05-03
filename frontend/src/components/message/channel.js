import React from "react";
import styles from "./channel.module.css";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import { useDispatch } from "react-redux";
import { selectChannelId } from "../../features/channels";

const Channel = ({ channelData, index, active, setShowState, showState }) => {
  const dispatch = useDispatch();

  const selectChannel = () => {
    if (showState.leftPanel === true && showState.rightPanel === false) {
      setShowState({ leftPanel: false, rightPanel: true });
    }
    dispatch(selectChannelId({ selected: index }));
  };

  return (
    <div
      onClick={selectChannel}
      className={`${styles.wrapper} ${active ? styles.selectedChannel : ""}`}
    >
      <div className={styles.profileImg}>
        <img
          src={channelData.profileImageUrl ?? defaultProfileImage}
          alt={"follower"}
        />
      </div>
      <div className={styles.rightSection}>
        <span>{channelData?.full_name ?? "Name"}</span>
      </div>
    </div>
  );
};

export default Channel;
