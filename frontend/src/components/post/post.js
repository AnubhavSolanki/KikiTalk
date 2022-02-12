import React, { useState } from "react";
import styles from "./post.module.css";
import {
  FaEllipsisV,
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from "react-icons/fa";
import Comment from "./comment";
import TimeAgo from "timeago-react";
import { post } from "../../utils/requests";
import { selectUser } from "../../features/userSlice";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import { useSelector } from "react-redux";

const Post = ({ postData }) => {
  const user = useSelector(selectUser);
  const isLiked = (postData) => {
    return postData.likedBy.includes(user.id);
  };
  const profileImg = postData.profileImage ?? defaultProfileImage;
  const postImg = postData?.data?.display_url ?? "";
  const [postLike, setPostLikes] = useState(postData.likedBy.length);
  const [postLikeStatus, setPostLikeStatus] = useState(isLiked(postData)); // { 0: unliked, 1: liked }

  const onLike = async () => {
    try {
      let url = `${process.env.REACT_APP_BASE_URL}/addLikes`;
      if (postLikeStatus) {
        url = `${process.env.REACT_APP_BASE_URL}/removeLikes`;
      }
      const response = await post(url, {
        postId: postData._id,
        userId: user.id,
      });
      setPostLikes(response?.data?.data?.likedBy.length);
      setPostLikeStatus(isLiked(response.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.profile}>
          <img alt="Profile img" src={profileImg} />
        </div>
        <span className={styles.profile_name}>
          {postData.profileName ?? "No Name"}
        </span>
        <div className={styles.ellipsis}>
          {" "}
          <FaEllipsisV />{" "}
        </div>
      </div>
      <div className={styles.post}>
        <img alt="Post" src={postImg} />
      </div>
      <div className={styles.post_footer}>
        <div className={styles.footer}>
          <div onClick={onLike} className={styles.like}>
            {postLikeStatus ? (
              <FaHeart style={{ color: "red" }} size={25} />
            ) : (
              <FaRegHeart size={25} />
            )}
          </div>
          <div className={styles.comment}>
            <FaRegComment size={25} />
          </div>
          <div className={styles.share}>
            <FaRegPaperPlane size={25} />
          </div>
        </div>
        <div>
          <span>{postLike} likes</span>
        </div>
        <div className={styles.caption}>
          <span className={styles.name}>
            {" "}
            {postData.profileName ?? "No Name"}
          </span>{" "}
          {postData.description ?? "No Description"}
        </div>
        <div>
          <span>View all 2 comments</span>
        </div>
        <div className={styles.post_time}>
          <TimeAgo datetime={postData.createdAt} />
        </div>
      </div>
      <Comment />
    </div>
  );
};

export default Post;
