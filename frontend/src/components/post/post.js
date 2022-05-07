import React from "react";
import styles from "./post.module.css";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import { useDispatch } from "react-redux";
import { updatePost, isLiked, getLikeCount } from "../../features/postSlice";
import { useHistory } from "react-router-dom";
import { addProfileId } from "../../features/profileSlice";
import { setActive } from "../../features/navSlice";
import { PostFooter } from "./postFooter";
import { resetAllPosts } from "../../features/allPosts";

const Post = ({ postData, index }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const profileImg = postData.profileImage ?? defaultProfileImage;

  const handleClickOnProfileName = () => {
    dispatch(resetAllPosts());
    dispatch(addProfileId({ id: postData.userId }));
    dispatch(setActive({ index: 1 }));
    history.push(`profile`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div
          data-btn
          onClick={handleClickOnProfileName}
          className={styles.profile}
        >
          <img alt="Profile img" src={profileImg} />
        </div>
        <span
          data-btn
          onClick={handleClickOnProfileName}
          className={styles.profile_name}
        >
          {postData.profileName ?? "No Name"}
        </span>
        {/* <div className={styles.ellipsis}>
          {" "}
          <FaEllipsisV />{" "}
        </div> */}
      </div>
      <PostFooter
        options={{
          postData,
          history,
          index,
          origin: "normal",
          openComments: true,
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
    </div>
  );
};

export default Post;
