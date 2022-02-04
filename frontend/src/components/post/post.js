import React from "react";
import styles from "./post.module.css";
import {
  FaComment,
  FaEllipsisV,
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaShare,
  FaShareAlt,
} from "react-icons/fa";
import Comment from "./comment";
const Post = () => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.profile}>
          <img src="https://sitechecker.pro/wp-content/uploads/2017/12/URL-meaning.png" />
        </div>
        <span className={styles.profile_name}>anubhav.solanki</span>
        <div className={styles.ellipsis}>
          {" "}
          <FaEllipsisV />{" "}
        </div>
      </div>
      <div className={styles.post}>
        <img src="https://sitechecker.pro/wp-content/uploads/2017/12/URL-meaning.png" />
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
            <FaShare size={25} />
          </div>
        </div>
        <div>
          <span>0 likes</span>
        </div>
        <div className={styles.caption}>
          <span className={styles.name}> anubhav.solanki</span> So I am so happy
          to share my first post #party
        </div>
        <div>
          <span>View all 2 comments</span>
        </div>
        <div className={styles.post_time}>2 HOURS AGO</div>
      </div>

      <Comment />
    </div>
  );
};

export default Post;
