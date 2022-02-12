import React from "react";
import styles from "./post.module.css";
import {
  FaEllipsisV,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from "react-icons/fa";
import Comment from "./comment";
import TimeAgo from "timeago-react";

const Post = ({ postData }) => {
  const profileImg = postData.profileImage ?? "";
  const postImg = postData?.data?.display_url ?? "";
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
          <div className={styles.like}>
            <FaRegHeart size={25} />
          </div>
          <div className={styles.comment}>
            <FaRegComment size={25} />
          </div>
          <div className={styles.share}>
            <FaRegPaperPlane size={25} />
          </div>
        </div>
        <div>
          <span>{postData.likes} likes</span>
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
