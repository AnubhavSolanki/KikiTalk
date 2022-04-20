import React, { useEffect } from "react";
import styles from "./rightPane.module.css";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import { FaWolfPackBattalion } from "react-icons/fa";
import Bubble from "./bubble";
import InfiniteScroll from "react-infinite-scroll-component";
import { get, post } from "../../utils/requests";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  getChatBoxState,
  resetChatBox,
} from "../../features/chatBox";
import {
  addMessageInChannel,
  getSelectedChannel,
} from "../../features/channels";

const fetchMessages = (messages, senderId, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!senderId) throw new Error("Provide senderId");
      const limit = 12;
      const response = await get(
        `${process.env.REACT_APP_BASE_URL}/latestMessages`,
        {
          params: {
            page: messages.length / limit,
            size: limit,
            senderId: senderId,
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

const addMessageInChatBox = (message, recieverId, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      await post(`${process.env.REACT_APP_BASE_URL}/addMessage`, {
        message,
        recieverId,
      });
      dispatch(addMessageInChannel({ message: "" }));
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
    if (chatBoxState.messages.length === 0)
      fetchMessages(chatBoxState.messages, selectedChannel?._id, dispatch);
  }, [chatBoxState.messages, dispatch, selectedChannel?._id]);

  useEffect(() => {
    dispatch(resetChatBox());
  }, [selectedChannel?._id, dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <div className={styles.profileImg}>
          <img src={defaultProfileImage} alt={"follower"} />
        </div>
        <span>{selectedChannel?.channelName ?? "No Channel Selected"}</span>
      </div>
      <div id="messageScrollableDiv" className={styles.chatSection}>
        <InfiniteScroll
          dataLength={chatBoxState?.messages?.length}
          next={() =>
            fetchMessages(
              chatBoxState?.messages,
              selectedChannel?._id,
              dispatch
            )
          }
          style={{ display: "flex", flexDirection: "column-reverse" }}
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
          value={selectedChannel?.message ?? ""}
          onChange={(e) => {
            dispatch(addMessageInChannel({ message: e.target.value }));
          }}
        />
        <FaWolfPackBattalion
          onClick={() =>
            addMessageInChatBox(
              selectedChannel?.message,
              selectedChannel?._id,
              dispatch
            )
          }
          size={40}
        />
      </div>
    </div>
  );
};

export default RightPane;
