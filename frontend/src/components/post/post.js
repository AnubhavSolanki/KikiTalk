import React from "react";
import styles from "./post.module.css";
import {
  FaEllipsisV,
  FaHeart,
  FaRegComment,
  FaRegHeart,
  FaRegPaperPlane,
} from "react-icons/fa";
import TimeAgo from "timeago-react";
import { post } from "../../utils/requests";
import { selectUser } from "../../features/userSlice";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import { useDispatch, useSelector } from "react-redux";
import CreateModal from "../../utils/createModal";
import { updatePost, isLiked, getLikeCount } from "../../features/postSlice";
import CompletePost from "../completePost/completePost";
import ProfileList from "../profileList/profileList";
import {
  changeButtonText,
  toggleFollowOnList,
} from "../../features/profileListSlice";
import { getSocket } from "../../features/socketSlice";
import { useHistory } from "react-router-dom";
import { addProfileId } from "../../features/profileSlice";
import { setActive } from "../../features/navSlice";

const Post = ({ postData, index }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const profileImg = postData.profileImage ?? defaultProfileImage;

  const handleClickOnProfileName = () => {
    dispatch(addProfileId({ id: postData.userId }));
    dispatch(setActive({ index: 1 }));
    history.push(`profile`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div
          data-btn
          onClick={handleClickOnProfileName}
          className={styles.profile}
        >
          <img alt="Profile img" src={profileImg} />
        </div>
        <span
          data-btn
          onClick={handleClickOnProfileName}
          className={styles.profile_name}
        >
          {postData.profileName ?? "No Name"}
        </span>
        {/* <div className={styles.ellipsis}>
          {" "}
          <FaEllipsisV />{" "}
        </div> */}
      </div>
      {PostFooter({
        postData,
        index,
        origin: "normal",
        openComments: true,
        likeStatusSelector:
          ({ index, userId }) =>
          (state) =>
            isLiked(state, index, userId),
        likeCountSelector:
          ({ index }) =>
          (state) =>
            getLikeCount(state, index),
        dispatchActionForLike: ({ index, response }) =>
          dispatch(updatePost({ index, postData: response.data })),
      })}
    </div>
  );
};

export default Post;

export function PostFooter({
  postData,
  index,
  openComments,
  likeStatusSelector,
  likeCountSelector,
  dispatchActionForLike,
}) {
  const history = useHistory();
  const socket = useSelector(getSocket);
  const user = useSelector(selectUser);
  const likeStatus = useSelector(
    likeStatusSelector({ index, userId: user.id, postData })
  );
  const likeCount = useSelector(likeCountSelector({ index, postData }));
  const dispatch = useDispatch();

  const openPostContainer = () => {
    if (!openComments) return;
    CreateModal(
      <CompletePost
        options={{
          user,
          history,
          postData,
          index,
          openComments: false,
          likeStatusSelector,
          likeCountSelector,
          dispatchActionForLike,
        }}
      />
    );
  };

  const onLike = async () => {
    try {
      const response = await post(
        `${process.env.REACT_APP_BASE_URL}/toggleLike`,
        {
          postId: postData._id,
        }
      );
      dispatchActionForLike({ index, response, postData });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOnLikeCount = () => {
    CreateModal(
      <ProfileList
        options={{
          url: `${process.env.REACT_APP_BASE_URL}/likedBy`,
          params: { postId: postData._id },
          heading: "Likes",
          emptyMessage: "No Likes",
          button: {
            onClick: ({ userId, index }) => {
              dispatch(toggleFollowOnList({ index }));
            },
          },
        }}
      />
    );
  };

  const openSendList = () => {
    CreateModal(
      <ProfileList
        options={{
          url: `${process.env.REACT_APP_BASE_URL}/followers`,
          params: { userId: user.id, isForSend: true },
          heading: "Send To",
          emptyMessage: "No Followers",
          button: {
            onClick: ({ userId, index }) => {
              socket.emit("Send Message", {
                recieverId: userId,
                message: `postId-${postData._id}`,
              });
              dispatch(changeButtonText({ index, text: "Sent" }));
            },
          },
        }}
      />
    );
  };

  const handleClickOnProfileName = () => {
    dispatch(addProfileId({ id: postData.userId }));
    dispatch(setActive({ index: 1 }));
    history.push(`profile`);
  };

  return (
    <div>
      <div className={styles.post}>
        <img alt="Post" src={postData?.data?.display_url} />
      </div>
      <div className={styles.post_footer}>
        <div className={styles.footer}>
          <div data-btn onClick={onLike} className={styles.like}>
            {likeStatus ? (
              <FaHeart style={{ color: "red" }} size={25} />
            ) : (
              <FaRegHeart size={25} />
            )}
          </div>
          <div data-btn onClick={openPostContainer} className={styles.comment}>
            <FaRegComment size={25} />
          </div>
          <div data-btn className={styles.share} onClick={openSendList}>
            <FaRegPaperPlane size={25} />
          </div>
        </div>
        <div data-btn onClick={handleClickOnLikeCount}>
          <span>{likeCount} likes</span>
        </div>
        <div className={styles.caption}>
          <span
            data-btn
            onClick={handleClickOnProfileName}
            className={styles.name}
          >
            {" "}
            {postData.profileName ?? "No Name"}
          </span>{" "}
          {postData?.description && postData?.description !== ""
            ? postData?.description
            : "No Description"}
        </div>
        {openComments && (
          <div>
            <span onClick={openPostContainer} style={{ cursor: "pointer" }}>
              View comments
            </span>
          </div>
        )}
        <div className={styles.post_time}>
          <TimeAgo datetime={postData.createdAt} />
        </div>
      </div>
    </div>
  );
}
