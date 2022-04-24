import React, { useEffect } from "react";
import CommentContainer from "../comment/commentContainer";
import { PostFooter } from "../post/post";
import styles from "./completePost.module.css";

const CompletePost = ({ options }) => {
  useEffect(() => {
    document
      .querySelector("body")
      .style.setProperty("--explorePostSizeFactor", "130");
    return () => {
      document
        .querySelector("body")
        .style.setProperty("--explorePostSizeFactor", "150");
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      {PostFooter(options)}
      <CommentContainer postId={options.postData._id} />
    </div>
  );
};

export default CompletePost;
