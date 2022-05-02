import defaultProfileImage from "../../../assets/images/default_profile.jpeg";
import React from "react";
import styles from "./singlePostCard.module.css";
import CreateModal from "../../../utils/createModal";
import CompletePost from "../../completePost/completePost";
import { useDispatch } from "react-redux";
import { updatePost, isLiked, getLikeCount } from "../../../features/allPosts";

export const SinglePostCard = ({ postData, index }) => {
  const dispatch = useDispatch();

  const handlePostClick = () => {
    CreateModal(
      <CompletePost
        options={{
          postData,
          index,
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

  return (
    <div className={styles.wrapper}>
      <img
        onClick={handlePostClick}
        alt="card"
        src={postData?.data?.url ?? defaultProfileImage}
      />
    </div>
  );
};
