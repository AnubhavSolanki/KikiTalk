import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../utils/useWindowDimensions";
import CommentContainer from "../comment/commentContainer";
import { PostFooter } from "../post/postFooter";
import styles from "./completePost.module.css";

const CompletePost = ({ options }) => {
  const { width, height } = useWindowDimensions();
  const [showState, setShowState] = useState({
    leftPanel: true,
    rightPanel: true,
  });

  useEffect(() => {
    if (width < 700 || height < 700) {
      setShowState({
        leftPanel: false,
        rightPanel: true,
      });
    } else {
      setShowState({
        leftPanel: true,
        rightPanel: true,
      });
    }
  }, [width, height]);
  return (
    <div className={styles.wrapper}>
      {showState.leftPanel && <PostFooter options={options} />}
      {showState.rightPanel && (
        <CommentContainer
          postDataUserId={options.postData.userId}
          postId={options.postData._id}
          history={options.history}
        />
      )}
    </div>
  );
};

export default CompletePost;
