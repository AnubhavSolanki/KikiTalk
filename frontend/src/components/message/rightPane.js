import React, { useEffect } from "react";
import styles from "./rightPane.module.css";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import { FaWolfPackBattalion } from "react-icons/fa";
import Bubble from "./bubble";
import InfiniteScroll from "react-infinite-scroll-component";
import { get } from "../../utils/requests";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  getChatBoxState,
  resetChatBox,
} from "../../features/chatBox";
import { getSelectedChannel } from "../../features/channels";

const fetchMessages = (messages, selectedChannelId, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!selectedChannelId) throw new Error("Provide channel Id");
      const limit = 10;
      const response = await get(
        `${process.env.REACT_APP_BASE_URL}/latestMessages`,
        {
          params: {
            page: messages.length / limit,
            size: limit,
            channelId: selectedChannelId,
          },
        }
      );
      if (response.status === 200) {
        if (response.data.messages.length)
          dispatch(
            addMessage({
              messages: response.data.messages,
              hasNext: response.data.hasNext,
            })
          );
        resolve();
      }
    } catch (err) {
      console.log(err);
      reject(false);
    }
  });
};

const RightPane = () => {
  const dispatch = useDispatch();
  const chatBoxState = useSelector(getChatBoxState);
  const selectedChannel = useSelector(getSelectedChannel);

  useEffect(() => {
    fetchMessages(chatBoxState.messages, selectedChannel?.channelId, dispatch);
    return () => {
      if (chatBoxState?.messages?.length) dispatch(resetChatBox());
    };
  }, [chatBoxState.messages, dispatch, selectedChannel?.channelId]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.profileImg}>
          <img src={defaultProfileImage} alt={"follower"} />
        </div>
        <span>Name</span>
      </div>
      <div id="messageScrollableDiv" className={styles.chatSection}>
        <InfiniteScroll
          dataLength={chatBoxState?.messages?.length}
          next={() =>
            fetchMessages(
              chatBoxState?.messages,
              selectedChannel?.channelId,
              dispatch
            )
          }
          inverse={true}
          hasMore={chatBoxState?.hasNext}
          loader={<h4>Loading...</h4>}
          scrollableTarget="messageScrollableDiv"
        >
          {chatBoxState.messages.map((message, index) => {
            return <Bubble key={index} index={index} messageData={message} />;
          })}
        </InfiniteScroll>
      </div>
      <div className={styles.footer}>
        <input
          placeholder={`Enter your Message`}
          className={styles.input}
          type="text"
        />
        <FaWolfPackBattalion size={40} />
      </div>
    </div>
  );
};

export default RightPane;
