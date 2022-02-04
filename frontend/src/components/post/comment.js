import React from "react";
import styles from "./comment.module.css";
const Comment = () => {
  const comments = ["hey nice picture", "I love it"];
  return (
    <div>
      {/* <div className={styles.commentBox}>
        {comments.map((comment) => {
          return <p>{comment}</p>;
        })}
      </div> */}

      <hr />
      <div className={styles.comment_input_wrapper}>
        <input className={styles.post_input} placeholder="Add a Comment" />
        <button className={styles.post_button}>Post</button>
      </div>
    </div>
  );
};

export default Comment;
