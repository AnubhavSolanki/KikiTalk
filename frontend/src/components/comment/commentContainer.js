import React, { useEffect, useState } from "react";
import styles from "./commentContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./comment";
import { get } from "../../utils/requests";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  addComments,
  getCommentState,
  resetCommentState,
} from "../../features/commentSlice";

const fetchComments = (comments, dispatch, postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const limit = 15;
      const response = await get(
        `${process.env.REACT_APP_BASE_URL}/latestComments`,
        {
          params: { page: comments.length / limit, size: limit, postId },
        }
      );
      if (response.status === 200) {
        dispatch(
          addComments({
            comments: [...response.data.comments],
            hasNext: response.data.hasNext,
          })
        );
        // setComments((result) =>
        //   Array.from([...response.data.comments, ...result])
        // );
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
          src={commentData?.profileUrl ?? defaultProfileImage}
        />
      </div>
      <span className={styles.posterName}>
        {commentData?.profileName ?? ""}
      </span>
      <span>{commentData?.comment ?? ""}</span>
    </div>
  );
};

const CommentContainer = ({ postId }) => {
  const dispatch = useDispatch();
  const commentState = useSelector(getCommentState);

  useEffect(() => {
    fetchComments(commentState.comments, dispatch, postId);
    return () => {
      dispatch(resetCommentState());
    };
  }, []);

  return (
    <div className={styles.container}>
      <Comment shouldDispatch={true} postId={postId} />
      <div id="commentScrollableDiv" className={styles.scrollableDiv}>
        <InfiniteScroll
          dataLength={commentState.comments.length}
          next={() => fetchComments(commentState.comments, dispatch, postId)}
          hasMore={commentState.hasNext}
          loader={<h4>Loading...</h4>}
          scrollableTarget="commentScrollableDiv"
          endMessage={<p align="center">No more Comments</p>}
        >
          {commentState.comments.map((commentData, index) => {
            return commentTemplate(commentData, index);
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default CommentContainer;
