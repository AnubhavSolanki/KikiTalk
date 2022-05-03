import React, { useEffect } from "react";
import TimeAgo from "timeago-react";
import {
  addPost,
  getLikeCount,
  getMessagePost,
  isLiked,
  updatePost,
} from "../../features/messagePostSlice";
import CreateModal from "../../utils/createModal";
import { get } from "../../utils/requests";
import CompletePost from "../completePost/completePost";
import styles from "./bubble.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const fetchPostData = (postId, index, dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await get(
        `${process.env.REACT_APP_BASE_URL}/postWithPostId`,
        {
          params: {
            postId,
          },
        }
      );
      if (response.status === 200) {
        dispatch(addPost({ index: postId, post: response.data }));
        resolve();
      }
    } catch (err) {
      console.log(err);
      reject(false);
    }
  });
};

const Bubble = ({ messageData, index }) => {
  const postData = useSelector((state) =>
    getMessagePost(state, messageData.message.split("postId-")[1])
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (messageData.message.startsWith("postId-")) {
      const postId = messageData.message.split("postId-")[1];
      fetchPostData(postId, index, dispatch);
    }
  }, []);

  const openPostContainer = () => {
    CreateModal(
      <CompletePost
        options={{
          postData,
          index: messageData.message.split("postId-")[1],
          history,
          openComments: false,
          likeStatusSelector:
            ({ index, userId }) =>
            (state) =>
              isLiked(state, index, userId),
          likeCountSelector:
            ({ index }) =>
            (state) =>
              getLikeCount(state, index),
          dispatchActionForLike: ({ index, response }) =>
            dispatch(updatePost({ index, postData: response.data })),
        }}
      />
    );
  };

  return messageData.message.startsWith("postId-") ? (
    <div
      onClick={openPostContainer}
      data-btn
      className={`${styles.post} ${
        messageData.id === 1 ? styles.myBubble : ""
      }`}
    >
      <img src={postData?.data?.url} alt="messagePost" />
    </div>
  ) : (
    <div
      className={`${styles.wrapper} ${
        messageData.id === 1 ? styles.myBubble : ""
      }`}
    >
      <span className={styles.message}>{messageData.message}</span>
      <TimeAgo className={styles.time} datetime={messageData.createdAt} />
    </div>
  );
};

export default Bubble;
