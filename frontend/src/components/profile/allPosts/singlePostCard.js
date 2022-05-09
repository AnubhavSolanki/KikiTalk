import defaultProfileImage from "../../../assets/images/default_profile.jpeg";
import React, { useState } from "react";
import styles from "./singlePostCard.module.css";
import CreateModal from "../../../utils/createModal";
import CompletePost from "../../completePost/completePost";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, isLiked, getLikeCount } from "../../../features/allPosts";
import { useHistory } from "react-router-dom";
import Loader from "react-js-loader";
import { FaTrash } from "react-icons/fa";
import ConfirmDelete from "./confirmDelete";
import { selectUserId } from "../../../features/userSlice";

export const SinglePostCard = ({ postData, index }) => {
  const [postLoaded, setPostLoaded] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const history = useHistory();

  const handlePostClick = () => {
    CreateModal(
      <CompletePost
        options={{
          postData,
          index,
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

  const handleDeletePost = () => {
    CreateModal(<ConfirmDelete postId={postData?._id} />);
  };

  return (
    <div className={styles.wrapper}>
      {postData.userId === userId && (
        <span className={styles.deleteIcon}>
          <FaTrash onClick={handleDeletePost} />
        </span>
      )}
      <img
        onClick={handlePostClick}
        alt="card"
        src={postData?.data?.url ?? defaultProfileImage}
        onLoad={() => setPostLoaded(true)}
        style={!postLoaded ? { display: "none" } : {}}
      />
      {!postLoaded && (
        <div className={styles.proxyBlock}>
          <Loader
            type="spinner-default"
            bgColor={"#FFFFFF"}
            color={"#FFFFFF"}
            size={50}
          />
        </div>
      )}
    </div>
  );
};
