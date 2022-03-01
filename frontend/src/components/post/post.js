import React from "react";
import styles from "./post.module.css";
import {
  FaEllipsisV,
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from "react-icons/fa";
import Comment from "../comment/comment";
import TimeAgo from "timeago-react";
import { post } from "../../utils/requests";
import { selectUser } from "../../features/userSlice";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import { useDispatch, useSelector } from "react-redux";
import createModal from "../../utils/createModal";
import CommentContainer from "../comment/commentContainer";
import { addLike, removeLike } from "../../features/postSlice";

const Post = ({ postData, index }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const profileImg = postData.profileImage ?? defaultProfileImage;
  const postImg = postData?.data?.display_url ?? "";

  const isLiked = (userId) => {
    return postData.likedBy.includes(userId);
  };

  const getLikeCount = () => {
    return postData.likedBy.length;
  };

  const onLike = async () => {
    try {
      let url = `${process.env.REACT_APP_BASE_URL}/addLikes`;
      if (isLiked(user.id)) {
        url = `${process.env.REACT_APP_BASE_URL}/removeLikes`;
      }
      await post(url, {
        postId: postData._id,
        userId: user.id,
      });

      if (!isLiked(user.id)) {
        dispatch(addLike({ index, userId: user.id }));
      } else {
        dispatch(removeLike({ index, userId: user.id }));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const openPostContainer = () => {
    createModal(<CommentContainer postId={postData._id} />);
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
            {isLiked(user.id) ? (
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
          <span>{getLikeCount()} likes</span>
        </div>
        <div className={styles.caption}>
          <span className={styles.name}>
            {" "}
            {postData.profileName ?? "No Name"}
          </span>{" "}
          {postData.description ?? "No Description"}
        </div>
        <div>
          <span onClick={openPostContainer} style={{ cursor: "pointer" }}>
            View comments
          </span>
        </div>
        <div className={styles.post_time}>
          <TimeAgo datetime={postData.createdAt} />
        </div>
      </div>
      <Comment postId={postData._id} />
    </div>
  );
};

export default Post;
