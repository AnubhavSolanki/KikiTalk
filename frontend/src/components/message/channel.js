import React from "react";
import styles from "./channel.module.css";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import { useDispatch } from "react-redux";
import { selectChannelId } from "../../features/channels";

const Channel = ({ channelData, index, active }) => {
  const dispatch = useDispatch();

  const selectChannel = () => {
    dispatch(selectChannelId({ selected: index }));
  };

  return (
    <div
      onClick={selectChannel}
      className={`${styles.wrapper} ${active ? styles.selectedChannel : ""}`}
    >
      <div className={styles.profileImg}>
        <img src={defaultProfileImage} alt={"follower"} />
      </div>
      <div className={styles.rightSection}>
        <span>{channelData?.full_name ?? "Name"}</span>
      </div>
    </div>
  );
};

export default Channel;
