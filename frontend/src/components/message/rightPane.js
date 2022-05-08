import React, { useEffect } from "react";
import styles from "./rightPane.module.css";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import { FaArrowLeft } from "react-icons/fa";
import Bubble from "./bubble";
import InfiniteScroll from "react-infinite-scroll-component";
import { get } from "../../utils/requests";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  addNewMessages,
  getChatBoxState,
  resetChatBox,
} from "../../features/chatBox";
import {
  addMessageInChannel,
  getSelectedChannel,
} from "../../features/channels";
import { selectUser } from "../../features/userSlice";
import { getSocket } from "../../features/socketSlice";
import { getLoadingState, setLoading } from "../../features/loadingSlice";
import Loader from "react-js-loader";
import { addProfileId } from "../../features/profileSlice";
import { useHistory } from "react-router-dom";
import { setActive } from "../../features/navSlice";
import { resetAllPosts } from "../../features/allPosts";

const fetchMessages = (messages, senderId, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!senderId) return;
      dispatch(setLoading({ messageLoading: true }));
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
        if (response.data.messages.length) {
          dispatch(
            addMessage({
              messages: response.data.messages,
              channelId: senderId,
              hasNext: response.data.hasNext,
            })
          );
        }
        resolve();
      }
    } catch (err) {
      console.log(err);
      reject(false);
    } finally {
      dispatch(setLoading({ messageLoading: false }));
    }
  });
};

const RightPane = ({ showState, setShowState }) => {
  const dispatch = useDispatch();
  const chatBoxState = useSelector(getChatBoxState);
  const selectedChannel = useSelector(getSelectedChannel);
  const socket = useSelector(getSocket);
  const user = useSelector(selectUser);
  const isLoading = useSelector(getLoadingState("messageLoading"));
  const history = useHistory();

  useEffect(() => {
    if (chatBoxState.messages.length === 0 && selectedChannel?._id !== null)
      fetchMessages(chatBoxState.messages, selectedChannel?._id, dispatch);
  }, [chatBoxState.messages, dispatch, selectedChannel?._id]);

  useEffect(() => {
    dispatch(resetChatBox());
  }, [selectedChannel?._id, dispatch]);

  useEffect(() => {
    if (socket && user?.id && selectedChannel?._id) {
      socket.on(`${user.id}`, (data) => {
        if (
          (user?.id === data.senderId &&
            selectedChannel?._id === data.recieverId) ||
          (user?.id === data.recieverId &&
            selectedChannel?._id === data.senderId)
        )
          dispatch(
            addNewMessages({
              messages: [{ ...data, id: +(user?.id === data.senderId) }],
            })
          );
      });
    }
    return () => {
      socket.off(`${user.id}`);
    };
  }, [dispatch, selectedChannel?._id, socket, user?.id]);

  const addMessageInChatBox = (message, recieverId) => {
    if (!message || message?.length === 0) return;
    socket.emit("Send Message", {
      recieverId,
      message,
    });
    dispatch(addMessageInChannel({ message: "" }));
  };

  const generateFooter = () => {
    return (
      <div className={styles.footer}>
        <input
          autoFocus={true}
          placeholder={`Enter your Message`}
          className={styles.input}
          type="text"
          value={selectedChannel?.message ?? ""}
          onChange={(e) => {
            dispatch(addMessageInChannel({ message: e.target.value }));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              addMessageInChatBox(
                selectedChannel?.message,
                selectedChannel?._id
              );
          }}
        />
        <div
          data-btn
          onClick={() =>
            addMessageInChatBox(selectedChannel?.message, selectedChannel?._id)
          }
          className={styles.send}
        >
          Send
        </div>
      </div>
    );
  };

  const handleClickOnProfileName = () => {
    dispatch(resetAllPosts());
    dispatch(addProfileId({ id: selectedChannel._id }));
    dispatch(setActive({ index: 1 }));
    history.push(`profile`);
  };
  const handlePullMe = () => {
    if (showState.leftPanel === false && showState.rightPanel === true) {
      setShowState({ leftPanel: true, rightPanel: false });
    }
  };

  return (
    <div className={styles.wrapper}>
      <span onClick={handlePullMe} className={styles.pullMe}>
        <FaArrowLeft />
      </span>
      <div className={styles.heading}>
        <div
          data-btn
          onClick={handleClickOnProfileName}
          className={styles.profileImg}
        >
          <img
            src={selectedChannel?.profileImageUrl ?? defaultProfileImage}
            alt={"follower"}
          />
        </div>
        <span data-btn onClick={handleClickOnProfileName}>
          {selectedChannel?.full_name ?? "No Friend Selected"}
        </span>
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
          hasMore={chatBoxState?.hasNext || isLoading}
          loader={
            <Loader
              type="bubble-top"
              bgColor={"#FFFFFF"}
              color={"#FFFFFF"}
              size={30}
            />
          }
          scrollableTarget="messageScrollableDiv"
        >
          {chatBoxState.messages.map((message, index) => {
            return <Bubble key={index} index={index} messageData={message} />;
          })}
        </InfiniteScroll>
      </div>
      {selectedChannel && generateFooter()}
    </div>
  );
};

export default RightPane;
