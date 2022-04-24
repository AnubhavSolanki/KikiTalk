import React from "react";
import styles from "./post.module.css";
import { FaEllipsisV, FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import TimeAgo from "timeago-react";
import { post } from "../../utils/requests";
import { selectUser } from "../../features/userSlice";
import defaultProfileImage from "../../assets/images/default_profile.jpeg";
import { useDispatch, useSelector } from "react-redux";
import CreateModal from "../../utils/createModal";
import { updatePost, isLiked, getLikeCount } from "../../features/postSlice";
import CompletePost from "../completePost/completePost";

const Post = ({ postData, index }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const profileImg = postData.profileImage ?? defaultProfileImage;
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.profile}>
          <img alt="Profile img" src={profileImg} />
        </div>
        <span className={styles.profile_name}>
          {postData.profileName ?? "No Name"}
        </span>
        <div className={styles.ellipsis}>
          {" "}
          <FaEllipsisV />{" "}
        </div>
      </div>
      {PostFooter({
        user,
        postData,
        index,
        origin: "normal",
        openComments: true,
        likeStatusSelector: (index, userId) => (state) =>
          isLiked(state, index, userId),
        likeCountSelector: (index) => (state) => getLikeCount(state, index),
        dispatchActionForLike: (index, response) =>
          dispatch(updatePost({ index, postData: response.data })),
      })}
    </div>
  );
};

export default Post;

export function PostFooter({
  user,
  postData,
  index,
  openComments,
  likeStatusSelector,
  likeCountSelector,
  dispatchActionForLike,
}) {
  const likeStatus = useSelector(likeStatusSelector(index, user.id));
  const likeCount = useSelector(likeCountSelector(index));

  const openPostContainer = () => {
    if (!openComments) return;
    CreateModal(
      <CompletePost
        options={{
          user,
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
      dispatchActionForLike(index, response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={styles.post}>
        <img alt="Post" src={postData?.data?.display_url} />
      </div>
      <div className={styles.post_footer}>
        <div className={styles.footer}>
          <div onClick={onLike} className={styles.like}>
            {likeStatus ? (
              <FaHeart style={{ color: "red" }} size={25} />
            ) : (
              <FaRegHeart size={25} />
            )}
          </div>
          <div onClick={openPostContainer} className={styles.comment}>
            <FaRegComment size={25} />
          </div>
        </div>
        <div>
          <span>{likeCount} likes</span>
        </div>
        <div className={styles.caption}>
          <span className={styles.name}>
            {" "}
            {postData.profileName ?? "No Name"}
          </span>{" "}
          {postData.description ?? "No Description"}
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
