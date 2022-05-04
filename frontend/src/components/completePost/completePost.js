import React, { useEffect } from "react";
import CommentContainer from "../comment/commentContainer";
import { PostFooter } from "../post/postFooter";
import styles from "./completePost.module.css";

const CompletePost = ({ options }) => {
  useEffect(() => {
    document
      .querySelector("body")
      .style.setProperty("--explorePostSizeFactor", "130");
    return () => {
      document
        .querySelector("body")
        .style.setProperty("--explorePostSizeFactor", "120");
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <PostFooter options={options} />
      <CommentContainer
        postDataUserId={options.postData.userId}
        postId={options.postData._id}
        history={options.history}
      />
    </div>
  );
};

export default CompletePost;
