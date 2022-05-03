import React, { useEffect } from "react";
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
import { getLoadingState, setLoading } from "../../features/loadingSlice";
import Loader from "react-js-loader";
import { addProfileId } from "../../features/profileSlice";
import { setActive } from "../../features/navSlice";
import { useHistory } from "react-router-dom";
import { removeModal } from "../../utils/createModal";

const fetchComments = (comments, dispatch, postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(setLoading({ commmentLoading: true }));
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
        resolve();
      }
    } catch (err) {
      console.log(err);
      reject(false);
    } finally {
      dispatch(setLoading({ commmentLoading: false }));
    }
  });
};

const CommentContainer = ({ postId, postDataUserId, history }) => {
  const dispatch = useDispatch();
  const commentState = useSelector(getCommentState);
  const isLoading = useSelector(getLoadingState("commmentLoading"));

  useEffect(() => {
    if (commentState.comments.length === 0)
      fetchComments(commentState.comments, dispatch, postId);
    return () => {
      dispatch(resetCommentState());
    };
  }, []);

  const handleClickOnProfileName = () => {
    dispatch(addProfileId({ id: postDataUserId }));
    dispatch(setActive({ index: 1 }));
    removeModal();
    history.push(`profile`);
  };

  const commentTemplate = (commentData, index) => {
    return (
      <div key={index} className={styles.commentContainer}>
        <div
          data-btn
          onClick={handleClickOnProfileName}
          className={styles.profileImage}
        >
          <img
            alt="profile"
            src={commentData?.profileImage ?? defaultProfileImage}
          />
        </div>
        <span
          data-btn
          onClick={handleClickOnProfileName}
          className={styles.posterName}
        >
          {commentData?.profileName ?? ""}
        </span>
        <span>{commentData?.comment ?? ""}</span>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Comment shouldDispatch={true} postId={postId} />
      <div id="commentScrollableDiv" className={styles.scrollableDiv}>
        <InfiniteScroll
          dataLength={commentState.comments.length}
          next={() => fetchComments(commentState.comments, dispatch, postId)}
          hasMore={commentState.hasNext || isLoading}
          loader={
            <Loader
              type="spinner-default"
              bgColor={"#000000"}
              color={"#000000"}
              size={50}
            />
          }
          scrollableTarget="commentScrollableDiv"
          endMessage={
            commentState.comments.length === 0 ? (
              <p align="center">Be the first to write comment</p>
            ) : (
              <></>
            )
          }
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
