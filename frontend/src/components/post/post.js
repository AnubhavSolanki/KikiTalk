import React from "react";
import styles from "./post.module.css";
import {
  FaEllipsisV,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from "react-icons/fa";
import Comment from "./comment";
const Post = () => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.profile}>
          <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80" />
        </div>
        <span className={styles.profile_name}>aakriti.dubey</span>
        <div className={styles.ellipsis}>
          {" "}
          <FaEllipsisV />{" "}
        </div>
      </div>
      <div className={styles.post}>
        <img src="https://i.pinimg.com/564x/3e/72/6f/3e726f015975ebd9791a2eae433f4d17.jpg" />
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
          <span>0 likes</span>
        </div>
        <div className={styles.caption}>
          <span className={styles.name}> aakriti.dubey</span> So I am so happy
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
