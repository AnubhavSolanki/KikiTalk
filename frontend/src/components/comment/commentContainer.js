import React, { useEffect, useState } from "react";
import styles from "./commentContainer.module.css";
import Comment from "./comment";
import { get } from "../../utils/requests";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import InfiniteScroll from "react-infinite-scroll-component";

const fetchComments = (comments, setComments, postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = 15;
      const response = await get(
        `${process.env.REACT_APP_BASE_URL}/latestComments`,
        {
          params: {
            from: comments.length,
            to: comments.length + limit,
            postId,
          },
        }
      );
      if (response.status === 200) {
        setComments((result) =>
          Array.from([...response.data.comments, ...result])
        );
        console.log(comments);
        resolve(response.data.hasNext);
      }
    } catch (err) {
      console.log(err);
      reject(false);
    }
  });
};

const commentTemplate = (commentData, index) => {
  return (
    <div key={index} className={styles.commentContainer}>
      <div className={styles.profileImage}>
        <img
          alt="profile"
          src={commentData.profileUrl ?? defaultProfileImage}
        />
      </div>
      <span className={styles.posterName}>{commentData.profileName ?? ""}</span>
      <span>{commentData.comment ?? ""}</span>
    </div>
  );
};

const CommentContainer = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getNewComments = () => {
    fetchComments(comments, setComments, postId).then((hasMore) => {
      setHasMore(hasMore);
    });
  };

  useEffect(() => {
    getNewComments();
  }, []);

  return (
    <div className={styles.container}>
      <Comment setComments={setComments} postId={postId} />
      <div id="commentScrollableDiv" className={styles.scrollableDiv}>
        <InfiniteScroll
          dataLength={comments.length}
          next={getNewComments}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="commentScrollableDiv"
          endMessage={<p align="center">No more Comments</p>}
        >
          {comments.map((commentData, index) => {
            return commentTemplate(commentData, index);
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default CommentContainer;
